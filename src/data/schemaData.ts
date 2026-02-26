// ── Shared company data ──────────────────────────────────────────────
const COMPANY = {
  name: "XXII Century Inc",
  alternateName: "XXII Century Trucking",
  url: "https://goxxii.com",
  logo: "https://goxxii.com/wp-content/uploads/2025/01/cropped-XXII-Century-Logo.png",
  foundingDate: "2009",
  phone: "+1-773-572-5012",
  customerServicePhone: "+1-224-240-6441",
  email: "hr@goxxii.com",
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "7501 Lemont Rd Ste 200",
    addressLocality: "Woodridge",
    addressRegion: "IL",
    postalCode: "60517",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: 41.7505,
    longitude: -88.0150,
  },
  sameAs: [
    "https://www.facebook.com/xxiicen/",
    "https://www.instagram.com/xxii.trucking",
    "https://www.linkedin.com/company/xxii-century-inc/",
  ],
};

// ── Organization ─────────────────────────────────────────────────────
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  alternateName: COMPANY.alternateName,
  url: COMPANY.url,
  logo: COMPANY.logo,
  foundingDate: COMPANY.foundingDate,
  description:
    "Premier trucking carrier offering owner operators competitive linehaul pay and company drivers top CPM rates. Fortune 500 freight partners, AI-powered tools, nationwide coverage.",
  address: COMPANY.address,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: COMPANY.phone,
      contactType: "recruiting",
      email: COMPANY.email,
      availableLanguage: ["English", "Spanish", "Russian"],
    },
    {
      "@type": "ContactPoint",
      telephone: COMPANY.customerServicePhone,
      contactType: "customer service",
      availableLanguage: ["English", "Spanish", "Russian"],
    },
  ],
  sameAs: COMPANY.sameAs,
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 200,
  },
});

// ── LocalBusiness ────────────────────────────────────────────────────
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${COMPANY.url}/#localbusiness`,
  name: COMPANY.name,
  alternateName: COMPANY.alternateName,
  url: COMPANY.url,
  logo: COMPANY.logo,
  image: COMPANY.logo,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  address: COMPANY.address,
  geo: COMPANY.geo,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  description:
    "Chicago-area trucking company offering owner operator jobs, company driver positions, fleet partnerships, and freight shipping services nationwide.",
  sameAs: COMPANY.sameAs,
  areaServed: "United States",
});

// ── WebSite (homepage only) ──────────────────────────────────────────
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: COMPANY.alternateName,
  url: COMPANY.url,
  description:
    "XXII Century Trucking — owner operator jobs, company driver positions, fleet programs, and freight shipping services.",
  publisher: {
    "@type": "Organization",
    name: COMPANY.name,
    logo: COMPANY.logo,
  },
});

