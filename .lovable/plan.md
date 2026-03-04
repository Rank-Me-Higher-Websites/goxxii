

## Plan: Add Fuel Efficiency Incentive Program Content to Company Drivers Page

### Analysis

The user provided 5 content blocks about a **Driver Fuel Efficiency Incentive Program**. Here's my analysis:

1. **FAQs** (6 new questions about the incentive program) → **Add** to existing `companyDriverFaqs` array in `FAQSection.tsx`. Also update `companyDriverFaqsPlain` in `schemaData.ts` for structured data.

2. **Program overview** (how it works, weekly leaderboard, monthly rewards, annual prize) → **New section** — this is entirely new content with no existing equivalent.

3. **Actionable MPG tips** (11 tips to improve fuel efficiency) → **New section** — collapsible/accordion format fits well for 11 items.

4. **Monthly reward criteria** (pay tiers + examples table) → Part of the new program section (content block 2), combined into one cohesive section.

5. **Annual top driver** → Also part of the program section as a highlight/callout.

### New Components & Changes

#### 1. New: `FuelIncentiveSection.tsx`
A dedicated section combining content blocks 2, 4, and 5 into one cohesive "Fuel Efficiency Incentive Program" section:
- **Program intro** with the "save fuel and reward great driving" messaging
- **How It Works** — 3 cards: Weekly Leaderboard, Monthly Rewards, Annual Top Driver
- **Monthly Reward Criteria** — tier breakdown (7+ MPG = 1¢/mi, 8+ MPG = 2¢/mi) with example earnings table
- **Team driving note** about combined MPG calculation
- Visual styling consistent with existing sections (glass cards, motion animations)

#### 2. New: `FuelTipsSection.tsx`
An accordion-based section for the 11 actionable MPG tips:
- Section heading: "Tips to Improve MPG & Reduce Idling"
- Each tip as an accordion item (Drive Smoothly, Maintain Steady Speed, Reduce Idling, etc.)
- Sub-bullets rendered inside each accordion panel
- Keeps the page scannable without overwhelming with text

#### 3. Update: `FAQSection.tsx`
Add 6 new FAQ entries to the `companyDriverFaqs` array:
- How to check MPG, payout timing, questions/suggestions contact, auto-enrollment, tied MPG tiebreaker, Owner Operator exclusion

#### 4. Update: `schemaData.ts`
Add the same 6 FAQs to `companyDriverFaqsPlain` for structured data / SEO schema.

#### 5. Update: `CompanyDrivers.tsx`
Import and place the two new sections in the page layout:
```
CompanyDriverHeroSection
SEOContentSection
FuelIncentiveSection     ← NEW
FuelTipsSection          ← NEW
TechBenefitsSection
FAQSection (now with 6 extra FAQs)
```

### Section Order Rationale
The incentive program and tips go between SEO content and tech benefits — they're a natural progression from "why drive here" → "earn more with fuel efficiency" → "tech & benefits" → "FAQs".

