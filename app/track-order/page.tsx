"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Package, Truck, CheckCircle, MapPin, 
  Clock, Calendar, Phone, Copy, ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingId || !email) {
      toast.error("Please enter both order ID and email");
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock order details
    if (trackingId === "LMN-2025-0001" && email === "test@example.com") {
      setOrderDetails({
        orderId: "LMN-2025-0001",
        status: "in_transit",
        orderDate: "January 20, 2025",
        expectedDelivery: "January 25, 2025",
        items: [
          { name: "Vanilla Dream Candle", quantity: 2, price: 599 },
          { name: "Lavender Fields Candle", quantity: 1, price: 699 }
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123, MG Road",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560001"
        },
        trackingNumber: "SF6789012345",
        courier: "Shiprocket",
        timeline: [
          { date: "Jan 20, 2025", time: "10:30 AM", status: "Order Placed", completed: true },
          { date: "Jan 20, 2025", time: "03:45 PM", status: "Order Confirmed", completed: true },
          { date: "Jan 21, 2025", time: "09:15 AM", status: "Packed & Ready", completed: true },
          { date: "Jan 21, 2025", time: "06:30 PM", status: "Shipped", completed: true },
          { date: "Jan 23, 2025", time: "11:00 AM", status: "In Transit", completed: true, current: true },
          { date: "Jan 25, 2025", time: "Expected", status: "Out for Delivery", completed: false },
          { date: "Jan 25, 2025", time: "Expected", status: "Delivered", completed: false }
        ]
      });
    } else {
      toast.error("Order not found. Please check your order ID and email.");
    }
    
    setIsSearching(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "delivered": return "text-green-600 bg-green-50";
      case "in_transit": return "text-blue-600 bg-blue-50";
      case "shipped": return "text-purple-600 bg-purple-50";
      case "processing": return "text-yellow-600 bg-yellow-50";
      case "cancelled": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case "delivered": return "Delivered";
      case "in_transit": return "In Transit";
      case "shipped": return "Shipped";
      case "processing": return "Processing";
      case "cancelled": return "Cancelled";
      default: return "Pending";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nude via-cream to-nude-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #8B7355 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="section-padding py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Package className="w-16 h-16 text-caramel mx-auto mb-6" />
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brown mb-6">
              Track Your Order
            </h1>
            
            <p className="text-xl text-coffee mb-8">
              Enter your order details below to see real-time tracking information
            </p>

            {/* Track Form */}
            <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-coffee mb-2">
                      Order ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., LMN-2025-0001"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-nude focus:outline-none focus:border-caramel transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-coffee mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-nude focus:outline-none focus:border-caramel transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full px-8 py-4 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Track Order</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-coffee-light mt-4">
                  Demo: Try order ID "LMN-2025-0001" with email "test@example.com"
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Order Details */}
      <AnimatePresence>
        {orderDetails && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="section-padding py-20"
          >
            <div className="max-w-6xl mx-auto">
              {/* Order Header */}
              <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-brown mb-2">
                      Order {orderDetails.orderId}
                    </h2>
                    <p className="text-coffee">Placed on {orderDetails.orderDate}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-medium ${getStatusColor(orderDetails.status)}`}>
                    {getStatusLabel(orderDetails.status)}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-3">
                    <Truck className="w-5 h-5 text-caramel mt-1" />
                    <div>
                      <p className="text-sm text-coffee-light">Courier Partner</p>
                      <p className="font-medium text-brown">{orderDetails.courier}</p>
                      <button
                        onClick={() => copyToClipboard(orderDetails.trackingNumber)}
                        className="flex items-center space-x-1 text-sm text-caramel hover:text-caramel-dark mt-1"
                      >
                        <span>{orderDetails.trackingNumber}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-caramel mt-1" />
                    <div>
                      <p className="text-sm text-coffee-light">Expected Delivery</p>
                      <p className="font-medium text-brown">{orderDetails.expectedDelivery}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-caramel mt-1" />
                    <div>
                      <p className="text-sm text-coffee-light">Delivery Address</p>
                      <p className="font-medium text-brown">{orderDetails.shippingAddress.name}</p>
                      <p className="text-sm text-coffee">
                        {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Timeline */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <h3 className="text-xl font-serif font-bold text-brown mb-6">
                    Tracking Timeline
                  </h3>
                  
                  <div className="space-y-6">
                    {orderDetails.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex space-x-4">
                        <div className="relative">
                          <div className={`w-4 h-4 rounded-full ${
                            event.completed 
                              ? event.current 
                                ? "bg-gradient-to-r from-caramel to-gold shadow-lg" 
                                : "bg-green-500"
                              : "bg-gray-300"
                          }`}>
                            {event.current && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-caramel to-gold animate-ping"></div>
                            )}
                          </div>
                          {index < orderDetails.timeline.length - 1 && (
                            <div className={`absolute top-4 left-1.5 w-1 h-16 ${
                              event.completed ? "bg-green-500" : "bg-gray-300"
                            }`}></div>
                          )}
                        </div>
                        
                        <div className="flex-1 -mt-1">
                          <h4 className={`font-medium ${
                            event.completed ? "text-brown" : "text-gray-400"
                          }`}>
                            {event.status}
                          </h4>
                          <p className="text-sm text-coffee-light">
                            {event.date} • {event.time}
                          </p>
                        </div>

                        {event.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <h3 className="text-xl font-serif font-bold text-brown mb-6">
                    Order Items
                  </h3>
                  
                  <div className="space-y-4">
                    {orderDetails.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4 pb-4 border-b border-nude last:border-0">
                        <div className="w-16 h-16 bg-nude rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🕯️</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-brown">{item.name}</h4>
                          <p className="text-sm text-coffee">
                            Quantity: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <p className="font-bold text-coffee">
                          ₹{item.quantity * item.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Need Help */}
                  <div className="mt-8 p-4 bg-nude-light rounded-xl">
                    <p className="text-sm font-medium text-brown mb-2">Need Help?</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`https://wa.me/919845853903?text=Hi! I need help with order ${orderDetails.orderId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href="/contact"
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-white text-coffee rounded-full text-sm hover:bg-nude transition-colors"
                      >
                        <span>Contact Support</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}