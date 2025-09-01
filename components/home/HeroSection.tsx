"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-nude-light to-cream">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #C4A574 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.1
        }}></div>
      </div>

      <div className="section-padding relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-caramel font-medium">Handcrafted with Love</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brown mb-6 leading-tight">
              Illuminate Your
              <span className="block text-gradient-gold mt-2">Sacred Space</span>
            </h1>
            
            <p className="text-xl text-coffee mb-8 leading-relaxed">
              Transform your home into a sanctuary with our premium handcrafted candles. 
              Made from 100% natural soy wax and infused with carefully selected fragrances.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="group px-8 py-4 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/about"
                className="px-8 py-4 border-2 border-coffee text-coffee font-medium rounded-full hover:bg-nude-light transition-all duration-300 text-center"
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-nude">
              {[
                { value: "100%", label: "Natural Soy" },
                { value: "40+", label: "Hours Burn Time" },
                { value: "15+", label: "Unique Scents" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-caramel">{stat.value}</div>
                  <div className="text-sm text-coffee mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-caramel to-gold">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">🕯️</div>
                    <p className="text-xl font-serif">Premium Candles</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 right-10 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
              >
                <span className="text-sm font-medium text-coffee">✨ New Collection</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}