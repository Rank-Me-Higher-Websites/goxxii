

## Comparison: Old Power Fleet Page vs. New Fleet Program Page

After reviewing the old page at goxxii.com/power-fleet/, here's what's **missing** from the new page:

---

### 1. "Reliable Power Only Freight" Section (MISSING)
The old page has a dedicated section with:
- **Heading:** "Reliable Power Only Freight for Experienced Owner Operators"
- **Text:** "XXII Century proudly offers a Power Only Trucking program designed for experienced and professional owner operators. We partner with major corporations and government agencies across the U.S. and Canada, providing access to consistent freight. Our power-only services include a wide range of trailer types — flatbeds, dry vans and reefers — ensuring flexibility and steady work for qualified drivers."
- **Phone number:** 773-572-5012

### 2. "Join Our Power Fleet" Section (MISSING)
Three paragraphs with heading "Join Our Power Fleet and Grow Your Owner Operator Trucking Career":
- Paragraph about empowering owner operators, flexible scheduling, competitive pay, local and long-haul routes across U.S. and Canada
- Paragraph about freight options (dry vans, reefers, tankers), dry van owner operator jobs, 24/7 dispatch support
- Paragraph: "Join the XXII Century Power Fleet today and experience the benefits of a logistics partner dedicated to your growth, independence, and long-term success in the owner operator trucking industry."

### 3. "GET THE SUPPORT YOU NEED" Section (MISSING)
- **Heading:** "GET THE SUPPORT YOU NEED"
- **Subheading:** "DRIVE SUCCESS WITH XXII CENTURY: TEAM SUPPORT, REWARDS, AND LASTING SUCCESS"
- **Text:** "16 years strong in trucking. XXII Century is all about reliability, safety, satisfaction, and transparency. With deep industry know-how, we tackle every challenge head-on, delivering the quality service you can count on."
- **Stats grid:** $1,000 Referral Bonus | $100K Average Annual Income | 24/7 Dispatch Support | $500 (unclear label)
- **CTA:** "Reach Us Now" phone link (630-948-0501)

### 4. "PROGRAM REQUIREMENTS" Section (MISSING)
- **Heading:** "PROGRAM REQUIREMENTS"
- **Text:** "We set high standards and in turn, we expect you to pass through our strict quality assurance mandate in order to join our Power Only Trucking program..."
- **"WHAT'S NEEDED?" checklist:**
  - Motor Carrier Authority
  - DOT Number
  - Auto Liability Insurance
  - Cargo Liability Insurance
  - Non-Owned Trailer Interchange Insurance

### 5. Hero Heading Difference
- **Old:** "XXII CENTURY Fleet Program for Owner Operators"
- **New:** "XXII Century — Company & Owner Operator Trucking Jobs with Top Pay"
- Old also had a "call us" phone link (630-948-0501) next to Apply button

---

### What's Present in New but NOT in Old (fine to keep)
- Company Driver section (new addition)
- Tech Benefits, Trusted Brands, FAQ sections
- SEO Content section

---

### Implementation Plan

To match the old page content, add these **4 new sections** to `FleetProgram.tsx`:

1. **Create `FleetPowerOnlySection.tsx`** — "Reliable Power Only Freight" intro text with phone number
2. **Create `FleetJoinSection.tsx`** — "Join Our Power Fleet" with the 3 paragraphs + Apply CTA
3. **Create `FleetSupportSection.tsx`** — "GET THE SUPPORT YOU NEED" with stats grid ($1000, $100K, 24/7, $500) and phone CTA
4. **Create `FleetRequirementsSection.tsx`** — "PROGRAM REQUIREMENTS" with checklist of 5 required items

5. **Update `FleetProgram.tsx`** — Import and add all 4 new sections in order after the hero

