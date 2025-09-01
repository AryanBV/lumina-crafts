"use client";

import { products } from "@/constants/products";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <section className="section-padding py-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
          Bestselling Candles
        </h2>
        <p className="text-xl text-coffee max-w-2xl mx-auto">
          Discover our most loved fragrances, handpicked by our customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-caramel font-medium hover:text-caramel-dark transition-colors group"
        >
          <span className="text-lg">View All Products</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}