

## Plan: Add Comprehensive JSON-LD Schema to Every Page

### Approach
Create a new `SchemaMarkup` component that dynamically injects JSON-LD structured data per page. Remove the static schemas from `index.html` (they only apply to the homepage and don't update on navigation). Each page gets its own tailored schema set.

### Schema Types per Page

| Page | Schemas |
|------|---------|
| **All pages** | Organization, LocalBusiness, BreadcrumbList |
| **Home** | + WebSite, Service (trucking services overview), FAQPage |
| **Owner Operators** | + JobPosting (contractor), Service (OO program), FAQPage |
| **Company Drivers** | + JobPosting (employee), Service (CD program), FAQPage |
| **Fleet Program** | + Service (fleet partnership), FAQPage |
| **Freight Services** | + Service (freight/logistics) |
| **About** | + (Organization enhanced with foundingDate, employees, etc.) |
| **Careers** | + JobPosting ×3 (dispatcher, OO, CD), FAQPage |
| **Contact** | + ContactPage, FAQPage |
| **Blog** | + Blog, CollectionPage |
| **Blog Post** | + BlogPosting (per article) |
| **State Pages** | + JobPosting (state-specific), FAQPage, Service |

### Implementation Steps

1. **Create `src/components/SchemaMarkup.tsx`** — A component that accepts a `schemas` prop (array of JSON-LD objects) and renders them as `<script type="application/ld+json">` tags via `useEffect` (appending to `<head>`, cleaning up on unmount).

2. **Create `src/data/schemaData.ts`** — Centralized schema generator functions:
   - `getOrganizationSchema()` — name, logo, url, contact, sameAs
   - `getLocalBusinessSchema()` — address, geo, openingHours, phone, priceRange
   - `getBreadcrumbSchema(items)` — dynamic breadcrumb from page path
   - `getFAQSchema(faqs)` — converts FAQ arrays to schema format (extracts plain text from ReactNode answers)
   - `getJobPostingSchema(job)` — title, salary, location, employment type
   - `getServiceSchema(service)` — name, description, provider, areaServed
   - `getWebSiteSchema()` — for homepage
   - `getBlogPostingSchema(post)` — for individual blog posts

3. **Update `index.html`** — Remove the 3 static JSON-LD script blocks (Organization, JobPosting, FAQPage) since they'll now be dynamically managed per page.

4. **Add `<SchemaMarkup>` to each page component** (Index, OwnerOperators, CompanyDrivers, FleetProgram, FreightServices, About, Careers, Contact, Blog, BlogPost, OwnerOperatorState) with page-specific schema arrays.

### Key Business Data Used Across Schemas
- Company: XXII Century Inc / XXII Century Trucking
- Address: 7501 Lemont Rd Ste 200, Woodridge, IL 60517
- Phone: +1-773-572-5012 (recruiting), +1-224-240-6441 (customer service)
- Email: hr@goxxii.com
- Founded: 2009
- URL: https://goxxii.com
- Area served: United States
- Services: Owner Operator Program, Company Driver Employment, Fleet Partnership, Freight Shipping & Logistics

### Files Changed
- `src/components/SchemaMarkup.tsx` — new
- `src/data/schemaData.ts` — new
- `index.html` — remove static schemas
- `src/pages/Index.tsx` — add schemas
- `src/pages/OwnerOperators.tsx` — add schemas
- `src/pages/CompanyDrivers.tsx` — add schemas
- `src/pages/FleetProgram.tsx` — add schemas
- `src/pages/FreightServices.tsx` — add schemas
- `src/pages/About.tsx` — add schemas
- `src/pages/Careers.tsx` — add schemas
- `src/pages/Contact.tsx` — add schemas
- `src/pages/Blog.tsx` — add schemas
- `src/pages/BlogPost.tsx` — add schemas
- `src/pages/OwnerOperatorState.tsx` — add schemas

