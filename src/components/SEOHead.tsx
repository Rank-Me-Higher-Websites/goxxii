import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
}

export const SEOHead = ({ title, description, canonicalPath, keywords }: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    
    // Update meta keywords if provided
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords);
      }
    }
    
    // Update canonical URL if provided
    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `https://goxxii.com${canonicalPath}`);
    }
    
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    
    if (ogTitle) ogTitle.setAttribute("content", title);
    if (ogDescription) ogDescription.setAttribute("content", description);
    if (ogUrl && canonicalPath) ogUrl.setAttribute("content", `https://goxxii.com${canonicalPath}`);
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    if (twitterTitle) twitterTitle.setAttribute("content", title);
    if (twitterDescription) twitterDescription.setAttribute("content", description);
    
  }, [title, description, canonicalPath, keywords]);

  return null;
};

// SEO content for all pages - unique meta titles/descriptions per page
export const SEO_CONTENT = {
  home: {
    title: "XXII Century Trucking | Chicago CDL-A Jobs & Freight | goxxii.com",
    description: "XXII Century Trucking — Chicago's driver-first CDL-A carrier. Owner operators keep 80% of gross, company drivers earn 68 + 2 CPM. Fortune 500 freight, weekly pay, no forced dispatch. Apply at goxxii.com.",
    keywords: "xxii century trucking, xxii century inc, century trucking, century transport, xxii century inc reviews, owner operator jobs Chicago, CDL-A driver jobs Illinois, trucking company Chicago, company driver positions, dry van trucking, OTR truck driving jobs, Fortune 500 freight, truck driving jobs near me, best trucking company Illinois, Woodridge IL trucking, hiring now, goxxii.com",
  },
  ownerOperators: {
    title: "Owner Operator Truck Driver Jobs — Earn 80% Linehaul | XXII Century",
    description: "Owner operator trucking jobs paying 80% linehaul revenue. No forced dispatch, fuel discounts, Fortune 500 loads, weekly settlements. CDL-A contractors apply.",
    keywords: "owner operator trucking jobs, 80% linehaul pay, independent truck driver, no forced dispatch, OTR owner operator, dry van owner operator, owner operator pay per mile, best owner operator trucking company 2025, independent trucker jobs, 1099 truck driver, owner operator dry van loads",
  },
  companyDrivers: {
    title: "CDL-A Company Driver Jobs — 68 + 2 CPM + Full Benefits | XXII Century",
    description: "Company driver positions starting at 68 + 2 CPM. Medical, dental, 401(k), paid vacation. Late-model trucks. Apply online in 5 minutes.",
    keywords: "company driver jobs, CDL-A driver positions, trucking jobs with benefits, OTR company driver, truck driver 401k, CDL-A truck driver salary, company driver pay per mile, truck driver benefits package, OTR driver jobs 2025, truck driving career",
  },
  fleetProgram: {
    title: "Fleet Owner & Power Only Trucking Program | XXII Century",
    description: "Fleet owners & small carriers: access Fortune 500 freight with our Power Only program. Trailer provided, 24/7 dispatch, fast pay. Partner with us today.",
    keywords: "fleet owner partnership, power only trucking, carrier partnership program, fleet management, truck fleet opportunities, power only loads, fleet owner trucking program, small carrier partnership, trailer interchange program, trucking business opportunity",
  },
  freightServices: {
    title: "Dry Van Freight Shipping — 97% On-Time Delivery | XXII Century",
    description: "Nationwide FTL dry van shipping with 97% on-time rate. Real-time GPS tracking, dedicated account management. Shippers & brokers get a free quote.",
    keywords: "freight shipping company, dry van logistics, FTL freight services, truckload shipping, supply chain solutions, FTL shipping rates, dry van carrier, truckload freight quote, reliable trucking company, freight broker carrier, nationwide freight shipping",
  },
  about: {
    title: "About XXII Century — Chicago Trucking Company Since 2009",
    description: "500+ drivers strong. Fortune 500 partnerships. Based in Woodridge, IL. Discover why drivers and shippers choose XXII Century. Join our team today.",
    keywords: "XXII Century trucking, Chicago trucking carrier, driver-first company, Woodridge IL logistics, Midwest trucking provider, XXII Century reviews, trucking company Woodridge IL, driver-first carrier, Chicago logistics company, XXII Century careers",
  },
  careers: {
    title: "Trucking Jobs — CDL Drivers & Dispatchers Hiring | XXII Century",
    description: "Browse open CDL-A driver, owner operator & dispatcher positions. Competitive pay up to $300K, full benefits, career growth. Apply online — quick application.",
    keywords: "trucking job openings, CDL driver employment, dispatcher positions, logistics careers, transportation jobs, trucking job application, dispatcher job trucking, transportation career opportunities, truck driver hiring 2025",
  },
  contact: {
    title: "Contact XXII Century — Call 630-948-0501 | Woodridge, IL",
    description: "Call 630-948-0501 or visit 7501 Lemont Rd, Woodridge IL. Driver applications, freight quotes, fleet partnerships. Our team responds within 24 hours.",
    keywords: "trucking company contact, driver recruiting, freight quote request, Woodridge IL trucking, XXII Century phone number, XXII Century address, trucking company near me, driver recruiter contact, freight quote phone number",
  },
  blog: {
    title: "Trucking Industry Blog — Tips & Guides | XXII Century",
    description: "Owner operator tips, CDL career guides, freight market insights & trucking industry news. Expert advice from XXII Century professionals.",
    keywords: "trucking industry blog, driver career advice, owner operator tips, CDL guides, freight market news, trucking tips 2025, owner operator advice, CDL driver guides, freight industry trends, trucking career tips",
  },
  privacy: {
    title: "Privacy Policy | XXII Century Trucking",
    description: "XXII Century privacy policy. How we collect, use & protect personal data for driver applicants, website visitors & business partners.",
    keywords: "XXII Century privacy policy, trucking company privacy, driver data protection, personal information policy",
  },
  terms: {
    title: "Terms & Conditions | XXII Century Trucking",
    description: "Terms of use for goxxii.com. Review our policies on driver applications, intellectual property, data use & website access.",
    keywords: "XXII Century terms, trucking website terms, terms and conditions, website usage policy",
  },
  reviews: {
    title: "XXII Century Inc Reviews | Driver-Verified Pay & Dispatch",
    description: "Real XXII Century Trucking reviews from owner operators and company drivers. 4.8/5 rating across 127+ reviews covering pay, dispatch, fuel discounts & Fortune 500 freight quality. See what Chicago CDL-A drivers say.",
    keywords: "xxii century inc reviews, xxii century trucking reviews, xxii century reviews, century trucking reviews, century transport reviews, goxxii reviews, xxii century driver reviews, xxii century owner operator reviews, xxii century inc complaints, is xxii century a good company to drive for",
  },
};

