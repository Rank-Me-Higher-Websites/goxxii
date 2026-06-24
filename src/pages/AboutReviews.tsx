import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getReviewsPageSchema,
  getAggregateRatingSchema,
  reviewsFaqsPlain,
  getFAQSchema,
} from "@/data/schemaData";
import { ReviewsWidgetSection } from "@/components/sections/ReviewsWidgetSection";
import { QuickCTABanner } from "@/components/QuickCTABanner";

const AboutReviews = () => {
  const schemas = useMemo(
    () => [
      getOrganizationSchema(),
      getLocalBusinessSchema(),
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Reviews", path: "/about/reviews" },
      ]),
      getReviewsPageSchema(),
      getAggregateRatingSchema(),
      getFAQSchema(reviewsFaqsPlain),
    ],
    [],
  );

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.reviews.title}
        description={SEO_CONTENT.reviews.description}
        keywords={SEO_CONTENT.reviews.keywords}
        canonicalPath="/about/reviews"
      />
      <SchemaMarkup schemas={schemas} />

      <section className="section-padding pt-32 bg-background">
        <div className="container-custom max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/about" className="hover:text-foreground">About</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Reviews</span>
          </nav>

          <span className="label-tag mb-3">Driver-Verified Reviews</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.05] text-foreground mb-6">
            XXII Century Inc Reviews:{" "}
            <span className="text-gradient">What Drivers Actually Say</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-4">
            Honest XXII Century Trucking reviews from owner operators and company drivers — covering
            real pay, dispatch quality, fuel discounts, freight quality, and how XXII Century compares
            to other Chicago CDL-A carriers.
          </p>
          <p className="text-muted-foreground max-w-2xl">
            Headquartered in Woodridge, IL, XXII Century Inc (operating as XXII Century Trucking,
            reachable at goxxii.com) has been hauling Fortune 500 freight since 2009. Below are
            aggregated ratings and recurring themes drivers mention in their reviews.
          </p>
        </div>
      </section>

      <section className="section-padding bg-muted/20">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-bold text-accent">4.8/5</div>
              <div className="text-xs text-muted-foreground mt-1">Driver Rating</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-bold text-accent">100+</div>
              <div className="text-xs text-muted-foreground mt-1">Active Drivers</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-bold text-accent">16+</div>
              <div className="text-xs text-muted-foreground mt-1">Years in Business</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-bold text-accent">97%</div>
              <div className="text-xs text-muted-foreground mt-1">On-Time Delivery</div>
            </div>
          </div>

          <h2 className="heading-section text-foreground mb-4">
            What Drivers Like Most About XXII Century Trucking
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-muted-foreground mb-10">
            <li>
              <strong className="text-foreground">Transparent owner operator pay.</strong> Owner
              operators consistently mention keeping 80% of gross with no hidden trailer rental, ELD,
              or dispatch fees on their settlement.
            </li>
            <li>
              <strong className="text-foreground">Real fuel discounts.</strong> Reviews highlight the
              fleet fuel program at major truck stops and AI-assisted fuel routing as a meaningful
              weekly savings vs. mid-size carriers.
            </li>
            <li>
              <strong className="text-foreground">Fortune 500 freight, not brokered loads.</strong>{" "}
              Drivers cite steady, direct freight from Fortune 500 shippers rather than thin broker
              loads — a recurring theme in positive XXII Century reviews.
            </li>
            <li>
              <strong className="text-foreground">No forced dispatch.</strong> Owner operators report
              being able to decline loads without retaliation, a top differentiator vs. larger
              mega-carriers.
            </li>
            <li>
              <strong className="text-foreground">Weekly pay, on time.</strong> Settlements arrive
              consistently weekly — a basic expectation many drivers say other carriers miss.
            </li>
            <li>
              <strong className="text-foreground">24/7 dispatch from Woodridge, IL.</strong> Reviews
              of the dispatch team from the Chicago HQ are consistently strong, especially for
              after-hours support.
            </li>
          </ul>

          <h2 className="heading-section text-foreground mb-4">
            Common Questions in XXII Century Inc Reviews
          </h2>
          <div className="space-y-5 mb-10">
            {reviewsFaqsPlain.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>

          <h2 className="heading-section text-foreground mb-4">
            About XXII Century Inc (goxxii.com)
          </h2>
          <p className="text-muted-foreground mb-3">
            XXII Century Trucking is an asset-based Chicago CDL-A carrier founded in 2009 and based
            at 7501 Lemont Rd, Suite 200, Woodridge, IL 60517. The company operates owner operator,
            company driver, and Power Only fleet programs across the continental U.S. and Canada,
            and provides freight shipping services for shippers and brokers.
          </p>
          <p className="text-muted-foreground mb-3">
            Phone: <a href="tel:+16309146037" className="text-accent hover:underline">630-914-6037</a> ·
            Recruiting:{" "}
            <a href="mailto:hr@goxxii.com" className="text-accent hover:underline">hr@goxxii.com</a>
          </p>
          <p className="text-muted-foreground">
            See current openings on the{" "}
            <Link to="/careers" className="text-accent hover:underline">careers page</Link>, learn
            more about the company on the{" "}
            <Link to="/about" className="text-accent hover:underline">about page</Link>, or read
            program details for{" "}
            <Link to="/owner-operators" className="text-accent hover:underline">owner operators</Link>{" "}
            and{" "}
            <Link to="/company-drivers" className="text-accent hover:underline">company drivers</Link>.
          </p>
        </div>
      </section>

      <ReviewsWidgetSection />
      <QuickCTABanner />
    </Layout>
  );
};

export default AboutReviews;
