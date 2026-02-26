

## Plan: Create 7 Location-Based Owner Operator State Pages

Yes, I have successfully captured all the content from every state page. Here's what I'll build:

### Pages to Create
1. `/owner-operators/illinois`
2. `/owner-operators/iowa`
3. `/owner-operators/kentucky`
4. `/owner-operators/ohio`
5. `/owner-operators/mississippi`
6. `/owner-operators/south-dakota`
7. `/owner-operators/west-virginia`

### Content Captured Per State
Each page has unique, state-specific content that I've extracted:
- **Headlines** (different per state)
- **Subtitles** (different per state)
- **Struggles section** (varies -- some use "Low Freight Rates", others "Spot Market STRUGGLES", "Low-Pay Loads", etc.)
- **Benefits list** (slight variations per state)
- **9 FAQ questions and answers** (fully unique per state with state-specific SEO keywords)
- All phone numbers will use **773-572-5012**

### Implementation Steps

**Step 1: Create `src/data/statePages.ts`**
- Large data file containing all 7 states' content: slug, name, headline, subtitle, hero description, struggles (5 per state with emoji/title/desc), benefits list, and 9 FAQs with full answers
- All content copied exactly from the old WordPress pages

**Step 2: Create `src/pages/OwnerOperatorState.tsx`**
- Dynamic page component that reads `:state` param from URL
- Looks up state data from the data file
- Renders sections matching the old WordPress layout:
  1. Hero with stats bar (2009, $300K+, 500+, 24/7)
  2. Tech benefits strip (reuses existing `TechBenefitsSection`)
  3. Struggles carousel (5 items per state)
  4. "What You Get" section with benefits list + image + Apply CTA
  5. FAQ accordion with 9 state-specific Q&As
- Uses existing components: `Layout`, `SEOHead`, `TechBenefitsSection`, `Button`, `Accordion`
- Redirects to `/owner-operators` if state slug is invalid

**Step 3: Add route to `App.tsx`**
- Add `/owner-operators/:state` route before the wildcard `*` route

### Technical Details
- Reuses existing design patterns (glass cards, motion animations, hero/heroOutline buttons)
- All Apply buttons link to `https://intelliapp.driverapponline.com/c/goxxii?r=Eve`
- Phone number: 773-572-5012 everywhere
- SEO: unique title/description/keywords per state
- No contact form (links to IntelliApp instead, matching current site pattern)
- Images reuse existing assets from `src/assets/` (driver-truck-blue.jpg, gallery images, etc.)

