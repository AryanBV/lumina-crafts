"use client";

import { motion } from "framer-motion";
import { Lock, Calendar, Eye } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nude via-cream to-nude-light relative overflow-hidden">
        <div className="section-padding py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Lock className="w-16 h-16 text-caramel mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
              Privacy Policy
            </h1>
            <p className="text-coffee flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Last updated: January 2025</span>
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-padding py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">1. Information We Collect</h2>
                <p className="text-coffee leading-relaxed mb-3">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-coffee space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Billing and shipping address</li>
                  <li>Payment information (processed securely through Razorpay)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">2. How We Use Your Information</h2>
                <p className="text-coffee leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-coffee space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our products and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">3. Information Sharing</h2>
                <p className="text-coffee leading-relaxed mb-3">
                  We do not sell, trade, or rent your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-coffee space-y-2">
                  <li>Payment processors (Razorpay) to process transactions</li>
                  <li>Shipping partners to deliver your orders</li>
                  <li>Service providers who assist in our operations</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">4. Data Security</h2>
                <p className="text-coffee leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. All payment transactions are 
                  encrypted and processed securely through Razorpay.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">5. Cookies</h2>
                <p className="text-coffee leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain 
                  information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">6. Your Rights</h2>
                <p className="text-coffee leading-relaxed mb-3">
                  Under applicable data protection laws, you have the right to:
                </p>
                <ul className="list-disc pl-6 text-coffee space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">7. Children's Privacy</h2>
                <p className="text-coffee leading-relaxed">
                  Our website is not intended for children under 18 years of age. We do not knowingly collect 
                  personal information from children under 18.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">8. Changes to Privacy Policy</h2>
                <p className="text-coffee leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">9. Contact Us</h2>
                <p className="text-coffee leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                  <br />Email: aryansalian5678@gmail.com
                  <br />Phone: +91 9845853903
                  <br />Address: Bengaluru, Karnataka, India
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}