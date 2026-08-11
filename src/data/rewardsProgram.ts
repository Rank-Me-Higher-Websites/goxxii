// XXII Century Driver Rewards & Loyalty Program
// Single source of truth for the reward matrix + the evaluation engine.
// Consumed by the public /rewards page AND the n8n award engine (via /api/rewards/evaluate).

export type RewardKind = "digital" | "branded" | "perk";

export interface Reward {
  kind: RewardKind;
  label: string;
}

// How a rule is triggered:
//  - "threshold": computable from a single driver record (tenure, miles, etc.)
//  - "cohort":    needs fleet-wide ranking for the period (Top-3 MPG, best safety score)
//  - "event":     fired by an external event (clean DOT inspection, referral hired)
export type TriggerType = "threshold" | "cohort" | "event";

/** Who a rule applies to. Owner-operators buy their own fuel, so the
 *  MPG rewards are company-driver only. */
export type Audience = "both" | "company";

export type DriverType = "company" | "owner_operator";

export interface RewardRule {
  id: string;
  event: string;
  condition: string;
  /** Plain-English version of `condition`, for driver-facing pages. */
  when: string;
  who: Audience;
  trigger: TriggerType;
  rewards: Reward[];
  // Optional machine test for threshold rules. Returns the earned reward(s) or false.
  test?: (d: DriverStats) => boolean;
}

export interface RewardCategory {
  key: string;
  label: string;
  blurb: string;
  rules: RewardRule[];
}

// Snapshot of a driver used by the engine. n8n populates this from fleet/ELD data.
export interface DriverStats {
  status?: "active" | "inactive";
  tenureDays?: number;
  tenureYears?: number;
  lifetimeMiles?: number;
  safeMiles?: number;
  monthlyMpg?: number;
  priorMonthMpg?: number;
  idlePct?: number;
  eliteFuelMonths?: number; // consecutive months >= 8.0 mpg
  violationsMonth?: number;
  accidentFreeDays?: number;
  mpgRank?: number; // fleet rank this month (1 = best)
  safetyRank?: number; // fleet rank this month (1 = best)
  cleanInspection?: boolean; // event this period
  referralHiredRetained?: boolean; // a referral reached 90 days
  /** Owner-operators buy their own fuel, so they're excluded from MPG rewards.
   *  Defaults to "company" when not supplied. */
  driverType?: DriverType;
}

const r = (kind: RewardKind, label: string): Reward => ({ kind, label });

