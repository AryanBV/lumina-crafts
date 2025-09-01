"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/constants/products";
import { Flame, Gift, Star, Snowflake } from "lucide-react";

export default function CategoriesSection() {
  const categoryIcons = {
    "scented": <Flame className="w-8 h-8" />,
    "unscented": <Star className="w-8 h-8" />,
    "gift-sets": <Gift className="w-8 h-8" />,
    "seasonal": <Snowflake className="w-8 h-8" />,
  };

  const categoryColors = {
    "scented": "from-caramel to-gold",
    "unscented": "from-coffee to-coffee-dark",
    "gift-sets": "from-nude-dark to-caramel",
    "seasonal": "from-gold to-caramel",
  };

  return (
    <section className="section-padding py-20 bg-gradient-to-b from-white to-cream">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
          Shop by Category
        </h2>
        <p className="text-xl text-coffee max-w-2xl mx-auto">
          Find the perfect candle for every mood and occasion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/products?category=${category.slug}`}>
              <div className="group relative h-64 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category.slug as keyof typeof categoryColors]}`}></div>
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 group-hover:scale-110 transition-transform">
                    {categoryIcons[category.slug as keyof typeof categoryIcons]}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 text-sm">Explore Collection →</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}