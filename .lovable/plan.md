

## Plan: Competitor-Analyzed SEO Meta Optimization for All Pages

### Competitor Analysis Summary

Analyzed: Schneider, Landstar, Beemac Trucking, Marten Transport, T-Brothers Logistics, Roehl, American Central Transport, Freightquote.

**Key patterns from top competitors:**
- Titles lead with job type + pay/benefit hook, end with brand
- Descriptions include specific numbers (pay, benefits), location, and CTA
- Keywords mix high-volume head terms with long-tail local intent
- Titles stay under 60 chars, descriptions under 155 chars
- Action verbs: "Earn", "Drive", "Apply", "Join", "Ship"

### Changes to `src/components/SEOHead.tsx` — `SEO_CONTENT`

| Page | New Title (≤60 chars) | New Description (≤155 chars) | New Keywords |
|------|----------------------|------------------------------|-------------|
| **Home** | `Owner Operator & Company Driver Jobs Chicago IL | XXII Century` | `Chicago trucking company hiring owner operators earning 90% linehaul & company drivers at 65 CPM. Fortune 500 freight, weekly pay, benefits. Apply now.` | Add: `truck driving jobs near me, best trucking company Illinois, CDL jobs Chicago 2025, apply trucking job online, Woodridge IL trucking` |
| **Owner Operators** | `Owner Operator Truck Driver Jobs — Earn 90% Linehaul | XXII Century` | `Owner operator trucking jobs paying 90% linehaul revenue. No forced dispatch, fuel discounts, Fortune 500 loads, weekly settlements. CDL-A contractors apply.` | Add: `owner operator pay per mile, best owner operator trucking company 2025, independent trucker jobs, 1099 truck driver, owner operator dry van loads` |
| **Company Drivers** | `CDL-A Company Driver Jobs — 65 CPM + Full Benefits | XXII Century` | `Company driver positions starting 65 CPM with raises to 80 CPM. Medical, dental, 401(k), paid vacation. Late-model trucks. Apply online in 5 minutes.` | Add: `CDL-A truck driver salary, company driver pay per mile, truck driver benefits package, OTR driver jobs 2025, truck driving career` |
| **Fleet Program** | `Fleet Owner & Power Only Trucking Program | XXII Century` | `Fleet owners & small carriers: access Fortune 500 freight with our Power Only program. Trailer provided, 24/7 dispatch, fast pay. Partner with us today.` | Add: `power only loads, fleet owner trucking program, small carrier partnership, trailer interchange program, trucking business opportunity` |
| **Freight Services** | `Dry Van Freight Shipping — 97% On-Time Delivery | XXII Century` | `Nationwide FTL dry van shipping with 97% on-time rate. Real-time GPS tracking, dedicated account management. Shippers & brokers get a free quote.` | Add: `FTL shipping rates, dry van carrier, truckload freight quote, reliable trucking company, freight broker carrier, nationwide freight shipping` |
| **About** | `About XXII Century — Chicago Trucking Company Since 2009` | `500+ drivers strong. Fortune 500 partnerships. Based in Woodridge, IL. Discover why drivers and shippers choose XXII Century. Join our team today.` | Add: `XXII Century reviews, trucking company Woodridge IL, driver-first carrier, Chicago logistics company, XXII Century careers` |
| **Careers** | `Trucking Jobs — CDL Drivers & Dispatchers Hiring | XXII Century` | `Browse open CDL-A driver, owner operator & dispatcher positions. Competitive pay up to $300K, full benefits, career growth. Apply online — quick application.` | Add: `trucking job application, CDL driver employment, dispatcher job trucking, transportation career opportunities, truck driver hiring 2025` |
| **Contact** | `Contact XXII Century — Call 630-948-0501 | Woodridge, IL` | `Call 630-948-0501 or visit 7501 Lemont Rd, Woodridge IL. Driver applications, freight quotes, fleet partnerships. Our team responds within 24 hours.` | Add: `XXII Century address, trucking company near me, driver recruiter contact, freight quote phone number` |
| **Blog** | `Trucking Industry Blog — Tips & Guides | XXII Century` | `Owner operator tips, CDL career guides, freight market insights & trucking industry news. Expert advice from XXII Century professionals.` | Add: `trucking tips 2025, owner operator advice, CDL driver guides, freight industry trends, trucking career tips` |
| **Privacy** | `Privacy Policy | XXII Century Trucking` | `XXII Century privacy policy. How we collect, use & protect personal data for driver applicants, website visitors & business partners.` | Keep as-is |
| **Terms** | `Terms & Conditions | XXII Century Trucking` | `Terms of use for goxxii.com. Review our policies on driver applications, intellectual property, data use & website access.` | Keep as-is |

### Dynamic Pages

**BlogPost (`src/pages/BlogPost.tsx`)** — Already generates dynamic title/description/keywords from post data. No changes needed.

**CareerDetail (`src/pages/CareerDetail.tsx`)** — Already uses dynamic template. No changes needed.

**OwnerOperatorState (`src/data/statePages.ts`)** — 7 state pages already have per-state SEO. No changes needed.

### Scope
1 file edited: `src/components/SEOHead.tsx` — update all `SEO_CONTENT` entries with competitor-optimized titles, descriptions, and expanded keywords.

