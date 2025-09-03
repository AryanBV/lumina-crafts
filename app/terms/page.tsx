"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Calendar } from "lucide-react";

export default function TermsPage() {
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
            <Shield className="w-16 h-16 text-caramel mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
              Terms & Conditions
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
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">1. Introduction</h2>
                <p className="text-coffee leading-relaxed">
                  Welcome to Lumina Crafts. These Terms and Conditions ("Terms") govern your use of our website 
                  and the purchase of products from our online store. By accessing our website and/or purchasing 
                  our products, you agree to be bound by these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">2. Products and Services</h2>
                <p className="text-coffee leading-relaxed mb-3">
                  All products displayed on our website are subject to availability. We reserve the right to:
                </p>
                <ul className="list-disc pl-6 text-coffee space-y-2">
                  <li>Discontinue any product at any time</li>
                  <li>Limit the quantity of products available for purchase</li>
                  <li>Refuse service to anyone for any reason</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">3. Pricing and Payment</h2>
                <p className="text-coffee leading-relaxed mb-3">
                  All prices are listed in Indian Rupees (INR) and include applicable taxes unless otherwise stated. 
                  We accept the following payment methods:
                </p>
                <ul className="list-disc pl-6 text-coffee space-y-2">
                  <li>UPI (Google Pay, PhonePe, Paytm)</li>
                  <li>Credit/Debit Cards</li>
                  <li>Net Banking</li>
                  <li>Cash on Delivery (COD)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">4. Shipping and Delivery</h2>
                <p className="text-coffee leading-relaxed">
                  We ship across India. Shipping charges and estimated delivery times will be calculated at checkout. 
                  Free shipping is available on orders above ₹1000. Delivery times are estimates and not guaranteed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">5. Returns and Refunds</h2>
                <p className="text-coffee leading-relaxed">
                  We offer a 30-day return policy for unused products in original packaging. Refunds will be processed 
                  within 7-10 business days after receipt of returned items. Shipping charges are non-refundable unless 
                  the return is due to our error.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">6. Product Use and Safety</h2>
                <p className="text-coffee leading-relaxed mb-3">
                  For safe use of our candles:
                </p>
                <ul className="list-disc pl-6 text-coffee space-y-2">
                  <li>Never leave a burning candle unattended</li>
                  <li>Keep away from children and pets</li>
                  <li>Place on a heat-resistant surface</li>
                  <li>Trim wick to 1/4 inch before each use</li>
                  <li>Do not burn for more than 4 hours at a time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">7. Intellectual Property</h2>
                <p className="text-coffee leading-relaxed">
                  All content on this website, including images, text, logos, and designs, is the property of 
                  Lumina Crafts and protected by intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">8. Limitation of Liability</h2>
                <p className="text-coffee leading-relaxed">
                  Lumina Crafts shall not be liable for any indirect, incidental, special, or consequential damages 
                  arising from the use of our products or website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">9. Governing Law</h2>
                <p className="text-coffee leading-relaxed">
                  These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive 
                  jurisdiction of the courts in Bengaluru, Karnataka.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold text-brown mb-4">10. Contact Information</h2>
                <p className="text-coffee leading-relaxed">
                  For questions about these Terms, please contact us at:
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