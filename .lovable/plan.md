

## Plan: Optimize SEO Meta for All Pages + Add Missing SEOHead

### Changes

**1. `src/components/SEOHead.tsx`** — Rewrite all `SEO_CONTENT` entries with better-optimized, unique meta. Add `privacy` and `terms` entries.

Improved meta (under 60 char titles, under 155 char descriptions, high-intent keywords):

| Page | Title | Description |
|------|-------|-------------|
| **Home** | `Owner Operator & CDL-A Driver Jobs | XXII Century Trucking` | `Hiring owner operators (90% linehaul) & company drivers (63+ CPM) in Chicago. Fortune 500 freight, weekly pay, full benefits. Apply today.` |
| **Owner Operators** | `Owner Operator Jobs — 90% Linehaul, No Forced Dispatch` | `Earn 90% of every load with XXII Century. Fuel discounts, weekly settlements, Fortune 500 contracts. CDL-A owner operators apply now.` |
| **Company Drivers** | `Company Driver Jobs — 63 CPM, Health & 401(k) Benefits` | `CDL-A company drivers start at 63 CPM with automatic raises. Full medical, dental, vision, 401(k), paid time off. Modern trucks, consistent miles.` |
| **Fleet Program** | `Fleet Partnership & Power Only Program | XXII Century` | `Grow your carrier business with premium Fortune 500 freight. Power Only trailers, 24/7 dispatch, competitive rates for fleet owners and small carriers.` |
| **Freight Services** | `Freight Shipping & Dry Van Logistics | XXII Century` | `Reliable FTL and dry van freight shipping with 97% on-time delivery. Real-time tracking, dedicated account management. Get a free quote.` |
| **About** | `About XXII Century — Chicago Carrier Since 2009` | `Driver-first trucking company with 500+ drivers and Fortune 500 partnerships. Based in Woodridge, IL, serving shippers nationwide since 2009.` |
| **Careers** | `Trucking Careers — Drivers & Dispatchers Hiring Now` | `Open CDL-A driver and OTR dispatcher positions at XXII Century. Competitive pay, benefits, career growth. Browse jobs and apply online.` |
| **Contact** | `Contact XXII Century | Call 773-572-5012 Today` | `Reach our recruiting team at 773-572-5012 or visit 7501 Lemont Rd, Woodridge IL 60517. Quick response for driver applications and freight quotes.` |
| **Blog** | `Trucking Blog — Driver Tips & Industry Insights` | `Expert guides for owner operators and CDL drivers. Career advice, market trends, and trucking best practices from XXII Century professionals.` |
| **Privacy** | `Privacy Policy | XXII Century Trucking` | `How XXII Century collects, uses, and protects your personal information. Read our full privacy policy.` |
| **Terms** | `Terms and Conditions | XXII Century Trucking` | `Review the terms and conditions for using the XXII Century website, including applicant information, intellectual property, and liability.` |

**2. `src/pages/BlogPost.tsx`** — Add `<SEOHead>` with dynamic title/description/keywords/canonical from post data.

**3. `src/pages/CareerDetail.tsx`** — Add `<SEOHead>` with dynamic title/description/keywords/canonical from job data.

**4. `src/pages/PrivacyPolicy.tsx`** — Add `<SEOHead>` with `SEO_CONTENT.privacy` and canonical `/privacy-policy`.

**5. `src/pages/Terms.tsx`** — Add `<SEOHead>` with `SEO_CONTENT.terms` and canonical `/terms`.

### Files Changed
- `src/components/SEOHead.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/CareerDetail.tsx`
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/Terms.tsx`

