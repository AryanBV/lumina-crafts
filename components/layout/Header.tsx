"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User, Search, Flame, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  
  // Get cart data from Zustand store
  const { items, getTotalItems, getTotalPrice, removeItem } = useCartStore();
  const cartItemsCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-nude to-nude-light text-center py-2.5 text-sm font-medium text-coffee border-b border-nude-dark">
        <p className="flex items-center justify-center gap-2">
          <Flame className="w-4 h-4 text-caramel animate-pulse" />
          <span>Free shipping on orders above ₹1000 | Handcrafted with love</span>
          <Flame className="w-4 h-4 text-caramel animate-pulse" />
        </p>
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300 bg-white",
        isScrolled 
          ? "shadow-lg py-3" 
          : "py-5"
      )}>
        <nav className="section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-caramel to-gold rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-caramel to-gold p-2 rounded-full">
                  <Flame className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-gradient">
                  Lumina Crafts
                </h1>
                <p className="text-xs text-coffee-light tracking-widest uppercase">Premium Candles</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group py-2"
                >
                  <span className="text-coffee font-medium group-hover:text-caramel transition-colors">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-caramel to-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <button className="p-2.5 hover:bg-nude-light rounded-full transition-all duration-200 group">
                <Search className="w-5 h-5 text-coffee group-hover:text-caramel transition-colors" />
              </button>
              
              {/* User */}
              <Link 
                href="/login" 
                className="p-2.5 hover:bg-nude-light rounded-full transition-all duration-200 group"
              >
                <User className="w-5 h-5 text-coffee group-hover:text-caramel transition-colors" />
              </Link>

              {/* Cart with Preview */}
              <div 
                className="relative"
                onMouseEnter={() => setShowCartPreview(true)}
                onMouseLeave={() => setShowCartPreview(false)}
              >
                <Link 
                  href="/cart" 
                  className="relative p-2.5 hover:bg-nude-light rounded-full transition-all duration-200 group"
                >
                  <ShoppingBag className="w-5 h-5 text-coffee group-hover:text-caramel transition-colors" />
                  <AnimatePresence>
                    {cartItemsCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-caramel to-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                      >
                        {cartItemsCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>

                {/* Cart Preview Dropdown */}
                <AnimatePresence>
                  {showCartPreview && cartItemsCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-nude to-nude-light p-4 border-b border-nude">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-brown">
                            Cart ({cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'})
                          </h3>
                          <Link
                            href="/cart"
                            className="text-sm text-caramel hover:text-caramel-dark transition-colors font-medium"
                          >
                            View All
                          </Link>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="max-h-80 overflow-y-auto p-4">
                        {items.slice(0, 3).map((item) => (
                          <div key={item.product.id} className="flex items-center space-x-3 mb-4 pb-4 border-b border-nude-light last:border-0">
                            {/* Product Image */}
                            <div className="w-16 h-16 bg-gradient-to-br from-nude-light to-nude rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl">🕯️</span>
                            </div>
                            
                            {/* Product Info */}
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-brown line-clamp-1">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-coffee-light">
                                {item.quantity} x {formatPrice(item.product.price)}
                              </p>
                            </div>
                            
                            {/* Price */}
                            <div className="text-right">
                              <p className="text-sm font-semibold text-coffee">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                removeItem(item.product.id);
                              }}
                              className="p-1 hover:bg-red-50 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ))}
                        
                        {items.length > 3 && (
                          <p className="text-center text-sm text-coffee-light mt-2">
                            +{items.length - 3} more items
                          </p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="bg-gradient-to-r from-nude-light to-cream p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-medium text-brown">Subtotal:</span>
                          <span className="text-xl font-bold text-coffee">
                            {formatPrice(getTotalPrice())}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/cart"
                            className="px-4 py-2 border-2 border-coffee text-coffee font-medium rounded-full hover:bg-nude-light transition-all text-center text-sm"
                          >
                            View Cart
                          </Link>
                          <Link
                            href="/checkout"
                            className="px-4 py-2 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-lg transition-all text-center text-sm flex items-center justify-center space-x-1"
                          >
                            <span>Checkout</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                        
                        {getTotalPrice() < 1000 && (
                          <p className="text-xs text-coffee-light text-center mt-3">
                            Add {formatPrice(1000 - getTotalPrice())} more for free shipping!
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty Cart Preview */}
                <AnimatePresence>
                  {showCartPreview && cartItemsCount === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl p-6 z-50"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-nude-light rounded-full mx-auto mb-3 flex items-center justify-center">
                          <ShoppingBag className="w-8 h-8 text-coffee" />
                        </div>
                        <p className="text-coffee font-medium mb-2">Your cart is empty</p>
                        <p className="text-sm text-coffee-light mb-4">
                          Add some candles to brighten your space!
                        </p>
                        <Link
                          href="/products"
                          className="inline-flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-lg transition-all text-sm"
                        >
                          <span>Shop Now</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 hover:bg-nude-light rounded-full transition-all duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-coffee" />
                ) : (
                  <Menu className="w-5 h-5 text-coffee" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-nude shadow-xl"
            >
              <div className="px-6 py-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-coffee hover:text-caramel transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Cart Summary for Mobile */}
                {cartItemsCount > 0 && (
                  <div className="pt-6 border-t border-nude">
                    <Link
                      href="/cart"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-nude-light to-cream rounded-2xl"
                    >
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="w-5 h-5 text-coffee" />
                        <span className="font-medium text-brown">
                          Cart ({cartItemsCount})
                        </span>
                      </div>
                      <span className="font-bold text-coffee">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </Link>
                  </div>
                )}
                
                <div className="pt-6 border-t border-nude">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-coffee to-caramel text-white py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Sign In / Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}