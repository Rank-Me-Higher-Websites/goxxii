import { useEffect } from "react";
import { ROUTE_META } from "@/data/routeMetaMap";

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
    
    // Prefer the richer social copy from the route map (falls back to title/description)
    const routeMeta = canonicalPath ? ROUTE_META[canonicalPath] : undefined;
    const socialTitle = routeMeta?.ogTitle || title;
    const socialDescription = routeMeta?.ogDescription || description;

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogType = document.querySelector('meta[property="og:type"]');

    if (ogTitle) ogTitle.setAttribute("content", socialTitle);
    if (ogDescription) ogDescription.setAttribute("content", socialDescription);
    if (ogUrl && canonicalPath) ogUrl.setAttribute("content", `https://goxxii.com${canonicalPath}`);
    if (ogType && routeMeta?.ogType) ogType.setAttribute("content", routeMeta.ogType);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');

    if (twitterTitle) twitterTitle.setAttribute("content", socialTitle);
    if (twitterDescription) twitterDescription.setAttribute("content", socialDescription);
    if (twitterUrl && canonicalPath) twitterUrl.setAttribute("content", `https://goxxii.com${canonicalPath}`);
    
  }, [title, description, canonicalPath, keywords]);

  return null;
};

// SEO content for all pages — derived from the single source of truth in
// src/data/routeMetaMap.ts so client runtime meta and server-injected meta
// (for non-JS crawlers) never drift apart.
export const SEO_CONTENT = {
  home: ROUTE_META["/"],
  ownerOperators: ROUTE_META["/owner-operators"],
  companyDrivers: ROUTE_META["/company-drivers"],
  fleetProgram: ROUTE_META["/fleet-program"],
  freightServices: ROUTE_META["/freight-shipping-services"],
  about: ROUTE_META["/about"],
  careers: ROUTE_META["/careers"],
  contact: ROUTE_META["/contact"],
  blog: ROUTE_META["/blog"],
  privacy: ROUTE_META["/privacy"],
  terms: ROUTE_META["/terms"],
  reviews: ROUTE_META["/about/reviews"],
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
