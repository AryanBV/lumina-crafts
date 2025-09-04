// app/(shop)/checkout/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import Script from "next/script";
import { 
  Package, ArrowLeft, CreditCard, Lock, Shield,
  Smartphone, User, Mail, Phone, Home
} from "lucide-react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Price calculations
  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 1000 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shippingCost + tax;

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Validate form
    if (!shippingAddress.name || !shippingAddress.email || !shippingAddress.phone || 
        !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || 
        !shippingAddress.pincode) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(shippingAddress.phone.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Initialize Razorpay
      const res = await initializeRazorpay();
      if (!res) {
        toast.error("Payment system failed to load");
        setIsProcessing(false);
        return;
      }

      // Create order data
      const orderData = {
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shipping_address: shippingAddress,
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        guest_email: shippingAddress.email,
        guest_name: shippingAddress.name,
        guest_phone: shippingAddress.phone,
      };

      // Call API to create Razorpay order
      const response = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const { orderId, orderNumber, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }

      // Razorpay payment options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(total * 100), // Amount in paise
        currency: "INR",
        name: "Lumina Crafts",
        description: `Order #${orderNumber}`,
        image: "/logo.png",
        order_id: orderId,
        handler: async function (response: any) {
          // Payment successful - verify on backend
          const verifyResponse = await fetch('/api/checkout/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_number: orderNumber,
            }),
          });

          const { success } = await verifyResponse.json();
          
          if (success) {
            clearCart();
            router.push(`/order-confirmation?order=${orderNumber}&method=online`);
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: "#8B7355",
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast.error("Payment cancelled");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-20 h-20 text-coffee-light mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-brown mb-4">Your cart is empty</h2>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-coffee to-caramel text-white rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-cream to-white">
        <div className="section-padding py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl shadow-xl p-8"
                >
                  <h1 className="text-3xl font-serif font-bold text-brown mb-6">Secure Checkout</h1>

                  {/* Shipping Form */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-brown">Shipping Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-coffee mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-light" />
                          <input
                            type="text"
                            value={shippingAddress.name}
                            onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-light" />
                          <input
                            type="email"
                            value={shippingAddress.email}
                            onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee mb-2">
                        Mobile Number * (10 digits)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-light" />
                        <input
                          type="tel"
                          value={shippingAddress.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setShippingAddress({...shippingAddress, phone: value});
                          }}
                          className="w-full pl-12 pr-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel"
                          placeholder="9876543210"
                          pattern="[6-9]{1}[0-9]{9}"
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee mb-2">
                        Complete Address *
                      </label>
                      <div className="relative">
                        <Home className="absolute left-4 top-4 w-5 h-5 text-coffee-light" />
                        <textarea
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-nude focus:outline-none focus:border-caramel"
                          placeholder="House/Flat No, Building Name, Street, Area"
                          rows={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-coffee mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="w-full px-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel"
                          placeholder="Mumbai"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee mb-2">
                          State *
                        </label>
                        <select
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          className="w-full px-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-coffee mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.pincode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setShippingAddress({...shippingAddress, pincode: value});
                          }}
                          className="w-full px-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel"
                          placeholder="400001"
                          pattern="[0-9]{6}"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="pt-6 border-t border-nude">
                      <h3 className="text-lg font-semibold text-brown mb-4">Payment Method</h3>
                      
                      <div className="bg-gradient-to-br from-nude-light to-cream rounded-2xl p-6 border-2 border-caramel">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-caramel" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-brown">Secure Online Payment</p>
                            <p className="text-sm text-coffee">Pay securely with UPI, Cards, Net Banking, or Wallets</p>
                          </div>
                          <CreditCard className="w-8 h-8 text-caramel" />
                        </div>
                      </div>

                      {/* Security badges */}
                      <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-coffee">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4 text-caramel" />
                          <span>100% Secure</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Lock className="w-4 h-4 text-caramel" />
                          <span>SSL Encrypted</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-6">
                      <Link
                        href="/cart"
                        className="flex items-center space-x-2 text-coffee hover:text-caramel transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Cart</span>
                      </Link>
                      
                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-coffee to-caramel text-white font-semibold rounded-full hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            <span>Pay {formatPrice(total)}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-3xl shadow-xl p-6 sticky top-8"
                >
                  <h3 className="text-xl font-serif font-bold text-brown mb-4">
                    Order Summary
                  </h3>

                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-nude rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🕯️</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-brown text-sm">{item.product.name}</h4>
                          <p className="text-coffee text-sm">
                            Qty: {item.quantity} × {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <p className="font-medium text-coffee">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 py-6 border-y border-nude">
                    <div className="flex justify-between text-coffee">
                      <span>Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-coffee">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-coffee">
                      <span>GST (18%)</span>
                      <span className="font-medium">{formatPrice(tax)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-6">
                    <span className="text-xl font-semibold text-brown">Total</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-coffee">{formatPrice(total)}</p>
                      <p className="text-xs text-coffee-light">Including GST</p>
                    </div>
                  </div>

                  {subtotal > 1000 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        🎉 You saved {formatPrice(99)} on shipping!
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}