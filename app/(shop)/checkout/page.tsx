// app/(shop)/checkout/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Script from "next/script";
import { 
  User, CreditCard, Check, 
  ArrowLeft, ArrowRight, Lock, Truck, Package,
  Mail, Phone, Home, Building,
  Shield,
  Smartphone, Wallet, CreditCard as CardIcon
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
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGuest, setIsGuest] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('cod'); // Default to COD
  
  // Form Data
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Price Calculations
  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 1000 ? 0 : shippingSpeed === 'express' ? 199 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shippingCost + tax;

  useEffect(() => {
    checkUser();
    // Default to COD if Razorpay is not configured
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      setPaymentMethod('cod');
    }
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setIsGuest(false);
      // Load saved addresses
      const { data: addresses } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id);
      
      if (addresses && addresses.length > 0) {
        setSavedAddresses(addresses);
        setSelectedAddressId(addresses.find(a => a.is_default)?.id || addresses[0].id);
      }
      
      // Pre-fill email
      setShippingAddress(prev => ({
        ...prev,
        email: user.email || "",
      }));
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!shippingAddress.name || !shippingAddress.email || !shippingAddress.phone ||
        !shippingAddress.addressLine1 || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.pincode) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(shippingAddress.phone.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    
    setCurrentStep(2);
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const createOrder = async (method: string) => {
    // For COD orders
    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shipping_address: selectedAddressId ? 
          savedAddresses.find(a => a.id === selectedAddressId) : 
          shippingAddress,
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        payment_method: method,
        user_id: user?.id || null,
        guest_email: isGuest ? shippingAddress.email : null,
        guest_name: isGuest ? shippingAddress.name : null,
        guest_phone: isGuest ? shippingAddress.phone : null,
      };

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const { orderNumber } = await response.json();
      
      clearCart();
      router.push(`/order-confirmation?order=${orderNumber}&method=${method}`);
    } catch (error) {
      toast.error("Failed to create order");
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === 'cod') {
      // Handle Cash on Delivery
      await createOrder('cod');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Check if the public Razorpay key is defined
      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        toast.error("Online payment is not configured. Please choose Cash on Delivery.");
        setIsProcessing(false);
        return;
      }
      
      // Initialize Razorpay
      const res = await initializeRazorpay();
      if (!res) {
        toast.error("Razorpay SDK failed to load");
        setIsProcessing(false);
        return;
      }

      // Create order in backend
      const orderData = {
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shipping_address: selectedAddressId ? 
          savedAddresses.find(a => a.id === selectedAddressId) : 
          shippingAddress,
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        user_id: user?.id || null,
        guest_email: isGuest ? shippingAddress.email : null,
        guest_name: isGuest ? shippingAddress.name : null,
        guest_phone: isGuest ? shippingAddress.phone : null,
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
            router.push(`/order-confirmation?order=${orderNumber}`);
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
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-40">
          <div className="section-padding py-4">
            <div className="flex items-center justify-between">
              {/* Steps Indicator */}
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { step: 1, label: "Shipping", icon: Truck },
                  { step: 2, label: "Payment", icon: CreditCard },
                  { step: 3, label: "Confirm", icon: Check },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div className={`flex items-center space-x-2 ${
                      currentStep >= item.step ? 'text-caramel' : 'text-coffee-light'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep >= item.step 
                          ? 'bg-gradient-to-r from-caramel to-gold text-white' 
                          : 'bg-nude text-coffee'
                      }`}>
                        {currentStep > item.step ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          item.step
                        )}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {index < 2 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > item.step ? 'bg-caramel' : 'bg-nude'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Security Badge */}
              <div className="flex items-center space-x-2 text-coffee">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-padding py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Shipping Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl shadow-xl p-8"
                  >
                    <h2 className="text-2xl font-serif font-bold text-brown mb-6">
                      Shipping Information
                    </h2>

                    {/* Guest/Login Toggle */}
                    {!user && (
                      <div className="mb-6 p-4 bg-nude-light rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium text-brown">Already have an account?</p>
                            <p className="text-sm text-coffee">Sign in for faster checkout</p>
                          </div>
                          <Link
                            href={`/login?redirect=/checkout`}
                            className="px-4 py-2 bg-white text-caramel font-medium rounded-full hover:shadow-md transition-all"
                          >
                            Sign In
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Address Form */}
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
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

                      {/* Rest of the address fields */}
                      <div>
                        <label className="block text-sm font-medium text-coffee mb-2">
                          Address Line 1 *
                        </label>
                        <div className="relative">
                          <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-light" />
                          <input
                            type="text"
                            value={shippingAddress.addressLine1}
                            onChange={(e) => setShippingAddress({...shippingAddress, addressLine1: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel"
                            placeholder="House/Flat No, Building Name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-coffee mb-2">
                          Address Line 2 (Optional)
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-light" />
                          <input
                            type="text"
                            value={shippingAddress.addressLine2}
                            onChange={(e) => setShippingAddress({...shippingAddress, addressLine2: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel"
                            placeholder="Street, Landmark"
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
                            {/* Add more states as needed */}
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

                      {/* Shipping Speed */}
                      <div className="mt-6">
                        <h3 className="font-medium text-brown mb-3">Shipping Speed</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            shippingSpeed === 'standard' 
                              ? 'border-caramel bg-nude-light' 
                              : 'border-nude hover:border-coffee'
                          }`}>
                            <input
                              type="radio"
                              name="shipping"
                              value="standard"
                              checked={shippingSpeed === 'standard'}
                              onChange={() => setShippingSpeed('standard')}
                              className="sr-only"
                            />
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-brown">Standard Delivery</p>
                                <p className="text-sm text-coffee">3-5 business days</p>
                              </div>
                              <p className="font-bold text-coffee">
                                {subtotal > 1000 ? 'FREE' : formatPrice(99)}
                              </p>
                            </div>
                          </label>
                          
                          <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            shippingSpeed === 'express' 
                              ? 'border-caramel bg-nude-light' 
                              : 'border-nude hover:border-coffee'
                          }`}>
                            <input
                              type="radio"
                              name="shipping"
                              value="express"
                              checked={shippingSpeed === 'express'}
                              onChange={() => setShippingSpeed('express')}
                              className="sr-only"
                            />
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-brown">Express Delivery</p>
                                <p className="text-sm text-coffee">1-2 business days</p>
                              </div>
                              <p className="font-bold text-coffee">{formatPrice(199)}</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Continue Button */}
                      <div className="flex justify-between pt-6">
                        <Link
                          href="/cart"
                          className="flex items-center space-x-2 text-coffee hover:text-caramel transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          <span>Back to Cart</span>
                        </Link>
                        
                        <button
                          type="submit"
                          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-lg transition-all"
                        >
                          <span>Continue to Payment</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl shadow-xl p-8"
                  >
                    <h2 className="text-2xl font-serif font-bold text-brown mb-6">
                      Payment Method
                    </h2>

                    {/* Payment Options */}
                    <div className="space-y-4 mb-8">
                      {/* Online Payment */}
                      <label className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'online' 
                          ? 'border-caramel bg-gradient-to-br from-nude-light to-cream' 
                          : 'border-nude hover:border-coffee'
                      } ${!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input
                          type="radio"
                          name="payment"
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={() => process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && setPaymentMethod('online')}
                          className="sr-only"
                          disabled={!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}
                        />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <Smartphone className="w-6 h-6 text-caramel" />
                              </div>
                              <div>
                                <p className="font-semibold text-brown">Pay Online</p>
                                <p className="text-sm text-coffee">
                                  {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID 
                                    ? "UPI, Cards, Net Banking, Wallets" 
                                    : "Currently unavailable"}
                                </p>
                              </div>
                            </div>
                            {paymentMethod === 'online' && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && (
                              <Check className="w-6 h-6 text-caramel" />
                            )}
                          </div>
                        </div>
                      </label>

                      {/* Add this notice if Razorpay is not configured */}
                      {!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                          <p className="text-sm text-yellow-800">
                            Online payments will be available soon. Please use Cash on Delivery for now.
                          </p>
                        </div>
                      )}

                      {/* Cash on Delivery */}
                      <label className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'cod' 
                          ? 'border-caramel bg-gradient-to-br from-nude-light to-cream' 
                          : 'border-nude hover:border-coffee'
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-caramel" />
                            </div>
                            <div>
                              <p className="font-semibold text-brown">Cash on Delivery</p>
                              <p className="text-sm text-coffee">Pay when you receive</p>
                            </div>
                          </div>
                          {paymentMethod === 'cod' && (
                            <Check className="w-6 h-6 text-caramel" />
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Security Features */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <div className="flex items-center space-x-3 text-coffee">
                        <Shield className="w-5 h-5 text-caramel" />
                        <span className="text-sm">100% Secure</span>
                      </div>
                      <div className="flex items-center space-x-3 text-coffee">
                        <Lock className="w-5 h-5 text-caramel" />
                        <span className="text-sm">SSL Encrypted</span>
                      </div>
                      <div className="flex items-center space-x-3 text-coffee">
                        <Check className="w-5 h-5 text-caramel" />
                        <span className="text-sm">Verified Merchant</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center space-x-2 text-coffee hover:text-caramel transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Shipping</span>
                      </button>
                      
                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            <span>
                              {paymentMethod === 'cod' ? 'Place Order' : `Pay ${formatPrice(total)}`}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-32">
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
                    <span className="flex items-center space-x-1">
                      <Truck className="w-4 h-4" />
                      <span>Shipping</span>
                    </span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}