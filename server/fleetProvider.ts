// Fleet-data provider for the rewards automation.
//
// The award engine never talks to Samsara directly — it asks for a FleetSnapshot
// and works with plain numbers. That keeps the reward rules testable and means the
// integration can be swapped (Samsara -> Motive -> anything) by editing this file only.
//
// WITHOUT `SAMSARA_API_TOKEN` the snapshot is empty and the engine still runs:
// tenure and CRM-derived awards fire normally, fleet-driven awards (MPG, safety,
// mileage) simply do not trigger. Set the token and they light up — no other change.
//
//   Samsara endpoint                                -> FleetStats field
//   GET /fleet/drivers                              -> id, name (roster + truck match)
//   GET /fleet/reports/drivers/fuel-energy          -> mpg, idlePct, monthMiles
//   GET /fleet/drivers/{id}/safety/score            -> safetyScore, harshEvents
//
// NOTE FOR THE FLEET DEVS: the exact JSON keys Samsara returns differ per account
// and API version, so pickNumber() below accepts several candidate key names and
// logShapeOnce() prints the real keys the first time a report comes back. Confirm
// them against your account, then trim the candidate lists to the keys you get.

const SAMSARA_BASE = process.env.SAMSARA_BASE_URL || "https://api.samsara.com";

export interface FleetStats {
  lifetimeMiles?: number;
  monthMiles?: number;
  safeMiles?: number;
  mpg?: number;
  priorMpg?: number;
  idlePct?: number;
  safetyScore?: number;
  violationsMonth?: number;
  harshEvents?: number;
}

export interface FleetSnapshot {
  /** "2026-08" — the month this data covers. */
  periodKey: string;
  source: "samsara" | "none";
  /** Keyed by Samsara driver id. */
  byDriverId: Map<string, FleetStats>;
  /** Fallback lookups when drivers.samsara_driver_id has not been filled in yet. */
  byTruck: Map<string, FleetStats>;
  byName: Map<string, FleetStats>;
  /** Non-fatal problems, surfaced in the run summary. */
  warnings: string[];
}

export function periodKeyFor(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function monthRange(now: Date, monthsBack = 0): { start: string; end: string } {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthsBack, 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthsBack + 1, 1));
  return { start: start.toISOString(), end: end.toISOString() };
}

function monthKey(now: Date, monthsBack: number): string {
  return periodKeyFor(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthsBack, 1)));
}

function emptySnapshot(now: Date, monthsBack: number, source: FleetSnapshot["source"], warnings: string[] = []): FleetSnapshot {
  return {
    periodKey: monthKey(now, monthsBack),
    source,
    byDriverId: new Map(),
    byTruck: new Map(),
    byName: new Map(),
    warnings,
  };
}

const shapeLogged = new Set<string>();
function logShapeOnce(label: string, sample: unknown) {
  if (shapeLogged.has(label) || !sample || typeof sample !== "object") return;
  shapeLogged.add(label);
  console.log(`[fleet] ${label} row keys: ${Object.keys(sample as object).join(", ")}`);
}

/** Read the first candidate key that holds a finite number. Supports "a.b" paths. */
function pickNumber(row: any, keys: string[]): number | undefined {
  for (const k of keys) {
    const v = k.split(".").reduce((o: any, part) => (o == null ? o : o[part]), row);
    const n = typeof v === "string" ? Number(v) : v;
    if (typeof n === "number" && Number.isFinite(n)) return n;
  }
  return undefined;
}

async function samsaraGet(path: string, token: string): Promise<any> {
  const res = await fetch(`${SAMSARA_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Samsara ${path} -> ${res.status} ${body}`.slice(0, 400));
  }
  return res.json();
}

/** Runaway guard: 20 pages x 512 rows is far past any real fleet. */
const MAX_PAGES = 20;

/**
 * Follow Samsara's cursor pagination and return every row.
 *
 * Samsara caps a page at 512 rows and returns
 * `pagination: { hasNextPage, endCursor }`. Without this a fleet larger than one
 * page would silently lose drivers from the leaderboards - they would simply never
 * win anything, with no error anywhere.
 */
async function samsaraGetAll(
  path: string,
  token: string,
  onWarning: (message: string) => void,
): Promise<any[]> {
  const rows: any[] = [];
  const sep = path.includes("?") ? "&" : "?";
  let after: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = `${path}${sep}limit=512${after ? `&after=${encodeURIComponent(after)}` : ""}`;
    const data = await samsaraGet(url, token);
    rows.push(...(data?.data ?? []));

    const next = data?.pagination;
    if (!next?.hasNextPage || !next?.endCursor) return rows;
    after = String(next.endCursor);

    if (page === MAX_PAGES - 1) {
      onWarning(`${path}: stopped after ${MAX_PAGES} pages (${rows.length} rows) - more data was available.`);
    }
  }
  return rows;
}

/** Samsara reports distance in metres on most report endpoints. */
function metersToMiles(m?: number): number | undefined {
  return m === undefined ? undefined : m / 1609.344;
}

/**
 * Build a fleet snapshot for ONE month.
 *
 * `monthsBack` defaults to 1 - the last COMPLETE month. Monthly awards (Top-3 MPG,
 * best safety score, zero-violation month) must be judged on a finished month:
 * ranking a half-finished month would lock in a winner on the 3rd and leave the
 * rest of the fleet no way to catch up.
 *
 * Safe to call with no Samsara token - the engine degrades to CRM-only awards
 * rather than failing.
 */
