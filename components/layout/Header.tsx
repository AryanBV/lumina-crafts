"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User, Search, Flame, Trash2, ChevronRight } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  
  const cartItems = useCartStore((state) => state.items);
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const cartTotal = useCartStore((state) => state.getTotalPrice());
  const removeItem = useCartStore((state) => state.removeItem);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Error signing out: " + error.message);
        return;
      }
      toast.success("Signed out successfully");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error("Error signing out: " + error.message);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
  ];

  const freeShippingThreshold = 1000;
  const shippingProgress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);

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
            <Link href="/" className="group flex items-center space-x-2">
              <div className="relative">
                <Image
                  src="/images/Lumina-logo.png"
                  alt="Lumina Crafts Logo"
                  width={45}
                  height={45}
                  className="object-contain"
                />
              </div>
              <div className="relative">
                <Image
                  src="/images/Lumina-logo-name.png"
                  alt="Lumina Crafts"
                  width={140}
                  height={35}
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Simplified */}
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
              <Link
                href="/track-order"
                className="relative group py-2"
              >
                <span className="text-coffee font-medium group-hover:text-caramel transition-colors">
                  Track Order
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-caramel to-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <button className="p-2.5 hover:bg-nude-light rounded-full transition-all duration-200 group">
                <Search className="w-5 h-5 text-coffee group-hover:text-caramel transition-colors" />
              </button>
              
              {/* User Menu */}
              <div className="relative group">
                {user ? (
                  <button 
                    className="p-2.5 hover:bg-nude-light rounded-full transition-all duration-200 group"
                  >
                    <User className="w-5 h-5 text-coffee group-hover:text-caramel transition-colors" />
                  </button>
                ) : (
                  <Link 
                    href="/login" 
                    className="p-2.5 hover:bg-nude-light rounded-full transition-all duration-200 group"
                  >
                    <User className="w-5 h-5 text-coffee group-hover:text-caramel transition-colors" />
                  </Link>
                )}
                
                {/* User Dropdown */}
                {user && (
                  <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-2 border border-nude">
                      <div className="px-4 py-3 border-b border-nude">
                        <p className="text-sm font-medium text-brown truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link href="/profile" className="block px-4 py-2 text-coffee hover:bg-nude-light rounded-xl transition-colors">
                        My Account
                      </Link>
                      <Link href="/profile/orders" className="block px-4 py-2 text-coffee hover:bg-nude-light rounded-xl transition-colors">
                        Orders
                      </Link>
                      <Link href="/profile/wishlist" className="block px-4 py-2 text-coffee hover:bg-nude-light rounded-xl transition-colors">
                        Wishlist
                      </Link>
                      <hr className="my-2 border-nude" />
                      <button 
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-coffee hover:bg-nude-light rounded-xl transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart with Preview - Same as before */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
              >
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

                {/* Cart Preview Dropdown - Same as before */}
                {isCartHovered && cartItems.length > 0 && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl p-6 z-50 border border-nude">
                    {/* Free Shipping Progress */}
                    {cartTotal < freeShippingThreshold && (
                      <div className="mb-4 p-3 bg-nude-light rounded-xl">
                        <p className="text-sm text-coffee mb-2">
                          Add {formatPrice(freeShippingThreshold - cartTotal)} more for free shipping!
                        </p>
                        <div className="w-full bg-nude rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-caramel to-gold h-2 rounded-full transition-all duration-300"
                            style={{ width: `${shippingProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Cart Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cartItems.slice(0, 3).map((item) => (
                        <div key={item.product.id} className="flex items-center space-x-3">
                          <div className="w-16 h-16 bg-nude rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🕯️</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-brown text-sm">{item.product.name}</h4>
                            <p className="text-coffee text-sm">
                              {item.quantity} × {formatPrice(item.product.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              removeItem(item.product.id);
                              toast.success("Item removed from cart");
                            }}
                            className="p-1 hover:bg-nude-light rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-coffee-light" />
                          </button>
                        </div>
                      ))}
                      {cartItems.length > 3 && (
                        <p className="text-sm text-coffee text-center">
                          +{cartItems.length - 3} more items
                        </p>
                      )}
                    </div>

                    {/* Cart Footer */}
                    <div className="mt-4 pt-4 border-t border-nude">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold text-brown">Total:</span>
                        <span className="font-bold text-xl text-coffee">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/cart"
                          className="text-center px-4 py-2 border border-coffee text-coffee rounded-full hover:bg-nude-light transition-colors text-sm font-medium"
                        >
                          View Cart
                        </Link>
                        <Link
                          href="/checkout"
                          className="text-center px-4 py-2 bg-gradient-to-r from-coffee to-caramel text-white rounded-full hover:shadow-lg transition-all text-sm font-medium flex items-center justify-center space-x-1"
                        >
                          <span>Checkout</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
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
            <Link
              href="/track-order"
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-medium text-coffee hover:text-caramel transition-colors"
            >
              Track Order
            </Link>
            <div className="pt-6 border-t border-nude">
              {user ? (
                <div className="space-y-4">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-coffee hover:text-caramel transition-colors"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-medium text-coffee hover:text-caramel transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-coffee to-caramel text-white py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200"
                >
                  Sign In / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}