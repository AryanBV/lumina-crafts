"use client";

import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-nude via-cream to-nude-light">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #C4A574 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg"
          >
            {/* Candle Animation */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-8"
            >
              🕯️
            </motion.div>

            <h2 className="text-4xl font-serif font-bold text-brown mb-4">
              Illuminate Your Sacred Space
            </h2>
            <p className="text-xl text-coffee mb-8">
              Join our community of candle lovers and transform your home into a sanctuary
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "🌿 100% Natural Soy Wax",
                "✨ 40+ Hours Burn Time",
                "🎁 Free Shipping Above ₹1000",
                "💝 Exclusive Member Offers"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center justify-center text-coffee"
                >
                  <span className="text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl"
            >
              <p className="text-coffee italic mb-3">
                "The best candles I've ever purchased! The scents are divine and they last forever."
              </p>
              <p className="text-sm text-coffee font-semibold">
                - Priya S., Mumbai
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}