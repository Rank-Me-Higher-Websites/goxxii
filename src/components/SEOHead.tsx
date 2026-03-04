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
    title: "Owner Operator & CDL-A Driver Jobs | XXII Century Trucking",
    description: "Hiring owner operators (90% linehaul) & company drivers (65+ CPM) in Chicago. Fortune 500 freight, weekly pay, full benefits. Apply today.",
    keywords: "owner operator jobs Chicago, CDL-A driver jobs, trucking company Illinois, company driver positions, dry van trucking, OTR truck driving jobs, Fortune 500 freight",
  },
  ownerOperators: {
    title: "Owner Operator Jobs — 90% Linehaul, No Forced Dispatch",
    description: "Earn 90% of every load with XXII Century. Fuel discounts, weekly settlements, Fortune 500 contracts. CDL-A owner operators apply now.",
    keywords: "owner operator trucking jobs, 90% linehaul pay, independent truck driver, no forced dispatch, OTR owner operator, dry van owner operator",
  },
  companyDrivers: {
    title: "Company Driver Jobs — 65 CPM, Health & 401(k) Benefits",
    description: "CDL-A company drivers start at 65 CPM with automatic raises. Full medical, dental, vision, 401(k), paid time off. Modern trucks, consistent miles.",
    keywords: "company driver jobs, CDL-A driver positions, trucking jobs with benefits, OTR company driver, truck driver 401k, company driver health insurance",
  },
  fleetProgram: {
    title: "Fleet Partnership & Power Only Program | XXII Century",
    description: "Grow your carrier business with premium Fortune 500 freight. Power Only trailers, 24/7 dispatch, competitive rates for fleet owners and small carriers.",
    keywords: "fleet owner partnership, power only trucking, carrier partnership program, fleet management, truck fleet opportunities, small carrier freight",
  },
  freightServices: {
    title: "Freight Shipping & Dry Van Logistics | XXII Century",
    description: "Reliable FTL and dry van freight shipping with 97% on-time delivery. Real-time tracking, dedicated account management. Get a free quote.",
    keywords: "freight shipping company, dry van logistics, FTL freight services, truckload shipping, supply chain solutions, freight quote Chicago",
  },
  about: {
    title: "About XXII Century — Chicago Carrier Since 2009",
    description: "Driver-first trucking company with 500+ drivers and Fortune 500 partnerships. Based in Woodridge, IL, serving shippers nationwide since 2009.",
    keywords: "XXII Century trucking, Chicago trucking carrier, driver-first company, Woodridge IL logistics, Midwest trucking provider, about XXII Century",
  },
  careers: {
    title: "Trucking Careers — Drivers & Dispatchers Hiring Now",
    description: "Open CDL-A driver and OTR dispatcher positions at XXII Century. Competitive pay, benefits, career growth. Browse jobs and apply online.",
    keywords: "trucking job openings, CDL driver employment, dispatcher positions, logistics careers, transportation jobs, trucking careers Chicago",
  },
  contact: {
    title: "Contact XXII Century | Call 630-948-0501 Today",
    description: "Reach our recruiting team at 630-948-0501 or visit 7501 Lemont Rd, Woodridge IL 60517. Quick response for driver applications and freight quotes.",
    keywords: "trucking company contact, driver recruiting, freight quote request, Woodridge IL trucking, XXII Century phone number, trucking company address",
  },
  blog: {
    title: "Trucking Blog — Driver Tips & Industry Insights",
    description: "Expert guides for owner operators and CDL drivers. Career advice, market trends, and trucking best practices from XXII Century professionals.",
    keywords: "trucking industry blog, driver career advice, owner operator tips, CDL guides, freight market news, trucking best practices",
  },
  privacy: {
    title: "Privacy Policy | XXII Century Trucking",
    description: "How XXII Century collects, uses, and protects your personal information. Read our full privacy policy for driver applicants and website visitors.",
    keywords: "XXII Century privacy policy, trucking company privacy, driver data protection, personal information policy",
  },
  terms: {
    title: "Terms and Conditions | XXII Century Trucking",
    description: "Review the terms and conditions for using the XXII Century website, including applicant information, intellectual property, and liability.",
    keywords: "XXII Century terms, trucking website terms, terms and conditions, website usage policy",
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
    { text: "fleet partnerships", href: "/fleet-program" },
    { text: "shipping services", href: "/freight-shipping-services" },
    { text: "view open positions", href: "/careers" },
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
