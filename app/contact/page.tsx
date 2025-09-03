"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, Send, MessageCircle, 
  Clock, CheckCircle, Sparkles, Instagram, Facebook
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Thank you for contacting us! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "aryansalian5678@gmail.com",
      link: "mailto:aryansalian5678@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call or WhatsApp",
      content: "+91 9845853903",
      link: "tel:+919845853903"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      content: "Bengaluru, Karnataka",
      link: null
    }
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "We deliver across India within 3-5 business days. Express shipping available."
    },
    {
      question: "Do you offer bulk orders?",
      answer: "Yes! Contact us for special pricing on bulk orders for events or corporate gifts."
    },
    {
      question: "Can I customize candles?",
      answer: "We offer custom labeling and packaging for orders above 50 pieces."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nude via-cream to-nude-light">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C4A574 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="section-padding py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-coffee">We're here to help</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brown mb-6">
              Get in Touch
            </h1>
            
            <p className="text-xl text-coffee leading-relaxed">
              Have a question about our candles? Need help with your order? 
              We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-padding py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-serif font-bold text-brown mb-6">
                  Contact Information
                </h2>
                <p className="text-coffee mb-8">
                  Reach out to us through any of these channels. We typically respond within 24 hours.
                </p>
              </div>

              {/* Contact Cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-nude to-nude-light rounded-xl">
                      <div className="text-caramel">{info.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-brown mb-1">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-coffee hover:text-caramel transition-colors break-all"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-coffee">{info.content}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <MessageCircle className="w-8 h-8" />
                  <h3 className="text-xl font-semibold">Chat on WhatsApp</h3>
                </div>
                <p className="mb-4 text-white/90">
                  Get instant support and order updates
                </p>
                
                <a
                  href="https://wa.me/919845853903?text=Hi%20Lumina%20Crafts!%20I%20have%20a%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white text-green-600 px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chat</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <h2 className="text-2xl font-serif font-bold text-brown mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-coffee mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-nude focus:outline-none focus:border-caramel transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-coffee mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-nude focus:outline-none focus:border-caramel transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-coffee mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-nude focus:outline-none focus:border-caramel transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-coffee mb-2">
                        Subject *
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-nude focus:outline-none focus:border-caramel transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="bulk">Bulk Order</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-coffee mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-nude focus:outline-none focus:border-caramel transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Quick FAQs */}
              <div className="mt-8">
                <h3 className="text-2xl font-serif font-bold text-brown mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-6 shadow-md"
                    >
                      <h4 className="font-semibold text-brown mb-2">{faq.question}</h4>
                      <p className="text-coffee">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
                <Link
                  href="/faq"
                  className="inline-flex items-center space-x-2 text-caramel font-medium mt-6 hover:text-caramel-dark transition-colors"
                >
                  <span>View all FAQs</span>
                  <CheckCircle className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/919845853903"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us!
        </span>
      </a>
    </div>
  );
}