export const REWARD_PROGRAM: RewardCategory[] = [
  {
    key: "A",
    label: "Onboarding & Tenure",
    blurb: "Every mile of loyalty recognized — from day one to a decade in.",
    rules: [
      {
        id: "TEN-01",
        event: "Day 1 — Welcome",
        condition: "status = active",
        when: "On day one",
        who: "both",
        trigger: "threshold",
        rewards: [
          r("branded", "Welcome Kit — cap, tumbler, tee, decals, lanyard"),
          r("digital", "welcome email + driver portal badge"),
        ],
        test: (d) => d.status === "active",
      },
      {
        id: "TEN-02",
        event: "Day 30 / Day 60",
        condition: "tenure_days = 30, 60",
        when: "At 30 and 60 days",
        who: "both",
        trigger: "threshold",
        rewards: [r("digital", "milestone badge")],
        test: (d) => d.tenureDays === 30 || d.tenureDays === 60,
      },
      {
        id: "TEN-03",
        event: "3 months",
        condition: "tenure_days ≥ 90",
        when: "After 3 months",
        who: "both",
        trigger: "threshold",
        rewards: [r("digital", "3-Month certificate")],
        test: (d) => (d.tenureDays ?? 0) >= 90,
      },
      {
        id: "TEN-04",
        event: "6 months",
        condition: "tenure_days ≥ 182",
        when: "After 6 months",
        who: "both",
        trigger: "threshold",
        rewards: [
          r("digital", "6-Month certificate"),
          r("branded", "softshell jacket + cooler bag"),
        ],
        test: (d) => (d.tenureDays ?? 0) >= 182,
      },
      {
        id: "TEN-05",
        event: "1 year",
        condition: "tenure_days ≥ 365",
        when: "After 1 year",
        who: "both",
        trigger: "threshold",
        rewards: [
          r("digital", "1-Year certificate"),
          r("branded", "premium embroidered jacket + challenge coin"),
        ],
        test: (d) => (d.tenureDays ?? 0) >= 365,
      },
      {
        id: "TEN-06",
        event: "2 & 3 years",
        condition: "tenure_years = 2, 3",
        when: "At 2 and 3 years",
        who: "both",
        trigger: "threshold",
        rewards: [r("digital", "anniversary certificate")],
        test: (d) => d.tenureYears === 2 || d.tenureYears === 3,
      },
      {
        id: "TEN-07",
        event: "5 & 10 years",
        condition: "tenure_years = 5, 10",
        when: "At 5 and 10 years",
        who: "both",
        trigger: "threshold",
        rewards: [r("digital", "milestone certificate")],
        test: (d) => d.tenureYears === 5 || d.tenureYears === 10,
      },
    ],
  },
  {
    key: "B",
    label: "Mileage Milestones",
    blurb: "The odometer never lies. Big numbers earn big recognition.",
    rules: [
      {
        id: "MI-01",
        event: "100,000 miles",
        condition: "lifetime_miles ≥ 100k",
        when: "At 100,000 lifetime miles",
        who: "both",
        trigger: "threshold",
        rewards: [
          r("digital", "100k certificate"),
          r("branded", "emergency roadside kit + truck decal"),
        ],
        test: (d) => (d.lifetimeMiles ?? 0) >= 100000,
      },
      {
        id: "MI-02",
        event: "350,000 miles",
        condition: "lifetime_miles ≥ 350k",
        when: "At 350,000 lifetime miles",
        who: "both",
        trigger: "threshold",
        rewards: [
          r("digital", "milestone certificate"),
          r("branded", "premium milestone kit — embroidered jacket + engraved keepsake"),
        ],
        test: (d) => (d.lifetimeMiles ?? 0) >= 350000,
      },
    ],
  },
  {
    key: "C",
    label: "Fuel Efficiency (MPG)",
    blurb: "Smooth driving pays. Recognize the fuel-savers every single month.",
    rules: [
      {
        id: "MPG-01",
        event: "Qualifying MPG month",
        condition: "monthly_mpg ≥ 7.0 (≥ 8.0 = top tier) AND idle_pct < 15",
        when: "Beat 7.0 MPG with low idle time",
        who: "company",
        trigger: "threshold",
        rewards: [r("digital", "leaderboard eligible")],
        test: (d) => (d.monthlyMpg ?? 0) >= 7.0 && (d.idlePct ?? 100) < 15,
      },
      {
        id: "MPG-02",
        event: "Best MPG — Top 3",
        condition: "rank(monthly_mpg) ≤ 3",
        when: "Finish top 3 in the fleet for the month",
        who: "company",
        trigger: "cohort",
        rewards: [r("digital", "Best-MPG certificate + leaderboard graphic")],
        test: (d) => (d.mpgRank ?? 999) <= 3,
      },
      {
        id: "MPG-03",
        event: "Most Improved MPG",
        condition: "max(monthly_mpg − prior_month_mpg)",
        when: "Improve your MPG the most this month",
        who: "company",
        trigger: "cohort",
        rewards: [r("digital", "Most-Improved certificate")],
      },
      {
        id: "MPG-04",
        event: "Elite Fuel Club",
        condition: "monthly_mpg ≥ 8.0 for 3 consecutive months",
        when: "Hold 8.0+ MPG for three months running",
        who: "company",
        trigger: "threshold",
        rewards: [r("perk", "standing status + badge")],
        test: (d) => (d.eliteFuelMonths ?? 0) >= 3,
      },
    ],
  },
  {
    key: "D",
    label: "Safety & Compliance",
    blurb: "Safe miles protect the driver, the fleet, and the CSA score.",
    rules: [
      {
        id: "SF-01",
        event: "Best Safety Score — month",
        condition: "rank(safety_score) = 1",
        when: "Post the best safety score of the month",
        who: "both",
        trigger: "cohort",
        rewards: [r("digital", "Best-Safety certificate + leaderboard")],
        test: (d) => d.safetyRank === 1,
      },
      {
        id: "SF-02",
        event: "No Violations month",
        condition: "violations_month = 0",
        when: "Finish a month with zero violations",
        who: "both",
        trigger: "threshold",
        rewards: [
          r("digital", "Clean-Record certificate"),
          r("perk", "quarterly raffle entry + points"),
        ],
        test: (d) => d.violationsMonth === 0,
      },
      {
        id: "SF-03",
        event: "Clean DOT inspection",
        condition: "clean_inspection event",
        when: "Pass a DOT inspection clean",
        who: "both",
        trigger: "event",
        rewards: [r("digital", "badge (protects CSA score)")],
        test: (d) => d.cleanInspection === true,
      },
      {
        id: "SF-04",
        event: "Accident-free — 1 year",
        condition: "accident_free_days ≥ 365",
        when: "Go a full year accident-free",
        who: "both",
        trigger: "threshold",
        rewards: [r("digital", "certificate")],
        test: (d) => (d.accidentFreeDays ?? 0) >= 365,
      },
      {
        id: "SF-05",
        event: "Safe-mile milestones",
        condition: "safe_miles ≥ 100k / 250k / 500k",
        when: "At 100k, 250k and 500k safe miles",
        who: "both",
        trigger: "threshold",
        rewards: [r("digital", "certificate")],
        test: (d) => (d.safeMiles ?? 0) >= 100000,
      },
    ],
  },
  {
    key: "E",
    label: "Referral & Recruiting",
    blurb: "Great drivers know great drivers. Reward the ones who bring them in.",
    rules: [
      {
        id: "REF-01",
        event: "Referral hired & retained",
        condition: "referral.status = hired AND referral.tenure ≥ 90",
        when: "Refer a driver who stays 90 days",
        who: "both",
        trigger: "event",
        rewards: [r("digital", "badge"), r("perk", "recognition")],
        test: (d) => d.referralHiredRetained === true,
      },
    ],
  },
];

