import { useMemo, type ReactNode } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
} from "@/data/schemaData";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <section>
    <h2 className="font-display text-xl font-bold text-foreground mb-3">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

interface ClauseProps {
  n: string;
  label: string;
  children: ReactNode;
}

const Clause = ({ n, label, children }: ClauseProps) => (
  <p>
    {n} <strong className="text-foreground">{label}</strong> {children}
  </p>
);

const List = ({ items }: { items: ReactNode[] }) => (
  <ul className="list-disc pl-6 space-y-1">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const REFUND_ROWS: [string, string][] = [
  [
    "Any Service, before work begins",
    "Full refund if cancelled within 3 business days of payment and before the first session or start of work",
  ],
  [
    "Flat-fee or package, after work begins",
    "Refund of the unused portion, minus work already performed at our standard hourly rate of $100 and a 7% administrative fee",
  ],
  ["Hourly Services", "No refund for hours already worked"],
  [
    "Monthly retainer",
    "Cancel anytime with written notice at least 7 days before the next billing date; no refund for the current month already billed",
  ],
  ["Delivered Deliverables, completed sessions, training", "Non-refundable"],
];

const Terms = () => {
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Terms & Conditions", path: "/terms" },
    ]),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.terms.title}
        description={SEO_CONTENT.terms.description}
        keywords={SEO_CONTENT.terms.keywords}
        canonicalPath="/terms"
      />
      <SchemaMarkup schemas={schemas} />
      <article className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground mb-8">Effective Date: October 1, 2026</p>

            <div className="prose prose-lg prose-invert max-w-none space-y-8">
              <p className="text-muted-foreground leading-relaxed">
                These Terms and Conditions (the "Terms") govern your use of goxxii.com (the "Website"), your
                use of the contact, quote and application forms on the Website, and your purchase of
                consulting or transportation services from XXII Century Inc., a federally authorized motor
                carrier (USDOT 2597074) ("XXII Century," "Company," "we," "us," or "our"), 7501 Lemont Rd,
                Suite 200, Woodridge, IL 60517. By using the Website, submitting a form, signing a proposal,
                Statement of Work or Rate Confirmation, or paying for Services, you agree to these Terms.
              </p>

              <Section title="1. Acceptance and Definitions">
                <Clause n="1.1" label="Eligibility.">
                  You must be at least 18 years old and authorized to bind the business you represent. If you
                  accept on behalf of a company, "Client," "you," and "your" refer to that company.
                </Clause>
                <Clause n="1.2" label="Definitions.">{""}</Clause>
                <List
                  items={[
                    <><strong className="text-foreground">"Services"</strong> means Consulting Services and Transportation Services together.</>,
                    <><strong className="text-foreground">"Consulting Services"</strong> means the consulting, advisory, training and related services described in Section 2 or in a Statement of Work.</>,
                    <><strong className="text-foreground">"Transportation Services"</strong> means truckload freight transportation we provide as a motor carrier, described in Section 9.</>,
                    <><strong className="text-foreground">"Statement of Work" or "SOW"</strong> means a written proposal, quote, invoice or order form for Consulting Services that references these Terms.</>,
                    <><strong className="text-foreground">"Rate Confirmation"</strong> means the signed rate confirmation, load tender acceptance or transportation agreement for a specific shipment.</>,
                    <><strong className="text-foreground">"Deliverables"</strong> means reports, templates, plans, documents and other materials we prepare as part of Consulting Services.</>,
                    <><strong className="text-foreground">"Forms"</strong> means the contact, freight quote and driver or contractor application forms on the Website.</>,
                  ]}
                />
                <Clause n="1.3" label="Order of precedence.">
                  If an SOW conflicts with these Terms, the SOW controls for that engagement only.
                </Clause>
              </Section>

              <Section title="2. Consulting Services">
                <Clause n="2.1" label="Scope.">
                  XXII Century provides business consulting to motor carriers, owner-operators, fleets and
                  other transportation businesses. Services may include:
                </Clause>
                <List
                  items={[
                    "Trucking company startup and operating-authority guidance",
                    "Fleet operations, dispatch and lane strategy",
                    "Safety and compliance program reviews (DOT/FMCSA readiness, driver qualification files, policies)",
                    "Driver recruiting and retention strategy",
                    "Fuel, cost and profitability analysis",
                    "Broker and shipper relationship strategy",
                    "Training sessions and one-on-one advisory calls",
                  ]}
                />
                <Clause n="2.2" label="How Services are delivered.">
                  Services are delivered remotely (phone, video, email) or on-site as stated in the SOW.
                  Deliverables are sent electronically. Services are considered delivered when the session
                  takes place or the Deliverable is sent to your email on file.
                </Clause>
                <Clause n="2.3" label="Changes in scope.">
                  Work outside the SOW requires a written change order and may involve additional fees.
                </Clause>
                <Clause n="2.4" label="Advisory only.">
                  When providing Consulting Services, we act only as consultants, not as your employer, broker,
                  insurer or agent. Consulting Services do not include holding your operating authority, filing
                  regulatory submissions in your name, or making decisions for your business unless an SOW
                  expressly says so. Any freight we haul for you is a separate Transportation Service under
                  Section 9.
                </Clause>
              </Section>

              <Section title="3. Consulting Fees and Payment">
                <Clause n="3.1" label="Pricing.">
                  Sections 3 and 4 apply to Consulting Services; freight charges are governed by Section 9.
                  Consulting fees are stated on the Website, in your SOW or on your invoice, in U.S. dollars.
                  Services may be billed as a flat fee, an hourly rate, a package, or a monthly retainer.
                </Clause>
                <Clause n="3.2" label="When payment is due.">{""}</Clause>
                <List
                  items={[
                    <><strong className="text-foreground">Flat-fee and package Services:</strong> paid in full at booking, unless the SOW sets a deposit and milestone schedule.</>,
                    <><strong className="text-foreground">Hourly Services:</strong> billed weekly in arrears; due on receipt.</>,
                    <><strong className="text-foreground">Monthly retainers:</strong> billed in advance on the same date each month until cancelled under Section 4.</>,
                  ]}
                />
                <Clause n="3.3" label="Payment methods.">
                  We accept major credit and debit cards, ACH and other methods shown at checkout. Card
                  payments are processed by our third-party payment processor; we do not store full card
                  numbers.
                </Clause>
                <Clause n="3.4" label="Authorization.">
                  By providing a payment method, you authorize XXII Century to charge it for all fees in your
                  SOW and, for retainers or subscriptions, to charge it automatically each billing period until
                  you cancel. You confirm you are authorized to use that payment method.
                </Clause>
                <Clause n="3.5" label="Late or failed payments.">
                  Unpaid balances more than 10 days past due may incur a late fee of 1.2% per month or the
                  maximum allowed by law, whichever is lower. We may pause Services until the account is
                  current.
                </Clause>
                <Clause n="3.6" label="Taxes and expenses.">
                  Fees exclude applicable taxes. Pre-approved travel and out-of-pocket expenses for on-site
                  work are billed at cost.
                </Clause>
                <Clause n="3.7" label="Billing descriptor.">
                  Charges appear on your statement as <strong className="text-foreground">XXII CENTURY INC</strong>.
                  Contact us before disputing any charge you do not recognize.
                </Clause>
              </Section>

              <Section title="4. Consulting Cancellation, Rescheduling and Refunds">
                <Clause n="4.1" label="Rescheduling sessions.">
                  You may reschedule a call or session free of charge with at least 24 hours' notice. Missed
                  sessions or changes with less notice are treated as delivered and are not refundable.
                </Clause>
                <Clause n="4.2" label="Refund policy.">{""}</Clause>
                <div className="overflow-x-auto not-prose">
                  <table className="w-full text-sm border border-border">
                    <thead>
                      <tr className="bg-muted/30 text-foreground">
                        <th className="text-left p-3 border-b border-border">Service type</th>
                        <th className="text-left p-3 border-b border-border">Refund</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REFUND_ROWS.map(([type, refund]) => (
                        <tr key={type} className="border-b border-border last:border-0 align-top">
                          <td className="p-3 text-foreground">{type}</td>
                          <td className="p-3 text-muted-foreground">{refund}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Clause n="4.3" label="How to request a refund or cancel.">
                  Email{" "}
                  <a href="mailto:info@goxxii.com" className="text-primary hover:underline">info@goxxii.com</a>{" "}
                  with your name, company, invoice number and reason. We respond within 3 business days.
                  Approved refunds go back to the original payment method within 5–10 business days.
                </Clause>
                <Clause n="4.4" label="Satisfaction concerns.">
                  If you believe a Service was not delivered as described, tell us in writing within 14 days of
                  delivery. We will work in good faith to correct it, which may include re-performing the
                  Service or issuing a partial refund at our discretion.
                </Clause>
                <Clause n="4.5" label="Chargebacks.">
                  You agree to contact us first and give us a reasonable chance to resolve any billing issue
                  before filing a dispute or chargeback with your bank or card issuer. If you file a chargeback
                  for Services that were delivered, we may submit evidence of delivery (SOWs, session records,
                  emails, Deliverables) to the issuer, suspend Services, and pursue collection of amounts owed.
                </Clause>
              </Section>

              <Section title="5. Client Responsibilities and No Guarantee of Results">
                <Clause n="5.1" label="Your cooperation.">
                  You agree to provide accurate, complete and timely information, records and access needed for
                  the Services. We rely on what you give us and are not responsible for outcomes caused by
                  inaccurate or missing information.
                </Clause>
                <Clause n="5.2" label="Your decisions.">
                  You remain solely responsible for your business decisions, operations, drivers, equipment,
                  contracts and regulatory compliance, including with FMCSA, DOT, IRS, IFTA, state agencies and
                  insurers.
                </Clause>
                <Clause n="5.3" label="No guarantees.">
                  Results depend on factors outside our control (markets, freight rates, regulators, insurers,
                  your execution). We do not guarantee any specific outcome, including revenue, savings, safety
                  ratings, audit results, authority approval, insurance pricing, loads or driver hires.
                </Clause>
                <Clause n="5.4" label="Not legal, tax or insurance advice.">
                  Our Services are business consulting. They are not legal, accounting, tax, insurance or
                  investment advice. Consult a licensed attorney, CPA or insurance professional before acting
                  on matters in those areas.
                </Clause>
              </Section>

              <Section title="6. Confidentiality, Intellectual Property and Website Use">
                <Clause n="6.1" label="Confidentiality.">
                  Each party will keep the other's non-public business information confidential and use it only
                  for the engagement. This does not apply to information that is public, already known,
                  independently developed, or required to be disclosed by law.
                </Clause>
                <Clause n="6.2" label="Deliverables.">
                  Once paid in full, you receive a non-exclusive, non-transferable license to use Deliverables
                  for your own internal business. You may not resell, publish or redistribute them.
                </Clause>
                <Clause n="6.3" label="Our materials.">
                  XXII Century keeps all rights to its pre-existing know-how, methods, templates, training
                  materials and Website content, including text, graphics, logos and software. You may not
                  copy, reproduce or create derivative works without our written permission.
                </Clause>
                <Clause n="6.4" label="Website use.">
                  You agree to use the Website only for lawful purposes. Information you submit through our
                  Forms must be truthful and accurate. Freight quotes are covered by Section 9, driver and
                  contractor applications by Section 10, and communications consent by Section 11.
                </Clause>
                <Clause n="6.5" label="Third-party links and tools.">
                  The Website and Services may reference third-party websites, software or vendors. We do not
                  control or endorse them and are not responsible for their content, products or practices.
                </Clause>
                <Clause n="6.6" label="Privacy.">
                  Our{" "}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>{" "}
                  explains how we collect, use and protect personal data, including payment and contact
                  information.
                </Clause>
              </Section>

              <Section title="7. Disclaimers, Limitation of Liability and Indemnification">
                <Clause n="7.1" label="Disclaimer.">
                  We perform Services with reasonable professional care. Otherwise, the Website, Services and
                  Deliverables are provided "as is" and "as available," without other warranties, express or
                  implied, including merchantability, fitness for a particular purpose or non-infringement. We
                  do not guarantee the Website will be uninterrupted or error-free.
                </Clause>
                <Clause n="7.2" label="Limitation of liability.">To the fullest extent permitted by law:</Clause>
                <List
                  items={[
                    "XXII Century is not liable for indirect, incidental, special, consequential or punitive damages, including lost profits, lost loads, fines, penalties, out-of-service orders, insurance increases or business interruption.",
                    "Our total liability for any claim relating to the Website or Services is limited to the fees you paid us for the specific Services giving rise to the claim during the 3 months before the claim.",
                  ]}
                />
                <Clause n="7.3" label="Indemnification.">
                  You agree to indemnify and hold harmless XXII Century and its affiliates, officers, employees
                  and agents from claims, losses and expenses (including reasonable attorneys' fees) arising
                  from your business operations, your decisions, your breach of these Terms, or information you
                  provided.
                </Clause>
                <Clause n="7.4" label="Independent contractor.">
                  XXII Century acts as an independent contractor. Nothing in these Terms creates a partnership,
                  joint venture, employment or agency relationship.
                </Clause>
              </Section>

              <Section title="8. Termination, Disputes and General Terms">
                <Clause n="8.1" label="Termination.">
                  Either party may end an engagement with 14 days' written notice, or immediately if the other
                  party materially breaches these Terms and does not fix it within 10 days of notice. You pay
                  for Services performed through the termination date; refunds follow Section 4.
                </Clause>
                <Clause n="8.2" label="Dispute resolution.">
                  The parties will first try to resolve any dispute informally for 30 days after written
                  notice. If unresolved, disputes will be heard in the state or federal courts located in
                  DuPage County, Illinois, and both parties consent to that jurisdiction.
                </Clause>
                <Clause n="8.3" label="Governing law.">
                  These Terms are governed by the laws of the State of Illinois, without regard to
                  conflict-of-law principles.
                </Clause>
                <Clause n="8.4" label="Changes to these Terms.">
                  We may update these Terms by posting a new version with a new Effective Date. Changes do not
                  affect an SOW already signed unless you agree in writing.
                </Clause>
                <Clause n="8.5" label="General.">
                  These Terms and any SOW are the entire agreement on their subject. If any provision is
                  unenforceable, the rest remains in effect. Failure to enforce a provision is not a waiver.
                  You may not assign these Terms without our written consent. Neither party is liable for
                  delays caused by events beyond its reasonable control. Sections 3–11 survive termination.
                </Clause>
              </Section>

              <Section title="9. Transportation Services and Freight Quotes">
                <Clause n="9.1" label="Quote requests.">
                  Submitting a quote request through our Forms does not create a contract or commit us to haul
                  any load. Quotes are estimates based on the information you provide (origin, destination,
                  dates, commodity, weight, equipment) and are valid for 7 days unless stated otherwise.
                </Clause>
                <Clause n="9.2" label="Binding terms.">
                  A shipment is accepted only when both parties confirm it in a Rate Confirmation or signed
                  transportation agreement. That document, the bill of lading and these Terms govern the
                  shipment. If they conflict, the signed transportation agreement controls, then the Rate
                  Confirmation, then these Terms.
                </Clause>
                <Clause n="9.3" label="Shipper responsibilities.">You agree to:</Clause>
                <List
                  items={[
                    "Describe the freight accurately, including weight, dimensions, value and any hazardous materials",
                    "Tender freight that is properly packaged, loaded, blocked and braced, and within legal weight limits",
                    "Provide accurate pickup and delivery information and reasonable loading and unloading times",
                    "Not tender prohibited, illegal or undeclared hazardous commodities",
                  ]}
                />
                <Clause n="9.4" label="Accessorial charges.">
                  Detention, layover, truck order not used (TONU), lumper, extra stops, re-delivery and similar
                  charges apply as listed in the Rate Confirmation or our then-current accessorial schedule.
                </Clause>
                <Clause n="9.5" label="Payment for freight.">
                  Freight charges are due net 30 from invoice unless the Rate Confirmation states otherwise.
                  Card payments may carry a disclosed processing fee where permitted by law. Freight charges
                  are earned once the load is picked up and are not refundable after transport begins.
                  Cancellation after a truck is dispatched incurs the TONU fee stated in the Rate Confirmation.
                </Clause>
                <Clause n="9.6" label="Cargo loss and damage.">
                  Our liability for loss of or damage to cargo is governed by 49 U.S.C. § 14706 (the Carmack
                  Amendment) and is limited to the lesser of the actual value of the goods or $100,000 per
                  shipment, unless a higher declared value is agreed in writing before pickup. We are not
                  liable for delays caused by weather, road closures, accidents, regulatory inspections,
                  shipper or receiver delays, or other events beyond our control.
                </Clause>
                <Clause n="9.7" label="Claims.">
                  Cargo claims must be filed in writing within 9 months of delivery (or of the expected
                  delivery date if not delivered). Any lawsuit on a declined claim must be filed within 2 years
                  of our written declination. Freight charges may not be deducted from or offset against a
                  pending claim.
                </Clause>
              </Section>

              <Section title="10. Driver and Contractor Applications">
                <Clause n="10.1" label="Accuracy.">
                  By submitting a driver, owner-operator or contractor application, you confirm that the
                  information you provide is true and complete. False or missing information may lead to
                  rejection or later termination.
                </Clause>
                <Clause n="10.2" label="No offer or guarantee.">
                  Submitting an application does not create an offer of employment or contract. Any employment
                  is at-will unless a written agreement says otherwise. Owner-operators are engaged only under
                  a signed lease or independent contractor agreement that complies with 49 C.F.R. Part 376.
                </Clause>
                <Clause n="10.3" label="Background and safety checks.">
                  Before hiring or contracting, we may request your written authorization, on separate
                  disclosure forms, to obtain consumer reports, motor vehicle records, FMCSA Pre-Employment
                  Screening Program (PSP) reports, prior-employer safety performance history, and Drug and
                  Alcohol Clearinghouse queries as required or permitted under 49 C.F.R. Parts 382 and 391 and
                  the Fair Credit Reporting Act. You will receive any notices those laws require before an
                  adverse decision.
                </Clause>
                <Clause n="10.4" label="Use and retention of applicant data.">
                  We use application information only to evaluate your qualifications, verify your history and
                  contact you about opportunities. We do not sell applicant data. We retain records as required
                  by FMCSA regulations and applicable law.
                </Clause>
                <Clause n="10.5" label="Equal opportunity.">
                  XXII Century is an equal opportunity employer and considers applicants without regard to any
                  status protected by law.
                </Clause>
              </Section>

              <Section title="11. Communications Consent (SMS, Phone and Email)">
                <Clause n="11.1" label="Consent.">
                  When you submit a Form and check the consent box, you agree that XXII Century may contact you
                  by phone call, text message (SMS) and email at the contact details you provided about your
                  quote, application, account or Services. Consent is not a condition of any purchase or of
                  being considered for a position.
                </Clause>
                <Clause n="11.2" label="Message details.">
                  Message frequency varies. Message and data rates may apply. Reply{" "}
                  <strong className="text-foreground">STOP</strong> to opt out of texts at any time and{" "}
                  <strong className="text-foreground">HELP</strong> for help, or contact us at{" "}
                  <a href="mailto:info@goxxii.com" className="text-primary hover:underline">info@goxxii.com</a>.
                  You may unsubscribe from emails using the link in any email.
                </Clause>
                <Clause n="11.3" label="No sharing.">
                  We do not sell or share your mobile number or text messaging consent with third parties or
                  affiliates for their marketing purposes.
                </Clause>
                <Clause n="11.4" label="Carriers.">
                  Mobile carriers are not liable for delayed or undelivered messages.
                </Clause>
              </Section>

              <Section title="12. Contact Us">
                <p className="text-foreground font-semibold">XXII Century Inc.</p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> 7501 Lemont Rd Ste 200, Woodridge, IL 60517
                </p>
                <a href="tel:6309480501" className="flex items-center gap-2 text-primary hover:underline">
                  <Phone className="w-4 h-4" /> 630-948-0501
                </a>
                <a href="mailto:info@goxxii.com" className="flex items-center gap-2 text-primary hover:underline">
                  <Mail className="w-4 h-4" /> info@goxxii.com
                </a>
                <p>Customer service hours: Mon–Fri, 9 a.m.–5 p.m. CT</p>
              </Section>
            </div>
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default Terms;
