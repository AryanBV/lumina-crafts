"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { 
  ShoppingBag, Trash2, Minus, Plus, ArrowLeft, ArrowRight,
  Truck, Shield, Gift, Tag, X, Info, Package, Heart,
  CheckCircle, Sparkles
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 1000 ? 0 : 99;
  const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    
    setIsApplyingCoupon(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (couponCode.toUpperCase() === "LUMINA10") {
      setAppliedCoupon(couponCode);
      toast.success("Coupon applied! You saved 10%", {
        icon: <CheckCircle className="w-5 h-5" />,
        style: {
          background: '#8B7355',
          color: 'white',
        },
      });
    } else {
      toast.error("Invalid coupon code", {
        style: {
          background: '#DC2626',
          color: 'white',
        },
      });
    }
    
    setIsApplyingCoupon(false);
    setCouponCode("");
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from cart`, {
      style: {
        background: '#8B7355',
        color: 'white',
      },
    });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast.success("Cart cleared", {
        style: {
          background: '#8B7355',
          color: 'white',
        },
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-white">
        <div className="section-padding py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <div className="w-32 h-32 bg-gradient-to-br from-nude-light to-nude rounded-full mx-auto mb-8 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-coffee" />
              </div>
              
              <h1 className="text-4xl font-serif font-bold text-brown mb-4">
                Your Cart is Empty
              </h1>
              
              <p className="text-lg text-coffee mb-8">
                Looks like you haven't added any candles to your cart yet.
                Explore our collection and find your perfect scent!
              </p>
              
              <Link
                href="/products"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Continue Shopping</span>
              </Link>
              
              {/* Suggestions */}
              <div className="mt-12 grid grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <Sparkles className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-coffee">New Arrivals</p>
                </div>
                <div className="p-4">
                  <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-sm text-coffee">Bestsellers</p>
                </div>
                <div className="p-4">
                  <Gift className="w-8 h-8 text-caramel mx-auto mb-2" />
                  <p className="text-sm text-coffee">Gift Sets</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-b from-cream to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-b from-nude to-cream py-12">
          <div className="section-padding">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown text-center mb-4">
              Shopping Cart
            </h1>
            <p className="text-center text-coffee">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="section-padding py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Action Bar */}
              <div className="flex justify-between items-center mb-6">
                <Link
                  href="/products"
                  className="flex items-center space-x-2 text-coffee hover:text-caramel transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Continue Shopping</span>
                </Link>
                
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {/* Cart Items List */}
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="w-32 h-32 bg-gradient-to-br from-nude-light to-nude rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-5xl">🕯️</span>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-brown mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-coffee-light mb-2">
                              {item.product.category.name} • {item.product.scent}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-coffee">
                              <span className="flex items-center space-x-1">
                                <Package className="w-4 h-4" />
                                <span>{item.product.size}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Info className="w-4 h-4" />
                                <span>{item.product.burn_time}</span>
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                            className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                          >
                            <Trash2 className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-0 bg-nude-light rounded-full">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 hover:bg-nude rounded-l-full transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-coffee" />
                            </button>
                            <span className="px-4 py-2 font-medium text-brown min-w-[50px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-nude rounded-r-full transition-colors"
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="w-4 h-4 text-coffee" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-2xl font-bold text-coffee">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <p className="text-sm text-coffee-light">
                              {formatPrice(item.product.price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-br from-nude-light to-cream rounded-2xl p-4 text-center">
                  <Truck className="w-6 h-6 text-caramel mx-auto mb-2" />
                  <p className="text-sm font-medium text-brown">Free Shipping</p>
                  <p className="text-xs text-coffee-light">Orders above ₹1000</p>
                </div>
                <div className="bg-gradient-to-br from-nude-light to-cream rounded-2xl p-4 text-center">
                  <Shield className="w-6 h-6 text-caramel mx-auto mb-2" />
                  <p className="text-sm font-medium text-brown">Secure Payment</p>
                  <p className="text-xs text-coffee-light">100% Protected</p>
                </div>
                <div className="bg-gradient-to-br from-nude-light to-cream rounded-2xl p-4 text-center">
                  <Gift className="w-6 h-6 text-caramel mx-auto mb-2" />
                  <p className="text-sm font-medium text-brown">Gift Wrapping</p>
                  <p className="text-xs text-coffee-light">Available</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl p-8 sticky top-24"
              >
                <h2 className="text-2xl font-serif font-bold text-brown mb-6">
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-coffee mb-2 block">
                    Have a coupon code?
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel transition-colors"
                      disabled={!!appliedCoupon}
                    />
                    {appliedCoupon ? (
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          toast.success("Coupon removed");
                        }}
                        className="px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponCode}
                        className="px-6 py-3 bg-gradient-to-r from-coffee to-caramel text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isApplyingCoupon ? "..." : "Apply"}
                      </button>
                    )}
                  </div>
                  {appliedCoupon && (
                    <p className="text-green-600 text-sm mt-2 flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Coupon "{appliedCoupon}" applied!</span>
                    </p>
                  )}
                  {!appliedCoupon && (
                    <p className="text-xs text-coffee-light mt-2">
                      Try "LUMINA10" for 10% off
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 pb-6 border-b border-nude">
                  <div className="flex justify-between text-coffee">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <span>Discount (10%)</span>
                      </span>
                      <span className="font-medium">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-coffee">
                    <span className="flex items-center space-x-1">
                      <Truck className="w-4 h-4" />
                      <span>Shipping</span>
                    </span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-coffee-light">
                      Add {formatPrice(1000 - subtotal)} more for free shipping
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-6">
                  <span className="text-xl font-semibold text-brown">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-coffee">{formatPrice(total)}</p>
                    <p className="text-xs text-coffee-light">Including GST</p>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-gradient-to-r from-coffee to-caramel text-white font-medium py-4 rounded-full hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-nude">
                  <p className="text-sm text-coffee-light text-center mb-3">
                    We accept
                  </p>
                  <div className="flex justify-center space-x-3">
                    <div className="w-12 h-8 bg-nude-light rounded flex items-center justify-center text-xs font-bold text-coffee">
                      VISA
                    </div>
                    <div className="w-12 h-8 bg-nude-light rounded flex items-center justify-center text-xs font-bold text-coffee">
                      MC
                    </div>
                    <div className="w-12 h-8 bg-nude-light rounded flex items-center justify-center text-xs font-bold text-coffee">
                      UPI
                    </div>
                    <div className="w-12 h-8 bg-nude-light rounded flex items-center justify-center text-xs font-bold text-coffee">
                      NB
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}