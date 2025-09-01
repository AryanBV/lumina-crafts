"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Award, Truck, Clock, Shield } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "100% Natural",
      description: "Made with pure soy wax and essential oils, free from harmful chemicals",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Handcrafted",
      description: "Each candle is carefully hand-poured with love and attention to detail",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Quality",
      description: "We use only the finest ingredients for a superior burning experience",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Long Lasting",
      description: "Our candles burn 30% longer than regular paraffin candles",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Shipping",
      description: "Quick and secure delivery across India within 3-5 business days",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Satisfaction Guaranteed",
      description: "30-day return policy if you're not completely satisfied",
    },
  ];

  return (
    <section className="section-padding py-20 bg-gradient-to-b from-cream to-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
          Why Choose Lumina Crafts
        </h2>
        <p className="text-xl text-coffee max-w-2xl mx-auto">
          Experience the difference of artisanal craftsmanship
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-caramel to-gold text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-brown mb-2">{feature.title}</h3>
            <p className="text-coffee">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}