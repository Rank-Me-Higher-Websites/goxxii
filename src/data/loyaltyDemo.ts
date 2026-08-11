// V1 demo fleet for the /loyalty preview.
//
// The field names below mirror what Samsara actually returns, so wiring the real
// API later is a straight mapping — nothing about the rewards engine changes:
//
//   Samsara endpoint                          -> field here
//   /fleet/drivers                            -> id, name (+ hireDate from HR)
//   /fleet/reports/drivers/fuel-energy        -> totalMiles, mpg, idlePercent
//   /fleet/drivers/safety/score               -> safetyScore, harshEvents
//
// Until that key exists, these ten drivers stand in so the whole program can be
// demonstrated end to end.

import { evaluateRewards, type DriverStats, type EarnedAward } from "./rewardsProgram";

export interface DemoDriver {
  id: string;
  name: string;
  truck: string;
  hireDate: string; // ISO — from your driver CRM, not Samsara
  driverType: "company" | "owner_operator";
  totalMiles: number; // Samsara: lifetime odometer
  monthMiles: number; // Samsara: miles driven this month
  safeMiles: number;
  mpg: number; // Samsara: fuelEfficiency, this month
  priorMpg: number;
  idlePercent: number; // Samsara: idle time %
  eliteFuelMonths: number;
  safetyScore: number; // Samsara: 0-100
  violationsMonth: number;
  accidentFreeDays: number;
  cleanInspection: boolean;
  referralHiredRetained: boolean;
}

// Fixed "today" so the demo is stable and never drifts.
export const DEMO_TODAY = new Date("2026-08-04T12:00:00Z");

export const DEMO_DRIVERS: DemoDriver[] = [
  {
    id: "D-1042", driverType: "company", name: "Michael Torres", truck: "1187",
    hireDate: "2025-07-19", monthMiles: 11240, totalMiles: 412_600, safeMiles: 412_600,
    mpg: 8.4, priorMpg: 8.1, idlePercent: 9, eliteFuelMonths: 4,
    safetyScore: 98, violationsMonth: 0, accidentFreeDays: 720,
    cleanInspection: true, referralHiredRetained: true,
  },
  {
    id: "D-1108", driverType: "owner_operator", name: "Dwayne Ellis", truck: "1203",
    hireDate: "2024-02-06", monthMiles: 10860, totalMiles: 358_900, safeMiles: 358_900,
    mpg: 8.1, priorMpg: 7.4, idlePercent: 11, eliteFuelMonths: 3,
    safetyScore: 95, violationsMonth: 0, accidentFreeDays: 900,
    cleanInspection: false, referralHiredRetained: false,
  },
  {
    id: "D-1155", driverType: "company", name: "Andre Willis", truck: "1219",
    hireDate: "2025-02-11", monthMiles: 10120, totalMiles: 168_300, safeMiles: 168_300,
    mpg: 7.9, priorMpg: 7.2, idlePercent: 12, eliteFuelMonths: 1,
    safetyScore: 93, violationsMonth: 0, accidentFreeDays: 540,
    cleanInspection: true, referralHiredRetained: false,
  },
  {
    id: "D-1187", driverType: "company", name: "Sergei Petrov", truck: "1241",
    hireDate: "2025-08-02", monthMiles: 9640, totalMiles: 121_450, safeMiles: 121_450,
    mpg: 7.6, priorMpg: 7.5, idlePercent: 13, eliteFuelMonths: 0,
    safetyScore: 91, violationsMonth: 0, accidentFreeDays: 368,
    cleanInspection: false, referralHiredRetained: true,
  },
  {
    id: "D-1214", driverType: "company", name: "Marcus Bell", truck: "1256",
    hireDate: "2026-02-01", monthMiles: 9980, totalMiles: 74_200, safeMiles: 74_200,
    mpg: 7.3, priorMpg: 6.8, idlePercent: 14, eliteFuelMonths: 0,
    safetyScore: 88, violationsMonth: 0, accidentFreeDays: 185,
    cleanInspection: true, referralHiredRetained: false,
  },
  {
    id: "D-1240", driverType: "company", name: "Tyler Nowak", truck: "1268",
    hireDate: "2026-05-06", monthMiles: 8730, totalMiles: 38_900, safeMiles: 38_900,
    mpg: 7.1, priorMpg: 6.6, idlePercent: 14, eliteFuelMonths: 0,
    safetyScore: 86, violationsMonth: 1, accidentFreeDays: 90,
    cleanInspection: false, referralHiredRetained: false,
  },
  {
    id: "D-1266", driverType: "company", name: "Rashad Coleman", truck: "1274",
    hireDate: "2026-06-05", monthMiles: 8210, totalMiles: 22_100, safeMiles: 22_100,
    mpg: 6.9, priorMpg: 6.4, idlePercent: 16, eliteFuelMonths: 0,
    safetyScore: 84, violationsMonth: 0, accidentFreeDays: 60,
    cleanInspection: false, referralHiredRetained: false,
  },
  {
    id: "D-1281", driverType: "owner_operator", name: "Victor Ramos", truck: "1281",
    hireDate: "2026-07-06", monthMiles: 7480, totalMiles: 9_400, safeMiles: 9_400,
    mpg: 7.2, priorMpg: 6.9, idlePercent: 13, eliteFuelMonths: 0,
    safetyScore: 90, violationsMonth: 0, accidentFreeDays: 29,
    cleanInspection: true, referralHiredRetained: false,
  },
  {
    id: "D-1290", driverType: "company", name: "Jamal Whitfield", truck: "1290",
    hireDate: "2026-08-03", monthMiles: 620, totalMiles: 620, safeMiles: 620,
    mpg: 7.0, priorMpg: 0, idlePercent: 12, eliteFuelMonths: 0,
    safetyScore: 92, violationsMonth: 0, accidentFreeDays: 1,
    cleanInspection: false, referralHiredRetained: false,
  },
  {
    id: "D-1064", driverType: "owner_operator", name: "Karol Adamczyk", truck: "1174",
    hireDate: "2021-08-16", monthMiles: 10450, totalMiles: 528_400, safeMiles: 505_900,
    mpg: 7.8, priorMpg: 7.7, idlePercent: 10, eliteFuelMonths: 2,
    safetyScore: 96, violationsMonth: 0, accidentFreeDays: 1_450,
    cleanInspection: true, referralHiredRetained: true,
  },
];

