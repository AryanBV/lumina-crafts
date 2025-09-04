// app/(shop)/checkout/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Package, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOrder = async () => {
    setIsProcessing(true);
    
    // Simple COD order
    try {
      // Simulate order creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearCart();
      toast.success("Order placed successfully!");
      router.push("/order-confirmation?order=LMN-2025-TEST&method=cod");
    } catch (error) {
      toast.error("Failed to create order");
    } finally {
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
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <div className="section-padding py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h1 className="text-3xl font-serif font-bold text-brown mb-6">Checkout</h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-brown mb-4">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="text-coffee">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-coffee">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-nude">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-brown">Total:</span>
                  <span className="text-coffee">
                    {formatPrice(items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-nude-light rounded-xl p-4 mb-6">
              <p className="text-sm text-coffee">
                <strong>Note:</strong> Currently we only accept Cash on Delivery. 
                Online payment will be available soon.
              </p>
            </div>

            <button
              onClick={handleOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Place Order (Cash on Delivery)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}