// Internal linking map - use varied anchor text
export const INTERNAL_LINKS = {
  home: [
    { text: "owner operator jobs", href: "/owner-operators" },
    { text: "company driver positions", href: "/company-drivers" },
    { text: "fleet partnership program", href: "/fleet-program" },
    { text: "freight shipping solutions", href: "/freight-shipping-services" },
    { text: "trucking careers", href: "/careers" },
  ],
  ownerOperators: [
    { text: "CDL-A driving jobs", href: "/careers" },
    { text: "partner your fleet", href: "/fleet-program" },
    { text: "learn about XXII Century", href: "/about" },
    { text: "read driver success stories", href: "/blog" },
    { text: "contact our team", href: "/contact" },
  ],
  companyDrivers: [
    { text: "owner operator opportunities", href: "/owner-operators" },
    { text: "available trucking positions", href: "/careers" },
    { text: "about our company", href: "/about" },
    { text: "industry insights", href: "/blog" },
    { text: "get in touch", href: "/contact" },
  ],
  fleetProgram: [
    { text: "independent driver jobs", href: "/owner-operators" },
    { text: "company driver careers", href: "/company-drivers" },
    { text: "our freight services", href: "/freight-shipping-services" },
    { text: "why drivers choose us", href: "/about" },
    { text: "reach out today", href: "/contact" },
  ],
  freightServices: [
    { text: "become a carrier partner", href: "/fleet-program" },
    { text: "drive for XXII Century", href: "/careers" },
    { text: "owner operator program", href: "/owner-operators" },
    { text: "our company story", href: "/about" },
    { text: "request a freight quote", href: "/contact" },
  ],
  about: [
    { text: "owner operator positions", href: "/owner-operators" },
    { text: "company driver jobs", href: "/company-drivers" },
    { text: "read XXII Century Inc reviews", href: "/about/reviews" },
    { text: "fleet partnerships", href: "/fleet-program" },
    { text: "shipping services", href: "/freight-shipping-services" },
    { text: "view open positions", href: "/careers" },
  ],
  reviews: [
    { text: "about XXII Century Inc", href: "/about" },
    { text: "owner operator program", href: "/owner-operators" },
    { text: "company driver jobs", href: "/company-drivers" },
    { text: "current openings", href: "/careers" },
    { text: "contact recruiting", href: "/contact" },
  ],
  careers: [
    { text: "owner operator details", href: "/owner-operators" },
    { text: "company driver benefits", href: "/company-drivers" },
    { text: "fleet program info", href: "/fleet-program" },
    { text: "about our team", href: "/about" },
    { text: "contact HR", href: "/contact" },
  ],
  blog: [
    { text: "apply as owner operator", href: "/owner-operators" },
    { text: "company driver openings", href: "/company-drivers" },
    { text: "all job opportunities", href: "/careers" },
    { text: "freight services", href: "/freight-shipping-services" },
    { text: "contact us", href: "/contact" },
  ],
  contact: [
    { text: "owner operator jobs", href: "/owner-operators" },
    { text: "company driver positions", href: "/company-drivers" },
    { text: "join our fleet", href: "/fleet-program" },
    { text: "shipping solutions", href: "/freight-shipping-services" },
    { text: "browse careers", href: "/careers" },
  ],
};