// ── Breadcrumb ───────────────────────────────────────────────────────
export const getBreadcrumbSchema = (
  items: { name: string; path: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${COMPANY.url}${item.path}`,
  })),
});

// ── FAQ ──────────────────────────────────────────────────────────────
export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// ── JobPosting ───────────────────────────────────────────────────────
interface JobPostingInput {
  title: string;
  description: string;
  employmentType: string;
  minSalary: number;
  maxSalary: number;
  qualifications?: string;
  datePosted?: string;
  validThrough?: string;
  locationState?: string;
  locationCity?: string;
}

export const getJobPostingSchema = (job: JobPostingInput) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description,
  datePosted: job.datePosted || "2025-01-01",
  validThrough: job.validThrough || "2026-12-31",
  employmentType: job.employmentType,
  hiringOrganization: {
    "@type": "Organization",
    name: COMPANY.name,
    sameAs: COMPANY.url,
    logo: COMPANY.logo,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.locationCity || "Woodridge",
      addressRegion: job.locationState || "IL",
      addressCountry: "US",
    },
  },
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: {
      "@type": "QuantitativeValue",
      minValue: job.minSalary,
      maxValue: job.maxSalary,
      unitText: "YEAR",
    },
  },
  qualifications:
    job.qualifications ||
    "Valid CDL-A license, clean driving record, 2+ years experience",
});

// ── Service ──────────────────────────────────────────────────────────
interface ServiceInput {
  name: string;
  description: string;
  url?: string;
  areaServed?: string;
}

export const getServiceSchema = (service: ServiceInput) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  url: service.url ? `${COMPANY.url}${service.url}` : COMPANY.url,
  provider: {
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
  },
  areaServed: service.areaServed || "United States",
  serviceType: "Trucking & Freight Transportation",
});

// ── BlogPosting ──────────────────────────────────────────────────────
interface BlogPostInput {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

export const getBlogPostingSchema = (post: BlogPostInput) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  dateModified: post.date,
  author: {
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
  },
  publisher: {
    "@type": "Organization",
    name: COMPANY.name,
    logo: {
      "@type": "ImageObject",
      url: COMPANY.logo,
    },
  },
  image: post.image,
  url: `${COMPANY.url}/blog/${post.slug}`,
  mainEntityOfPage: `${COMPANY.url}/blog/${post.slug}`,
});

// ── ContactPage ──────────────────────────────────────────────────────
export const getContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact XXII Century Trucking",
  description:
    "Get in touch with XXII Century for owner operator jobs, company driver positions, fleet partnerships, or freight shipping inquiries.",
  url: `${COMPANY.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: COMPANY.name,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: COMPANY.address,
  },
});

// ── Blog/CollectionPage ──────────────────────────────────────────────
export const getBlogCollectionSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "XXII Century Trucking Blog",
  description:
    "Industry news, owner operator tips, CDL driver career guides, and trucking insights from XXII Century.",
  url: `${COMPANY.url}/blog`,
  publisher: {
    "@type": "Organization",
    name: COMPANY.name,
    logo: COMPANY.logo,
  },
});

// ── Pre-built FAQ text arrays (plain text versions for schema) ───────
export const homeFaqsPlain = [
  { question: "What types of trucking jobs does XXII Century offer?", answer: "We offer both owner operator and company driver CDL-A positions. Routes include local, regional, and OTR lanes across the U.S. and Canada, hauling for Fortune 500 shippers." },
  { question: "Where is XXII Century based?", answer: "Our headquarters are in Chicago, Illinois. We operate freight lanes nationwide and into Canada." },
  { question: "How do I apply to drive with XXII Century?", answer: "Apply online through our driver application at intelliapp.driverapponline.com. Our recruiting team typically responds within 24 hours." },
  { question: "Does XXII Century offer freight shipping services?", answer: "Yes. We provide dry van, refrigerated, and flatbed freight services for shippers and brokers. Our network covers the continental U.S. and Canada with dedicated and spot capacity." },
  { question: "How long has XXII Century been in business?", answer: "XXII Century has been in the trucking industry for over 16 years, building a reputation for reliability, safety, and transparent partnerships." },
];

export const ownerOperatorFaqsPlain = [
  { question: "What percentage do owner operators keep at XXII Century?", answer: "Owner operators receive competitive linehaul rates with transparent settlements and zero hidden fees. There are no forced dispatch fees or trailer rental surprises." },
  { question: "Do I need my own trailer to be an owner operator?", answer: "No. XXII Century offers a large trailer network including dry vans, reefers, and flatbeds. You can use our trailers or bring your own." },
  { question: "What fuel discounts are available for owner operators?", answer: "We provide large fleet volume fuel discounts at major truck stops nationwide. Our AI-powered fuel management tool helps you find the cheapest fuel on your route." },
  { question: "Can I choose my own routes as an owner operator?", answer: "Yes. We offer flexible scheduling with both dedicated lanes and open-board freight. Whether you prefer local Chicago-area runs or long-haul OTR, we match loads to your preferences." },
  { question: "Is there a referral bonus for owner operators?", answer: "Yes — we offer an unlimited referral bonus program. Refer qualified drivers and earn $1,000 per referral with no cap." },
];