export function daysBetween(fromISO: string, to: Date = DEMO_TODAY): number {
  return Math.max(0, Math.floor((to.getTime() - new Date(fromISO).getTime()) / 86_400_000));
}

// Fleet-wide ranks — the "cohort" rules (Top-3 MPG, best safety) need these,
// and in production n8n computes them the exact same way before evaluating.
// The MPG ranking only covers company drivers: owner-operators buy their own
// fuel, so they're outside the fuel programme entirely.
export const COMPANY_DRIVERS = DEMO_DRIVERS.filter((d) => d.driverType === "company");
const byMpg = [...COMPANY_DRIVERS].sort((a, b) => b.mpg - a.mpg).map((d) => d.id);
const bySafety = [...DEMO_DRIVERS].sort((a, b) => b.safetyScore - a.safetyScore).map((d) => d.id);
const mostImprovedId = [...DEMO_DRIVERS]
  .filter((d) => d.priorMpg > 0)
  .sort((a, b) => b.mpg - b.priorMpg - (a.mpg - a.priorMpg))[0]?.id;

export function statsFor(d: DemoDriver): DriverStats {
  const tenureDays = daysBetween(d.hireDate);
  return {
    status: "active",
    driverType: d.driverType,
    tenureDays,
    tenureYears: Math.floor(tenureDays / 365),
    lifetimeMiles: d.totalMiles,
    safeMiles: d.safeMiles,
    monthlyMpg: d.mpg,
    priorMonthMpg: d.priorMpg,
    idlePct: d.idlePercent,
    eliteFuelMonths: d.eliteFuelMonths,
    violationsMonth: d.violationsMonth,
    accidentFreeDays: d.accidentFreeDays,
    mpgRank: byMpg.indexOf(d.id) + 1,
    safetyRank: bySafety.indexOf(d.id) + 1,
    cleanInspection: d.cleanInspection,
    referralHiredRetained: d.referralHiredRetained,
  };
}

export function awardsFor(d: DemoDriver): EarnedAward[] {
  return evaluateRewards(statsFor(d));
}

export const MOST_IMPROVED_ID = mostImprovedId;

export const MPG_LEADERBOARD = [...DEMO_DRIVERS]
  .sort((a, b) => b.mpg - a.mpg)
  .slice(0, 3);

export const SAFETY_LEADER = [...DEMO_DRIVERS].sort((a, b) => b.safetyScore - a.safetyScore)[0];

/** Monthly standings shown to drivers — name and figure only. */
export interface BoardRow {
  name: string;
  value: string;
}

export const BOARDS: {
  key: string;
  title: string;
  unit: string;
  note?: string;
  rows: BoardRow[];
}[] = [
  {
    key: "mpg",
    title: "Fuel Efficiency",
    unit: "MPG",
    note: "Company drivers",
    // Owner-operators are excluded — they fuel their own trucks.
    rows: [...COMPANY_DRIVERS]
      .sort((a, b) => b.mpg - a.mpg)
      .slice(0, 5)
      .map((d) => ({ name: d.name, value: d.mpg.toFixed(1) })),
  },
  {
    key: "safety",
    title: "Safety Score",
    unit: "pts",
    rows: [...DEMO_DRIVERS]
      .sort((a, b) => b.safetyScore - a.safetyScore)
      .slice(0, 5)
      .map((d) => ({ name: d.name, value: String(d.safetyScore) })),
  },
  {
    key: "miles",
    title: "Miles This Month",
    unit: "mi",
    rows: [...DEMO_DRIVERS]
      .sort((a, b) => b.monthMiles - a.monthMiles)
      .slice(0, 5)
      .map((d) => ({ name: d.name, value: d.monthMiles.toLocaleString("en-US") })),
  },
];
