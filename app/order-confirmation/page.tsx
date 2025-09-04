"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  CheckCircle, Package, Truck, Mail, Copy, 
  ArrowRight, Gift, MessageCircle, Loader2 
} from "lucide-react";
import toast from "react-hot-toast";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  
  const orderNumber = searchParams.get("order") || "LMN-2025-0001";
  const paymentMethod = searchParams.get("method") || "online";

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#8B7355', '#C4A574', '#D4AF37', '#E8DCC4']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#8B7355', '#C4A574', '#D4AF37', '#E8DCC4']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    toast.success("Order number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <div className="section-padding py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                delay: 0.2 
              }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
              Order Confirmed!
            </h1>

            <p className="text-xl text-coffee mb-8">
              Thank you for your purchase. We're preparing your candles with love!
            </p>

            <div className="bg-gradient-to-r from-nude to-nude-light rounded-2xl p-6 mb-8">
              <p className="text-sm text-coffee-light mb-2">Your Order Number</p>
              <div className="flex items-center justify-center space-x-3">
                <p className="text-2xl font-bold text-brown">{orderNumber}</p>
                <button
                  onClick={copyOrderNumber}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <Copy className={`w-5 h-5 ${copied ? 'text-green-600' : 'text-coffee'}`} />
                </button>
              </div>
              <p className="text-sm text-coffee-light mt-2">
                {paymentMethod === 'cod' ? 'Pay on delivery' : 'Payment successful'}
              </p>
            </div>

            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-brown mb-4 text-center">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-nude rounded-lg">
                    <Mail className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <p className="font-medium text-brown">Order Confirmation Email</p>
                    <p className="text-sm text-coffee">We've sent order details to your email</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-nude rounded-lg">
                    <Package className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <p className="font-medium text-brown">Packing Your Order</p>
                    <p className="text-sm text-coffee">We'll carefully pack your candles within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-nude rounded-lg">
                    <Truck className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <p className="font-medium text-brown">Shipping Update</p>
                    <p className="text-sm text-coffee">You'll receive tracking details once shipped</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gold/20 to-caramel/20 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Gift className="w-5 h-5 text-caramel" />
                <p className="font-semibold text-brown">Special Offer Just for You!</p>
              </div>
              <p className="text-coffee mb-4">
                Get 15% off your next purchase with code
              </p>
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <p className="text-2xl font-bold text-caramel">THANKYOU15</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/track-order"
                className="px-8 py-4 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Track Order</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/products"
                className="px-8 py-4 border-2 border-coffee text-coffee font-medium rounded-full hover:bg-nude-light transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-nude">
              <p className="text-coffee mb-4">Have questions about your order?</p>
              
                href={`https://wa.me/919845853903?text=Hi! I just placed order ${orderNumber} and have a question.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-coffee" />
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}