export const ALL_RULES: RewardRule[] = REWARD_PROGRAM.flatMap((c) => c.rules);

export interface EarnedAward {
  ruleId: string;
  event: string;
  category: string;
  rewards: Reward[];
}

// Pure engine: given a driver snapshot, return every threshold/testable award earned.
// Cohort/event rules only fire here if n8n has already stamped the rank/event fields.
export function evaluateRewards(d: DriverStats): EarnedAward[] {
  const earned: EarnedAward[] = [];
  const isOwnerOp = d.driverType === "owner_operator";
  for (const cat of REWARD_PROGRAM) {
    for (const rule of cat.rules) {
      // Owner-operators fuel their own trucks — MPG rewards don't apply to them.
      if (isOwnerOp && rule.who === "company") continue;
      if (rule.test && rule.test(d)) {
        earned.push({
          ruleId: rule.id,
          event: rule.event,
          category: cat.label,
          rewards: rule.rewards,
        });
      }
    }
  }
  return earned;
}

export const KIND_META: Record<RewardKind, { label: string; hue: string }> = {
  digital: { label: "DIGITAL", hue: "green" },
  branded: { label: "BRANDED", hue: "slate" },
  perk: { label: "PERK", hue: "cyan" },
};

// Totals for the marketing hero.
export const PROGRAM_STATS = {
  categories: REWARD_PROGRAM.length,
  milestones: ALL_RULES.length,
  digitalAwards: ALL_RULES.reduce(
    (n, rule) => n + rule.rewards.filter((rw) => rw.kind === "digital").length,
    0,
  ),
};