export async function getFleetSnapshot(now: Date = new Date(), monthsBack = 1): Promise<FleetSnapshot> {
  const token = process.env.SAMSARA_API_TOKEN;
  if (!token) {
    return emptySnapshot(now, monthsBack, "none", [
      "SAMSARA_API_TOKEN not set — fleet-driven awards (MPG, safety, mileage) are inactive.",
    ]);
  }

  const snap = emptySnapshot(now, monthsBack, "samsara");
  const byId = snap.byDriverId;
  const upsert = (id: string, patch: FleetStats) => {
    byId.set(id, { ...(byId.get(id) || {}), ...patch });
  };

  // 1) Roster — gives us the truck/name fallbacks and the id list for safety scores.
  const roster = new Map<string, { name?: string; truck?: string }>();
  try {
    const rosterRows = await samsaraGetAll("/fleet/drivers", token, (m) => snap.warnings.push(m));
    for (const d of rosterRows) {
      logShapeOnce("drivers", d);
      const id = String(d.id ?? d.driverId ?? "");
      if (!id) continue;
      roster.set(id, {
        name: d.name,
        truck: d.staticAssignedVehicle?.name ?? d.vehicle?.name ?? d.assignedVehicleId,
      });
      upsert(id, {});
    }
  } catch (err: any) {
    snap.warnings.push(`driver roster: ${err.message}`);
  }

  // 2) Fuel & energy — this month and last month (last month powers Most-Improved MPG).
  const passes: Array<{ monthsBack: number; prior: boolean }> = [
    { monthsBack, prior: false },
    { monthsBack: monthsBack + 1, prior: true },
  ];
  for (const pass of passes) {
    const { start, end } = monthRange(now, pass.monthsBack);
    try {
      const rows = await samsaraGetAll(
        `/fleet/reports/drivers/fuel-energy?startTime=${encodeURIComponent(start)}&endTime=${encodeURIComponent(end)}`,
        token,
        (m) => snap.warnings.push(m),
      );
      for (const row of rows) {
        logShapeOnce("fuel-energy", row);
        const id = String(row.driver?.id ?? row.driverId ?? row.id ?? "");
        if (!id) continue;
        const mpg = pickNumber(row, [
          "fuelEfficiencyMpg", "efficiency.mpg", "fuelEfficiency.mpg", "mpg",
        ]);
        if (pass.prior) {
          upsert(id, { priorMpg: mpg });
          continue;
        }
        const meters = pickNumber(row, ["distanceDrivenMeters", "distanceMeters", "totalDistanceMeters"]);
        const idleMs = pickNumber(row, ["engineIdleTimeDurationMs", "idleTimeMs", "engineIdleMs"]);
        const runMs = pickNumber(row, ["engineRunTimeDurationMs", "engineRunTimeMs", "runTimeMs"]);
        upsert(id, {
          mpg,
          monthMiles: metersToMiles(meters),
          idlePct: idleMs !== undefined && runMs ? (idleMs / runMs) * 100 : undefined,
        });
      }
    } catch (err: any) {
      snap.warnings.push(`fuel-energy (${pass.prior ? "prior" : "current"} month): ${err.message}`);
    }
  }

  // 3) Safety score per driver, for the month.
  const monthWindow = monthRange(now, monthsBack);
  for (const id of Array.from(byId.keys())) {
    try {
      const data = await samsaraGet(
        `/fleet/drivers/${encodeURIComponent(id)}/safety/score` +
          `?startTime=${encodeURIComponent(monthWindow.start)}&endTime=${encodeURIComponent(monthWindow.end)}`,
        token,
      );
      const row = data?.data ?? data;
      logShapeOnce("safety-score", row);
      upsert(id, {
        safetyScore: pickNumber(row, ["safetyScore", "score", "driverSafetyScore"]),
        harshEvents: pickNumber(row, ["harshEventCount", "totalHarshEventCount", "harshEvents"]),
      });
    } catch (err: any) {
      snap.warnings.push(`safety score ${id}: ${err.message}`);
    }
  }

  // Build the fallback indexes.
  for (const entry of Array.from(byId.entries())) {
    const [id, stats] = entry;
    const meta = roster.get(id);
    if (meta?.truck) snap.byTruck.set(String(meta.truck).trim().toLowerCase(), stats);
    if (meta?.name) snap.byName.set(String(meta.name).trim().toLowerCase(), stats);
  }

  return snap;
}

/** Match a CRM driver to their fleet row: explicit id first, then truck, then name. */
export function statsForDriver(
  snap: FleetSnapshot,
  driver: {
    samsaraDriverId?: string | null;
    truckNumber?: string | null;
    firstName: string;
    lastName: string;
  },
): FleetStats | undefined {
  if (driver.samsaraDriverId) {
    const hit = snap.byDriverId.get(String(driver.samsaraDriverId));
    if (hit) return hit;
  }
  if (driver.truckNumber) {
    const hit = snap.byTruck.get(driver.truckNumber.trim().toLowerCase());
    if (hit) return hit;
  }
  return snap.byName.get(`${driver.firstName} ${driver.lastName}`.trim().toLowerCase());
}
