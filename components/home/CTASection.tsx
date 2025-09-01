"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-coffee to-caramel">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Discover our complete collection of handcrafted candles and find your perfect scent
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="group px-8 py-4 bg-white text-coffee font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 text-center"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}