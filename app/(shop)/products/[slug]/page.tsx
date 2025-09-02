"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/constants/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import ProductCard from "@/components/shop/ProductCard";
import { 
  ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight, 
  Star, Check, Minus, Plus, Shield, Truck, RefreshCw,
  Flame, Clock, Package, Sparkles, Info
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState("description");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const product = products.find(p => p.slug === params.slug);

  useEffect(() => {
    if (!product) {
      router.push("/products");
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  // Mock images for gallery
  const productImages = [
    "🕯️", "✨", "🌟", "💫"
  ];

  const relatedProducts = products
    .filter(p => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    setIsAddingToCart(false);
    toast.success(
      <div className="flex items-center space-x-2">
        <Check className="w-5 h-5" />
        <span>{quantity} item(s) added to cart!</span>
      </div>,
      {
        style: {
          background: '#8B7355',
          color: 'white',
        },
      }
    );
    
    setQuantity(1);
  };

  const updateQuantity = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-b from-cream to-white">
        {/* Breadcrumb */}
        <div className="section-padding py-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-coffee hover:text-caramel transition-colors">
              Home
            </Link>
            <span className="text-coffee-light">/</span>
            <Link href="/products" className="text-coffee hover:text-caramel transition-colors">
              Products
            </Link>
            <span className="text-coffee-light">/</span>
            <span className="text-brown font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="section-padding pb-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-nude-light to-nude rounded-3xl overflow-hidden shadow-2xl mb-6 group">
                <div className="aspect-square flex items-center justify-center">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[150px]"
                  >
                    {productImages[currentImageIndex]}
                  </motion.div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === 0 ? productImages.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronLeft className="w-5 h-5 text-coffee" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    (prev + 1) % productImages.length
                  )}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronRight className="w-5 h-5 text-coffee" />
                </button>

                {/* Badge */}
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-caramel to-gold text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>BESTSELLER</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-xl overflow-hidden bg-nude-light aspect-square flex items-center justify-center transition-all ${
                      currentImageIndex === index 
                        ? "ring-2 ring-caramel shadow-lg scale-105" 
                        : "hover:ring-2 hover:ring-nude"
                    }`}
                  >
                    <span className="text-4xl">{img}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-caramel font-medium uppercase tracking-wider text-sm">
                  {product.category.name}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                  <span className="text-sm text-coffee ml-2">(47 reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-4xl font-bold text-coffee">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-coffee-light line-through">
                  {formatPrice(product.price * 1.3)}
                </span>
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  23% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-coffee leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Product Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-nude-light to-cream rounded-2xl p-4 flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-full">
                    <Clock className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <p className="text-xs text-coffee-light">Burn Time</p>
                    <p className="font-semibold text-brown">{product.burn_time}</p>
                  </div>
                </div>
                
                {product.scent && (
                  <div className="bg-gradient-to-br from-nude-light to-cream rounded-2xl p-4 flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-full">
                      <Flame className="w-5 h-5 text-caramel" />
                    </div>
                    <div>
                      <p className="text-xs text-coffee-light">Scent</p>
                      <p className="font-semibold text-brown">{product.scent}</p>
                    </div>
                  </div>
                )}
                
                <div className="bg-gradient-to-br from-nude-light to-cream rounded-2xl p-4 flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-full">
                    <Package className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <p className="text-xs text-coffee-light">Size</p>
                    <p className="font-semibold text-brown">{product.size || "Standard"}</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-nude-light to-cream rounded-2xl p-4 flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-full">
                    <Info className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <p className="text-xs text-coffee-light">Stock</p>
                    <p className="font-semibold text-green-600">{product.stock} available</p>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-6 mb-8">
                <span className="text-coffee font-medium">Quantity:</span>
                <div className="flex items-center space-x-0 bg-white rounded-full shadow-md">
                  <button
                    onClick={() => updateQuantity('decrease')}
                    className="p-3 hover:bg-nude-light rounded-l-full transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5 text-coffee" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-brown min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity('increase')}
                    className="p-3 hover:bg-nude-light rounded-r-full transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-5 h-5 text-coffee" />
                  </button>
                </div>
                <span className="text-sm text-coffee-light">
                  {product.stock} pieces available
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-coffee to-caramel text-white font-medium py-4 px-8 rounded-full hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </motion.button>
                
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <Heart className={`w-6 h-6 transition-colors ${
                    isLiked ? "fill-red-500 text-red-500" : "text-coffee"
                  }`} />
                </button>
                
                <button className="p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-all">
                  <Share2 className="w-6 h-6 text-coffee" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-coffee">
                  <Shield className="w-5 h-5 text-caramel" />
                  <span className="text-sm">100% Natural</span>
                </div>
                <div className="flex items-center space-x-2 text-coffee">
                  <Truck className="w-5 h-5 text-caramel" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-coffee">
                  <RefreshCw className="w-5 h-5 text-caramel" />
                  <span className="text-sm">Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20"
          >
            {/* Tab Headers */}
            <div className="flex space-x-1 bg-nude-light rounded-full p-1 max-w-fit mx-auto mb-12">
              {["description", "ingredients", "care", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-8 py-3 rounded-full font-medium transition-all capitalize ${
                    selectedTab === tab
                      ? "bg-gradient-to-r from-coffee to-caramel text-white shadow-lg"
                      : "text-coffee hover:bg-white/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
              >
                {selectedTab === "description" && (
                  <div className="prose max-w-none">
                    <h3 className="text-2xl font-serif font-bold text-brown mb-4">
                      About This Candle
                    </h3>
                    <p className="text-coffee leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <p className="text-coffee leading-relaxed">
                      Each Lumina Crafts candle is hand-poured in small batches to ensure the highest quality. 
                      The {product.name} features a carefully curated blend of premium fragrances that creates 
                      an ambiance of warmth and comfort in your space.
                    </p>
                  </div>
                )}
                
                {selectedTab === "ingredients" && (
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-brown mb-4">
                      Pure & Natural Ingredients
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-coffee">100% Natural Soy Wax - Clean burning and eco-friendly</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-coffee">Premium Cotton Wick - Even burn without soot</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-coffee">Essential Oil Blend - Natural fragrances without chemicals</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-coffee">No Parabens, Phthalates, or Synthetic Dyes</span>
                      </li>
                    </ul>
                  </div>
                )}
                
                {selectedTab === "care" && (
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-brown mb-4">
                      Candle Care Instructions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-brown mb-2">First Burn</h4>
                        <p className="text-coffee">
                          Allow the candle to burn for 2-3 hours on first use, or until the entire surface has melted.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brown mb-2">Trim the Wick</h4>
                        <p className="text-coffee">
                          Keep wick trimmed to 1/4 inch before each burn for optimal performance.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brown mb-2">Burn Time</h4>
                        <p className="text-coffee">
                          Never burn for more than 4 hours at a time. Allow to cool before relighting.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brown mb-2">Storage</h4>
                        <p className="text-coffee">
                          Store in a cool, dry place away from direct sunlight when not in use.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedTab === "shipping" && (
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-brown mb-4">
                      Shipping & Returns
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Truck className="w-5 h-5 text-caramel mt-0.5" />
                        <div>
                          <p className="font-semibold text-brown">Free Shipping</p>
                          <p className="text-coffee">On all orders above ₹1000</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Package className="w-5 h-5 text-caramel mt-0.5" />
                        <div>
                          <p className="font-semibold text-brown">Delivery Time</p>
                          <p className="text-coffee">3-5 business days across India</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <RefreshCw className="w-5 h-5 text-caramel mt-0.5" />
                        <div>
                          <p className="font-semibold text-brown">30-Day Returns</p>
                          <p className="text-coffee">Easy returns if you're not satisfied</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-20"
            >
              <h2 className="text-3xl font-serif font-bold text-center text-brown mb-12">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}