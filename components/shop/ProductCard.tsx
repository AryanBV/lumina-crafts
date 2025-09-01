"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-nude to-nude-light">
          {/* Placeholder image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🕯️</span>
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-coffee px-6 py-3 rounded-full font-medium flex items-center space-x-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Quick Add</span>
            </motion.button>
          </div>

          {/* Like button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-coffee"
              }`} 
            />
          </button>

          {/* Badge */}
          {product.featured && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-caramel to-gold text-white text-xs font-bold px-3 py-1 rounded-full">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xl font-semibold text-brown mb-2 hover:text-caramel transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-coffee text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-sm text-coffee-light">
              <span>🕐</span>
              <span>{product.burn_time}</span>
            </div>
            {product.scent && (
              <div className="flex items-center space-x-2 text-sm text-coffee-light">
                <span>🌸</span>
                <span>{product.scent}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-coffee">
              {formatPrice(product.price)}
            </span>
            <span className={`text-sm ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}