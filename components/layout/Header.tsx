"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User, Search, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemsCount] = useState(0);

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

              {/* Cart */}
              <Link 
                href="/cart" 
                className="relative p-2.5 hover:bg-nude-light rounded-full transition-all duration-200 group"
              >
                <ShoppingBag className="w-5 h-5 text-coffee group-hover:text-caramel transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-caramel to-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

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
        <div className={cn(
          "lg:hidden fixed inset-x-0 bg-white border-t border-nude shadow-xl transition-all duration-300 ease-in-out",
          isMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-full pointer-events-none"
        )}>
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
            <div className="pt-6 border-t border-nude">
              <Link
                href="/login"
                className="block w-full text-center bg-gradient-to-r from-coffee to-caramel text-white py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200"
              >
                Sign In / Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}