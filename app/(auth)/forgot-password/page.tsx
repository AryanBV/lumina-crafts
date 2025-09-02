"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsSubmitted(true);
        toast.success("Password reset link sent to your email!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-caramel to-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-brown mb-4">
          Check Your Email
        </h1>
        
        <p className="text-coffee mb-8">
          We've sent a password reset link to<br />
          <span className="font-semibold">{email}</span>
        </p>
        
        <div className="bg-nude-light rounded-2xl p-6 mb-8">
          <p className="text-sm text-coffee">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
              className="text-caramel hover:text-caramel-dark transition-colors font-medium"
            >
              try again
            </button>
          </p>
        </div>
        
        <Link
          href="/login"
          className="inline-flex items-center space-x-2 text-caramel hover:text-caramel-dark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to login</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Back Link */}
      <Link
        href="/login"
        className="inline-flex items-center space-x-2 text-coffee hover:text-caramel transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to login</span>
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-brown mb-2">
          Forgot Your Password?
        </h1>
        <p className="text-coffee">
          No worries! Enter your email and we'll send you reset instructions.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleResetPassword} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-coffee mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-coffee-light" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>Send Reset Link</span>
          )}
        </button>
      </form>

      {/* Additional Help */}
      <div className="mt-8 p-6 bg-nude-light rounded-2xl">
        <h3 className="font-semibold text-coffee mb-2">Need more help?</h3>
        <p className="text-sm text-coffee">
          If you're having trouble resetting your password, please contact our support team at{" "}
          <a href="mailto:hello@luminacrafts.in" className="text-caramel hover:text-caramel-dark">
            hello@luminacrafts.in
          </a>
        </p>
      </div>
    </motion.div>
  );
}