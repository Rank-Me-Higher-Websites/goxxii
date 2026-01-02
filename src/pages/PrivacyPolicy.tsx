import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <article className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Effective Date: July 14, 2025
            </p>

            <div className="prose prose-lg prose-invert max-w-none space-y-8">
              <p className="text-muted-foreground leading-relaxed">
                At XXII Century ("Company", "we", "us", or "our"), your privacy is important to us. 
                This Privacy Policy explains how we collect, use, and safeguard your information when 
                you visit our website (the "Site"). By using our Site, you consent to the practices 
                described in this policy.
              </p>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  1. Information We Collect
                </h2>
                <p className="text-muted-foreground mb-3">
                  We collect the following personal information from you through our online contact forms:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>City and state you currently live in</li>
                  <li>Driving experience</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  This information is collected only when you voluntarily submit it through our website.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  2. How We Use Your Information
                </h2>
                <p className="text-muted-foreground mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>To evaluate job applicants and potential drivers</li>
                  <li>To contact you regarding your application</li>
                  <li>To assess your suitability for work with XXII Century</li>
                  <li>To maintain internal records for recruitment and communication</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  We do <strong className="text-foreground">not</strong> use your data for marketing purposes unrelated to your application.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  3. Sharing of Information
                </h2>
                <p className="text-muted-foreground">
                  We do <strong className="text-foreground">not</strong> sell, trade, or otherwise transfer your personal 
                  information to outside parties. Your data is used solely within XXII Century for recruitment 
                  and internal processing purposes.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  4. Cookies and Analytics
                </h2>
                <p className="text-muted-foreground">
                  We use <strong className="text-foreground">Google Analytics</strong> to better understand how visitors 
                  interact with our Site. This may include information such as your device type, IP address, 
                  geographic location, and browsing behavior. This data is collected via cookies and is used 
                  in aggregate form to improve our website's performance and user experience.
                </p>
                <p className="text-muted-foreground mt-3">
                  You can learn more about how Google collects and processes data here:{" "}
                  <a 
                    href="https://policies.google.com/technologies/partner-sites" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Privacy & Terms
                  </a>
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  5. Data Security
                </h2>
                <p className="text-muted-foreground">
                  We take appropriate security measures to protect your personal information from unauthorized 
                  access, alteration, disclosure, or destruction. However, please be aware that no method of 
                  internet transmission or electronic storage is completely secure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  6. Your Rights
                </h2>
                <p className="text-muted-foreground mb-3">
                  If you are a resident of certain jurisdictions, you may have rights under applicable privacy laws, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>The right to access the personal data we hold about you</li>
                  <li>The right to request correction or deletion of your data</li>
                  <li>The right to restrict or object to processing in some circumstances</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  7. Third-Party Links
                </h2>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites. We are not responsible for the content 
                  or privacy practices of those sites. We encourage you to review their privacy policies before 
                  submitting any personal data.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  8. Changes to This Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                  with an updated effective date. Continued use of the Site after such changes constitutes your 
                  acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  9. Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions or concerns about this Privacy Policy or the handling of your 
                  personal information, please contact us at:
                </p>
                <a 
                  href="mailto:info@goxxii.com" 
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" /> info@goxxii.com
                </a>
              </section>
            </div>
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default PrivacyPolicy;
