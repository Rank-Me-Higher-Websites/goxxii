// ── Single source of truth for per-route SEO meta ────────────────────
//
// Consumed in TWO places so JS-capable AND non-JS crawlers see identical meta:
//   1. src/components/SEOHead.tsx — runtime <head> updates (Google's JS render,
//      client navigation). Exposes SEO_CONTENT derived from this map.
//   2. server/metaInjection.ts — rewrites the static index.html per request so
//      social link-preview bots (iMessage, Slack, Facebook, LinkedIn, X) and
//      first-wave Googlebot get correct, page-specific tags WITHOUT running JS.
//
// Keep this module dependency-free (no React, no asset imports) so the Node
// server can import it directly via tsx.
//
// Copy rules (canonical business facts):
//   - Company drivers: "$2,300+/week" starting pay (NO "CPM" language).
//   - Owner operators: keep "80% of gross", "$8,000+/week" average.
//   - Phone 630-914-6037, 7501 Lemont Rd, Woodridge IL 60517, founded 2009 (17+ yrs).
//   - Titles ≤ 60 chars (SERP). Descriptions 140–160 chars. og* may run longer.

export interface RouteMeta {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  canonicalPath: string;
}

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "XXII Century Trucking | Chicago CDL-A Jobs | goxxii.com",
    description:
      "Chicago's driver-first CDL-A carrier. Owner operators keep 80% of gross ($8,000+/week); company drivers earn $2,300+/week. Fortune 500 freight, weekly pay.",
    keywords:
      "xxii century trucking, xxii century inc, century trucking, xxii century inc reviews, owner operator jobs Chicago, CDL-A driver jobs Illinois, trucking company Woodridge IL, company driver jobs $2300 week, owner operator 80% gross, Fortune 500 freight, no hidden fees trucking, dry van owner operator, weekly pay trucking, 4.8 star reviews, goxxii.com",
    ogTitle: "XXII Century Trucking | Chicago CDL-A Jobs | goxxii.com",
    ogDescription:
      "Owner operators keep 80% of gross ($8,000+/week). Company drivers start at $2,300+/week with full benefits. $0 hidden fees, Fortune 500 freight. Apply today.",
    ogType: "website",
    canonicalPath: "/",
  },
  "/owner-operators": {
    title: "Owner Operator Truck Driver Jobs - Keep 80% of Gross | XXII",
    description:
      "Owner operator trucking jobs paying 80% of gross — $8,000+/week average. No forced dispatch, fuel discounts, Fortune 500 loads, weekly settlements. CDL-A apply.",
    keywords:
      "owner operator trucking jobs, owner operator 80% of gross, independent truck driver, no forced dispatch, OTR owner operator, dry van owner operator, owner operator pay, best owner operator trucking company 2026, independent trucker jobs, 1099 truck driver, owner operator dry van loads",
    ogTitle: "Owner Operator Jobs - Keep 80% of Gross, $8,000+/Week | XXII Century",
    ogDescription:
      "Keep 80% of gross with $0 hidden trailer, ELD, or dispatch fees. $8,000+/week average, biggest fuel discount guaranteed, Fortune 500 freight. CDL-A apply.",
    ogType: "website",
    canonicalPath: "/owner-operators",
  },
  "/company-drivers": {
    title: "CDL-A Company Driver Jobs - $2,300+/Week + Benefits | XXII",
    description:
      "Company driver jobs starting at $2,300+/week. Full benefits: medical, dental, 401(k), paid vacation. Modern Volvo & Freightliner trucks, no-touch freight.",
    keywords:
      "company driver jobs, CDL-A driver positions, trucking jobs with benefits, OTR company driver, company driver $2300 week, truck driver 401k, CDL-A truck driver salary, truck driver benefits package, OTR driver jobs 2026, truck driving career",
    ogTitle: "CDL-A Company Driver Jobs - $2,300+/Week + Benefits | XXII Century",
    ogDescription:
      "Start at $2,300+/week ($104K–$120K/yr) with full benefits and automatic raises every 75,000 miles. Modern trucks, weekly pay, Fortune 500 freight. Apply now.",
    ogType: "website",
    canonicalPath: "/company-drivers",
  },
  "/fleet-program": {
    title: "Fleet Owner & Power Only Trucking Program | XXII Century",
    description:
      "Fleet owners & small carriers: haul Fortune 500 freight on our Power Only program. Trailer provided, 24/7 dispatch, weekly pay. Partner with XXII Century today.",
    keywords:
      "fleet owner partnership, power only trucking, carrier partnership program, fleet management, truck fleet opportunities, power only loads, fleet owner trucking program, small carrier partnership, trailer interchange program, trucking business opportunity",
    ogTitle: "Fleet Owner & Power Only Program | XXII Century Trucking",
    ogDescription:
      "Run your tractor on our dry-van Power Only program. Fortune 500 loads, trailer access, 24/7 dispatch, drop & hook freight. Fleet owners average $300K+. Apply.",
    ogType: "website",
    canonicalPath: "/fleet-program",
  },
  "/freight-shipping-services": {
    title: "Dry Van Freight Shipping - 97% On-Time | XXII Century",
    description:
      "Nationwide FTL dry van shipping with a 97% on-time rate. Real-time GPS tracking and dedicated account management. Shippers & brokers, get a free quote today.",
    keywords:
      "freight shipping company, dry van logistics, FTL freight services, truckload shipping, supply chain solutions, FTL shipping rates, dry van carrier, truckload freight quote, reliable trucking company, freight broker carrier, nationwide freight shipping",
    ogTitle: "Dry Van Freight Shipping - 97% On-Time Delivery | XXII Century",
    ogDescription:
      "Asset-based FTL dry van capacity across 48 states with a 97% on-time rate, GPS tracking, and dedicated account management. Shippers & brokers get a free quote.",
    ogType: "website",
    canonicalPath: "/freight-shipping-services",
  },
  "/about": {
    title: "About XXII Century - Chicago Trucking Company Since 2009",
    description:
      "XXII Century Trucking: 17+ years, 100+ drivers, Fortune 500 partnerships. Based in Woodridge, IL. See why CDL-A drivers and shippers choose us. Join our team.",
    keywords:
      "XXII Century trucking, Chicago trucking carrier, driver-first company, Woodridge IL logistics, Midwest trucking provider, XXII Century reviews, trucking company Woodridge IL, driver-first carrier, Chicago logistics company, XXII Century careers",
    ogTitle: "About XXII Century - Chicago Trucking Company Since 2009",
    ogDescription:
      "Founded 2009 in Woodridge, IL. 100+ drivers, Fortune 500 freight, AI tools, 4.8/5 across 127+ reviews. Discover the driver-first XXII Century difference.",
    ogType: "website",
    canonicalPath: "/about",
  },
  "/about/reviews": {
    title: "XXII Century Inc Reviews | Driver-Verified Pay & Dispatch",
    description:
      "Real XXII Century reviews from CDL-A drivers. 4.8/5 across 127+ verified reviews on pay, dispatch, fuel discounts & Fortune 500 freight. See what drivers say.",
    keywords:
      "xxii century inc reviews, xxii century trucking reviews, xxii century reviews, century trucking reviews, goxxii reviews, xxii century driver reviews, xxii century owner operator reviews, xxii century inc complaints, is xxii century a good company to drive for",
    ogTitle: "XXII Century Inc Reviews | 4.8/5 From 127+ Drivers",
    ogDescription:
      "Driver-verified XXII Century Trucking reviews — 4.8/5 across 127+ reviews covering 80% owner-operator settlements, no forced dispatch, fuel discounts & freight.",
    ogType: "website",
    canonicalPath: "/about/reviews",
  },
  "/careers": {
    title: "Trucking Jobs - CDL-A Drivers & Owner Operators | XXII",
    description:
      "Browse open CDL-A driver and owner operator positions. Competitive pay to $300K+, full benefits, career growth. Start your application with XXII Century today.",
    keywords:
      "trucking job openings, CDL driver employment, owner operator positions, logistics careers, transportation jobs, trucking job application, CDL-A driver hiring, transportation career opportunities, truck driver hiring 2026",
    ogTitle: "Trucking Jobs - CDL-A Drivers & Owner Operators | XXII Century",
    ogDescription:
      "Hiring CDL-A company drivers ($2,300+/week) and owner operators (80% of gross, $300K+/yr). Full benefits, Fortune 500 freight, weekly pay. Apply in minutes.",
    ogType: "website",
    canonicalPath: "/careers",
  },
  "/contact": {
    title: "Contact XXII Century - Call 630-914-6037 | Woodridge IL",
    description:
      "Call 630-914-6037 or visit 7501 Lemont Rd, Woodridge, IL. Driver applications, freight quotes, fleet partnerships — our team responds within 1 hour.",
    keywords:
      "trucking company contact, driver recruiting, freight quote request, Woodridge IL trucking, XXII Century phone number, XXII Century address, trucking company near me, driver recruiter contact, freight quote phone number",
    ogTitle: "Contact XXII Century - Call 630-914-6037 | Woodridge, IL",
    ogDescription:
      "Reach XXII Century recruiting at 630-914-6037 or visit 7501 Lemont Rd, Woodridge, IL 60517. Driver applications, freight quotes & fleet partnerships.",
    ogType: "website",
    canonicalPath: "/contact",
  },
  "/blog": {
    title: "Trucking Industry Blog - Tips & Guides | XXII Century",
    description:
      "Owner operator tips, CDL driver guides, freight market insights & industry news. Expert advice from XXII Century pros with 17+ years on the road.",
    keywords:
      "trucking industry blog, driver career advice, owner operator tips, CDL guides, freight market news, trucking tips 2026, owner operator advice, CDL driver guides, freight industry trends, trucking career tips",
    ogTitle: "Trucking Industry Blog - Tips & Guides | XXII Century",
    ogDescription:
      "Owner operator tips, CDL career guides, and freight market insights from XXII Century — a Chicago carrier with 17+ years hauling Fortune 500 freight.",
    ogType: "website",
    canonicalPath: "/blog",
  },
  "/privacy": {
    title: "Privacy Policy | XXII Century Trucking",
    description:
      "XXII Century privacy policy: how we collect, use, and protect personal data for driver applicants, website visitors, and business partners at goxxii.com.",
    keywords:
      "XXII Century privacy policy, trucking company privacy, driver data protection, personal information policy",
    ogTitle: "Privacy Policy | XXII Century Trucking",
    ogDescription:
      "How XXII Century Trucking collects, uses, and protects personal data for driver applicants, website visitors, and business partners at goxxii.com.",
    ogType: "website",
    canonicalPath: "/privacy",
  },
  "/terms": {
    title: "Terms & Conditions | XXII Century Trucking",
    description:
      "Terms of use for goxxii.com. Review XXII Century's policies on driver applications, intellectual property, data use, and website access before you apply.",
    keywords:
      "XXII Century terms, trucking website terms, terms and conditions, website usage policy",
    ogTitle: "Terms & Conditions | XXII Century Trucking",
    ogDescription:
      "Terms of use for goxxii.com — XXII Century Trucking policies on driver applications, intellectual property, data use, and website access.",
    ogType: "website",
    canonicalPath: "/terms",
  },
};

const HOME_META = ROUTE_META["/"];

/**
 * Resolve the best meta for a request path. Known static routes get their exact
 * entry; everything else (dynamic /blog/:slug, /owner-operators/:state,
 * /careers/:slug, and unknown paths) falls back to the homepage meta — which is
 * accurate and on-brand. Dynamic pages still receive their own per-page meta via
 * SEOHead when the client/Googlebot renders JS.
 */
export function resolveRouteMeta(path: string): RouteMeta {
  if (!path) return HOME_META;
  // Strip query/hash and a trailing slash (except root).
  let clean = path.split("?")[0].split("#")[0];
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  return ROUTE_META[clean] || HOME_META;
}
