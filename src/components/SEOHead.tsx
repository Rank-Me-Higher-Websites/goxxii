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

// SEO content for all pages - ready to copy/paste
export const SEO_CONTENT = {
  home: {
    title: "XXII Century | Owner Operator Jobs Chicago - 90% Pay | Company Drivers 63 CPM",
    description: "Chicago trucking jobs with XXII Century. Owner operators earn 90% linehaul pay. Company drivers get 63 CPM + benefits. Fortune 500 freight, weekly settlements. Apply today!",
    keywords: "owner operator jobs Chicago, trucking company Chicago IL, CDL driver jobs, company driver positions, dry van trucking, OTR truck driver jobs",
  },
  ownerOperators: {
    title: "Owner Operator Truck Driving Jobs | 90% Pay | XXII Century Chicago",
    description: "Earn 90% of linehaul as an owner operator with XXII Century. Fortune 500 freight, AI fuel savings, no forced dispatch, weekly pay. Join 500+ drivers. Apply in 5 min.",
    keywords: "owner operator jobs near me, independent truck driver, 90% linehaul pay, OTR owner operator, dry van owner operator Chicago",
  },
  companyDrivers: {
    title: "Company Driver Jobs Chicago | 63 CPM + Benefits | XXII Century Trucking",
    description: "Company driver positions paying 63 CPM with full benefits. New equipment, consistent miles, home weekly options. No-touch freight. Apply for CDL-A driver jobs today.",
    keywords: "company driver jobs, CDL-A driver positions, truck driver benefits, OTR company driver, Chicago trucking careers",
  },
  fleetProgram: {
    title: "Fleet Owner Program | Partner Your Trucks with XXII Century",
    description: "Fleet owners: Partner with XXII Century for steady freight, competitive rates, and full dispatch support. Grow your fleet with Fortune 500 contracts. Contact us today.",
    keywords: "fleet owner program, trucking fleet partnership, owner operator fleet, truck fleet management, carrier partnership",
  },
  freightServices: {
    title: "Freight Shipping Services | Dry Van & Full Truckload | XXII Century",
    description: "Reliable freight shipping services for businesses. Dry van, FTL, expedited, and temperature-controlled transport. Real-time tracking. Get a free quote today.",
    keywords: "freight shipping services, dry van freight, full truckload shipping, FTL shipping, freight broker Chicago, logistics solutions",
  },
  about: {
    title: "About XXII Century Trucking | 15+ Years Serving Drivers Nationwide",
    description: "Learn about XXII Century - a Chicago-based trucking company built around drivers. 15+ years of experience, 500+ drivers, Fortune 500 freight partners. Our story.",
    keywords: "XXII Century trucking, trucking company history, Chicago trucking carrier, about our company, driver-focused carrier",
  },
  careers: {
    title: "Trucking Careers | Driver Jobs & Dispatcher Positions | XXII Century",
    description: "Explore trucking careers at XXII Century. Owner operator, company driver, and OTR dispatcher positions available. Competitive pay, great benefits. Apply now.",
    keywords: "trucking careers, CDL driver jobs, dispatcher jobs, trucking industry jobs, OTR careers Chicago",
  },
  contact: {
    title: "Contact XXII Century Trucking | Chicago IL | 224-240-6441",
    description: "Contact XXII Century for trucking jobs or freight services. Call 224-240-6441 or visit us at 7501 Lemont Rd, Woodridge IL. Quick response guaranteed.",
    keywords: "contact trucking company, XXII Century phone, trucking jobs contact, freight quote, Woodridge IL trucking",
  },
  blog: {
    title: "Trucking Industry News & CDL Driver Tips | XXII Century Blog",
    description: "Stay updated with trucking industry news, owner operator tips, CDL driver guides, and career advice. Expert insights from XXII Century trucking professionals.",
    keywords: "trucking blog, CDL driver tips, owner operator advice, trucking industry news, truck driver guides",
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
