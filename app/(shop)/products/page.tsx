"use client";

import { useState } from "react";
import { products, categories } from "@/constants/products";
import ProductCard from "@/components/shop/ProductCard";
import { Filter, Grid, List } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category.slug === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-nude to-cream py-16">
        <div className="section-padding text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-coffee max-w-2xl mx-auto">
            Explore our range of handcrafted candles, each one made with care and premium ingredients
          </p>
        </div>
      </div>

      <div className="section-padding py-12">
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-coffee text-white"
                  : "bg-white text-coffee hover:bg-nude"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-coffee text-white"
                    : "bg-white text-coffee hover:bg-nude"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-full bg-white text-coffee border border-nude focus:outline-none focus:border-caramel"
          >
            <option value="featured">Featured</option>
            <option value="name">Name: A-Z</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Results Count */}
        <p className="text-coffee mb-6">
          Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}