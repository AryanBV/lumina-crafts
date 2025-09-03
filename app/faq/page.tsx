"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ChevronDown, Package, Truck, RefreshCw, 
  CreditCard, Flame, Heart, HelpCircle, MessageCircle
} from "lucide-react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    { id: "all", label: "All Topics", icon: <HelpCircle className="w-5 h-5" /> },
    { id: "orders", label: "Orders", icon: <Package className="w-5 h-5" /> },
    { id: "shipping", label: "Shipping", icon: <Truck className="w-5 h-5" /> },
    { id: "returns", label: "Returns", icon: <RefreshCw className="w-5 h-5" /> },
    { id: "products", label: "Products", icon: <Flame className="w-5 h-5" /> },
    { id: "payment", label: "Payment", icon: <CreditCard className="w-5 h-5" /> }
  ];

  const faqs = [
    {
      id: 1,
      category: "products",
      question: "What are your candles made of?",
      answer: "Our candles are made from 100% natural soy wax, premium cotton wicks, and carefully selected essential oils and fragrances. We never use paraffin wax or harmful chemicals."
    },
    {
      id: 2,
      category: "products",
      question: "How long do your candles burn?",
      answer: "Burn time varies by size: Small (20-25 hours), Medium (40-45 hours), Large (60-65 hours), XL (80+ hours). Proper care can extend burn time."
    },
    {
      id: 3,
      category: "shipping",
      question: "How much is shipping?",
      answer: "We offer FREE shipping on all orders above ₹1000. For orders below ₹1000, standard shipping is ₹99 (3-5 days) and express shipping is ₹199 (1-2 days)."
    },
    {
      id: 4,
      category: "shipping",
      question: "Do you ship across India?",
      answer: "Yes! We ship to all pin codes across India. Some remote areas may take an additional 2-3 days for delivery."
    },
    {
      id: 5,
      category: "shipping",
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order on our website using your order number."
    },
    {
      id: 6,
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused products in original packaging. If you receive a damaged item, we'll replace it free of cost."
    },
    {
      id: 7,
      category: "returns",
      question: "How do I initiate a return?",
      answer: "Contact us via WhatsApp or email with your order number and reason for return. We'll arrange for pickup and process your refund within 7-10 business days."
    },
    {
      id: 8,
      category: "orders",
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 2 hours of placing it. After that, the order goes into processing and cannot be changed."
    },
    {
      id: 9,
      category: "orders",
      question: "Do you offer bulk orders?",
      answer: "Yes! We offer special pricing for bulk orders (50+ candles). Perfect for weddings, corporate gifts, or events. Contact us for a custom quote."
    },
    {
      id: 10,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods: UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, Wallets, and Cash on Delivery."
    },
    {
      id: 11,
      category: "payment",
      question: "Is online payment secure?",
      answer: "Yes, absolutely! We use Razorpay for payment processing, which uses industry-standard SSL encryption to protect your information."
    },
    {
      id: 12,
      category: "products",
      question: "How should I care for my candle?",
      answer: "Trim the wick to 1/4 inch before each burn, allow the wax to melt evenly on first burn (2-3 hours), never burn for more than 4 hours at a time, and keep away from drafts."
    },
    {
      id: 13,
      category: "products",
      question: "Are your candles safe for pets?",
      answer: "Our candles are made from natural ingredients, but we recommend keeping them out of reach of pets and ensuring proper ventilation when burning."
    },
    {
      id: 14,
      category: "orders",
      question: "Do you offer gift wrapping?",
      answer: "Yes! We offer complimentary gift wrapping on all orders. You can also add a personalized message during checkout."
    },
    {
      id: 15,
      category: "shipping",
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within India. We're working on international shipping and hope to offer it soon!"
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nude via-cream to-nude-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #8B7355 1px, transparent 1px)`,
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
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brown mb-6">
              How Can We Help?
            </h1>
            
            <p className="text-xl text-coffee mb-8">
              Find answers to common questions about our products, orders, and policies
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-light" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-lg focus:outline-none focus:shadow-xl transition-shadow"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-padding py-20">
        <div className="max-w-5xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-coffee to-caramel text-white shadow-lg"
                    : "bg-white text-coffee hover:bg-nude-light"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-nude-light transition-colors"
                >
                  <div className="flex items-start space-x-4 text-left">
                    <div className="p-2 bg-nude rounded-lg mt-1">
                      {categories.find(c => c.id === faq.category)?.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-brown text-lg">{faq.question}</h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-coffee transition-transform ${
                    openItems.includes(faq.id) ? "rotate-180" : ""
                  }`} />
                </button>
                
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pl-20">
                        <p className="text-coffee leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-coffee-light mx-auto mb-4" />
              <p className="text-xl text-coffee">No questions found matching your search.</p>
              <p className="text-coffee-light mt-2">Try different keywords or browse all categories.</p>
            </div>
          )}

          {/* Still Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-r from-coffee to-caramel rounded-3xl p-12 text-center text-white"
          >
            <MessageCircle className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Our customer support team is here to help! Reach out via WhatsApp for instant assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919845853903"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-coffee font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Chat on WhatsApp
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Contact Form
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}