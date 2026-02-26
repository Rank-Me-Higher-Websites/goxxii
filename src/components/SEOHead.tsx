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
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", `https://goxxii.com${canonicalPath}`);
      }
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
    title: "XXII Century | Owner Operator & Company Driver Jobs Chicago | 90% Pay",
    description: "Join XXII Century trucking in Chicago. Owner operators earn 90% linehaul, company drivers get 63 CPM + benefits. Fortune 500 freight, weekly pay, 24/7 support. Apply now!",
    keywords: "owner operator jobs Chicago, trucking company Illinois, CDL-A driver jobs, company driver positions, dry van trucking, OTR truck driving jobs",
  },
  ownerOperators: {
    title: "Owner Operator Trucking Jobs | 90% Linehaul Revenue | Apply Today",
    description: "High-paying owner operator positions with 90% revenue share. No forced dispatch, AI fuel discounts, Fortune 500 contracts. Chicago-based carrier hiring nationwide.",
    keywords: "independent truck driver jobs, owner operator trucking, 90% linehaul pay, OTR owner operator positions, dry van trucking Chicago",
  },
  companyDrivers: {
    title: "CDL-A Company Driver Positions | 63 CPM + Full Benefits | XXII Century",
    description: "Company truck driver jobs paying 63 CPM with health insurance, 401k, paid vacation. Modern equipment, consistent miles, home weekly options. Start your driving career today.",
    keywords: "company truck driver jobs, CDL-A positions, trucking careers with benefits, OTR company driver, professional driver employment",
  },
  fleetProgram: {
    title: "Fleet Partnership Program | Grow Your Trucking Business | XXII Century",
    description: "Partner your trucks with XXII Century for premium freight access. Fleet owners receive steady loads, competitive rates, full dispatch support. Scale your carrier operation.",
    keywords: "fleet owner partnership, trucking business growth, carrier partnership program, fleet management services, truck fleet opportunities",
  },
  freightServices: {
    title: "Freight Shipping & Logistics Services | Dry Van & FTL | XXII Century",
    description: "Professional freight shipping solutions with real-time tracking. Dry van, full truckload, expedited shipping. 97% on-time delivery. Request your logistics quote today.",
    keywords: "freight shipping company, dry van logistics, FTL freight services, Chicago freight broker, supply chain solutions, truckload shipping",
  },
  about: {
    title: "About XXII Century | Chicago Trucking Company | 15+ Years Experience",
    description: "Discover XXII Century - a driver-focused trucking company serving the industry since 2009. 500+ drivers, Fortune 500 partnerships, transparent operations. Learn our story.",
    keywords: "XXII Century history, Chicago trucking carrier, driver-first company, trucking company values, Midwest logistics provider",
  },
  careers: {
    title: "Trucking Jobs & Careers | CDL Drivers & Dispatchers | XXII Century",
    description: "Now hiring CDL-A drivers and OTR dispatchers. Owner operator, company driver, and fleet positions available. Competitive pay, excellent benefits, career growth. Apply online.",
    keywords: "trucking job openings, CDL driver employment, dispatcher positions, logistics careers, transportation industry jobs",
  },
  contact: {
    title: "Contact XXII Century | Woodridge IL Trucking Company | 773-572-5012",
    description: "Reach XXII Century recruiting at 773-572-5012 or visit 7501 Lemont Rd, Woodridge IL. Quick response for driver applications and freight inquiries. We're here to help.",
    keywords: "trucking company contact, driver recruiting phone, freight quote request, Woodridge IL logistics, XXII Century address",
  },
  blog: {
    title: "Trucking Blog | Industry News, Driver Tips & Career Guides | XXII Century",
    description: "Expert trucking insights for professional drivers. Owner operator guides, CDL career tips, industry trends, and market updates from XXII Century logistics professionals.",
    keywords: "trucking industry blog, driver career advice, owner operator tips, CDL guides, freight market news, trucking best practices",
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