export const companyDriverFaqsPlain = [
  { question: "What is the starting pay for company drivers?", answer: "Company drivers start at 63 CPM with automatic raises every 75,000 miles. Performance bonuses are available on top of base pay." },
  { question: "What benefits do company drivers receive?", answer: "Full benefits include health, dental, and vision insurance, 401(k) with company match, paid vacation and holidays, and safety and inspection bonuses." },
  { question: "What kind of trucks do company drivers operate?", answer: "We invest in late-model, well-maintained equipment. Company drivers operate modern trucks with the latest safety features and comfort amenities." },
  { question: "How much home time do company drivers get?", answer: "Home time depends on your route preference. Local drivers are home daily, regional drivers weekly, and OTR drivers every 2–3 weeks." },
  { question: "Do I need experience to drive for XXII Century?", answer: "We require a valid CDL-A license and generally prefer drivers with at least 6 months of verifiable OTR experience. Recent CDL graduates may be considered." },
];

export const fleetProgramFaqsPlain = [
  { question: "What is the XXII Century Power Only program?", answer: "Our Power Only program lets owner operators use their own tractor with our trailers to haul freight for Fortune 500 companies. We provide the loads, trailer access, and 24/7 dispatch support." },
  { question: "What are the requirements to join the fleet program?", answer: "Requirements include Motor Carrier Authority, DOT Number, Auto Liability Insurance, Cargo Liability Insurance, and Non-Owned Trailer Interchange Insurance." },
  { question: "What types of trailers are available in the fleet program?", answer: "Our trailer network includes dry vans, reefers, and flatbeds. This diversity ensures you can haul a wide range of freight and stay loaded consistently." },
  { question: "What is the average income for fleet program drivers?", answer: "Owner operators in our fleet program average $100,000+ annually. Earnings depend on miles driven, freight type, and route preferences." },
  { question: "Does the fleet program operate in Canada?", answer: "Yes. We have freight lanes across the continental U.S. and Canada, partnering with major corporations and government agencies on both sides of the border." },
];

export const careersFaqsPlain = [
  { question: "What trucking career paths are available at XXII Century?", answer: "We offer multiple career paths: Owner operator — run your own business with our freight and support; Company driver — full employment with benefits and steady pay; Fleet program — Power Only opportunities with trailer access." },
  { question: "Does XXII Century hire drivers in the Chicago area?", answer: "Yes. Our headquarters are in Chicago, IL and many of our dedicated lanes originate from the Chicagoland area. We have local, regional, and OTR positions based out of Chicago." },
  { question: "What is the hiring process like?", answer: "Our process is straightforward: Submit your online application, phone screening with our recruiting team, background and MVR verification, orientation and dispatch — many drivers start within days." },
  { question: "Are there bonuses for safe driving?", answer: "Yes. We offer safety and inspection bonuses that reward clean CSA scores and DOT inspections. These are available to both owner operators and company drivers." },
  { question: "Can I drive for XXII Century if I live outside Illinois?", answer: "Absolutely. We have drivers across the country. While our base is in Chicago, our freight network spans the entire U.S. and Canada." },
];

export const contactFaqsPlain = [
  { question: "What is the best way to reach XXII Century recruiting?", answer: "Call us at 773-572-5012 or email hr@goxxii.com. You can also apply directly through our online application." },
  { question: "What are XXII Century's office hours?", answer: "Our dispatch operates 24/7. The recruiting and administrative office is available during standard business hours, Monday through Friday." },
  { question: "Where is XXII Century located?", answer: "Our main office is in Chicago, Illinois. We serve drivers and shippers across all 48 states and Canada." },
  { question: "How quickly does the recruiting team respond?", answer: "We typically respond within 24 hours of receiving your application or inquiry." },
  { question: "Can shippers or brokers contact XXII Century for freight services?", answer: "Yes. If you need freight shipping services including dry van, refrigerated, or flatbed capacity, contact our logistics team." },
];
