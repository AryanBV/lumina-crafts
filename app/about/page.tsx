"use client";

import { motion } from "framer-motion";
import { 
  Flame, Leaf, Heart, Award, Users, Sparkles, 
  ChevronRight, Target, Eye, HandHeart, Star
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "100% Natural",
      description: "We use only natural soy wax and essential oils, free from harmful chemicals and toxins."
    },
    {
      icon: <HandHeart className="w-6 h-6" />,
      title: "Handcrafted with Care",
      description: "Each candle is carefully hand-poured in small batches to ensure the highest quality."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Eco-Friendly",
      description: "Sustainable materials and recyclable packaging because we care about our planet."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Quality",
      description: "We never compromise on quality, using only the finest ingredients available."
    }
  ];

  const process = [
    { number: "01", title: "Select Ingredients", description: "We source the finest natural soy wax and premium fragrances" },
    { number: "02", title: "Hand Pour", description: "Each candle is carefully poured by hand in small batches" },
    { number: "03", title: "Quality Check", description: "Every candle undergoes rigorous quality testing" },
    { number: "04", title: "Pack with Love", description: "Beautiful, eco-friendly packaging for the perfect unboxing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nude via-cream to-nude-light opacity-50"></div>
        
        <div className="section-padding py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-coffee">Est. 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brown mb-6">
              Our Story
            </h1>
            
            <p className="text-xl text-coffee leading-relaxed mb-8">
              Welcome to Lumina Crafts, where every candle tells a story of warmth, 
              comfort, and the simple joy of creating something beautiful by hand.
            </p>

            <div className="flex justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>Explore Collection</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-caramel/20 rounded-full blur-3xl"></div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding py-20">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-caramel to-gold rounded-2xl mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-brown mb-4">Our Mission</h2>
            <p className="text-coffee leading-relaxed">
              To illuminate homes across India with handcrafted, natural candles that 
              transform ordinary moments into extraordinary memories. We believe in 
              creating products that are not just beautiful, but also safe for your 
              family and kind to the environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-coffee to-caramel rounded-2xl mb-6">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-brown mb-4">Our Vision</h2>
            <p className="text-coffee leading-relaxed">
              To become India's most loved candle brand, known for quality, sustainability, 
              and the magical ambiance our products create. We envision a world where 
              every home has a special corner illuminated by the warm glow of a 
              Lumina Crafts candle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Natural Soy Wax */}
      <section className="bg-gradient-to-b from-white to-cream">
        <div className="section-padding py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-brown mb-4">
                Why We Choose Natural Soy Wax
              </h2>
              <p className="text-xl text-coffee max-w-3xl mx-auto">
                Unlike paraffin candles that release harmful toxins, our 100% natural 
                soy wax candles are clean-burning and safe for your loved ones.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-brown mb-3">Renewable Resource</h3>
                <p className="text-coffee">
                  Soy wax is made from soybeans, a natural and renewable resource that's 
                  biodegradable and supports local farmers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">🕐</div>
                <h3 className="text-xl font-semibold text-brown mb-3">Longer Burn Time</h3>
                <p className="text-coffee">
                  Soy candles burn 30-50% longer than paraffin candles, giving you more 
                  hours of enjoyment from each candle.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-brown mb-3">Clean Burning</h3>
                <p className="text-coffee">
                  No black soot or harmful chemicals. Just pure, clean fragrance that's 
                  safe for you and your family.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-brown mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-coffee">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-nude to-nude-light rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-caramel">{value.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-brown mb-3">{value.title}</h3>
                <p className="text-coffee">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-gradient-to-b from-cream to-white">
        <div className="section-padding py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-brown mb-4">
                The Lumina Process
              </h2>
              <p className="text-xl text-coffee">
                From raw materials to your home - crafted with precision and love
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  <div className="text-6xl font-bold text-nude mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-brown mb-2">{step.title}</h3>
                  <p className="text-coffee text-sm">{step.description}</p>
                  {index < process.length - 1 && (
                    <ChevronRight className="hidden md:block absolute top-12 -right-4 w-8 h-8 text-nude" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-coffee to-caramel rounded-3xl p-12 text-center text-white"
        >
          <Flame className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-serif font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of happy customers who have made the switch to natural, 
            handcrafted candles that are better for you and the environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-coffee font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}