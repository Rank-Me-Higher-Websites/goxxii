import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Terms = () => {
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
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground mb-8">
              Effective Date: July 14, 2025
            </p>

            <div className="prose prose-lg prose-invert max-w-none space-y-8">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to goxxii.com (the "Website"), operated by XXII Century ("Company," "we," "us," or "our"). 
                By accessing or using this Website, you agree to comply with and be bound by the following Terms 
                and Conditions. Please read them carefully.
              </p>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  1. Use of the Website
                </h2>
                <p className="text-muted-foreground">
                  By accessing this Website, you warrant that you are at least 18 years of age and legally 
                  capable of entering into binding contracts. You agree to use the Website only for lawful 
                  purposes and in accordance with these Terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  2. Applicant Information
                </h2>
                <p className="text-muted-foreground mb-3">
                  You may submit personal information via our contact forms in connection with a job inquiry. 
                  By doing so, you agree that:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>All information you provide is truthful and accurate.</li>
                  <li>You are applying for potential employment or independent contract work.</li>
                  <li>Submission does not guarantee employment.</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  We reserve the right to review, reject, or contact you based on the information provided.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  3. Intellectual Property
                </h2>
                <p className="text-muted-foreground">
                  All content on this Website, including text, graphics, logos, images, and software, is the 
                  property of XXII Century or its licensors and is protected by intellectual property laws. 
                  You may not copy, reproduce, distribute, or create derivative works without our express 
                  written permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  4. Links to Third-Party Sites
                </h2>
                <p className="text-muted-foreground">
                  This Website may contain links to third-party websites. These links are provided for your 
                  convenience only. We do not control or endorse these sites and are not responsible for 
                  their content or practices.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  5. Privacy
                </h2>
                <p className="text-muted-foreground">
                  Your use of the Website is also governed by our{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  , which outlines how we collect and use your personal data.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  6. Disclaimer
                </h2>
                <p className="text-muted-foreground">
                  This Website is provided "as is" and "as available" without warranties of any kind, either 
                  express or implied. We do not guarantee that the Website will be available at all times or 
                  free from errors or viruses.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  7. Limitation of Liability
                </h2>
                <p className="text-muted-foreground">
                  To the fullest extent permitted by law, XXII Century shall not be liable for any damages 
                  arising from your use or inability to use the Website, including but not limited to direct, 
                  indirect, incidental, punitive, or consequential damages.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  8. Indemnification
                </h2>
                <p className="text-muted-foreground">
                  You agree to indemnify and hold harmless XXII Century, its affiliates, officers, employees, 
                  and agents from and against any claims, liabilities, damages, losses, and expenses arising 
                  out of your use of the Website or your violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  9. Changes to Terms
                </h2>
                <p className="text-muted-foreground">
                  We may revise these Terms and Conditions at any time. Changes will be effective upon posting 
                  to the Website. Your continued use of the Website following any changes constitutes your 
                  acceptance of those changes.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  10. Governing Law
                </h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of the State of 
                  Illinois, without regard to its conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  11. Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
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

export default Terms;
