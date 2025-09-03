"use client";

import { motion } from "framer-motion";
import { Truck, Package, RefreshCw, Clock, MapPin, CheckCircle } from "lucide-react";

export default function ShippingReturnsPage() {
  const shippingZones = [
    { zone: "Metro Cities", days: "2-3 days", cities: "Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Hyderabad" },
    { zone: "Tier 2 Cities", days: "3-5 days", cities: "Pune, Jaipur, Lucknow, Ahmedabad, Surat, Nagpur" },
    { zone: "Rest of India", days: "5-7 days", cities: "All other cities and towns" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nude via-cream to-nude-light relative overflow-hidden">
        <div className="section-padding py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Truck className="w-16 h-16 text-caramel mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
              Shipping & Returns
            </h1>
            <p className="text-xl text-coffee">
              Everything you need to know about getting your order and our return policy
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-padding py-16">
        <div className="max-w-6xl mx-auto">
          {/* Shipping Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-caramel to-gold rounded-xl">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-brown">Shipping Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-brown mb-4">Shipping Charges</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-nude-light rounded-xl">
                      <span className="text-coffee">Orders above ₹1000</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-nude-light rounded-xl">
                      <span className="text-coffee">Standard Delivery</span>
                      <span className="font-bold text-coffee">₹99</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-nude-light rounded-xl">
                      <span className="text-coffee">Express Delivery</span>
                      <span className="font-bold text-coffee">₹199</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-brown mb-4">Processing Time</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-caramel mt-1" />
                      <div>
                        <p className="font-medium text-brown">Order Processing</p>
                        <p className="text-sm text-coffee">1-2 business days</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Package className="w-5 h-5 text-caramel mt-1" />
                      <div>
                        <p className="font-medium text-brown">Custom Orders</p>
                        <p className="text-sm text-coffee">3-5 business days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Zones */}
              <h3 className="text-xl font-semibold text-brown mb-4">Delivery Timeline by Zone</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-nude-light">
                      <th className="px-4 py-3 text-left text-coffee font-medium rounded-tl-xl">Zone</th>
                      <th className="px-4 py-3 text-left text-coffee font-medium">Delivery Time</th>
                      <th className="px-4 py-3 text-left text-coffee font-medium rounded-tr-xl">Cities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingZones.map((zone, index) => (
                      <tr key={index} className="border-b border-nude">
                        <td className="px-4 py-3 text-brown font-medium">{zone.zone}</td>
                        <td className="px-4 py-3 text-coffee">{zone.days}</td>
                        <td className="px-4 py-3 text-coffee text-sm">{zone.cities}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-800 flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>We ship to all pin codes across India! Remote areas may take 2-3 additional days.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Returns Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-coffee to-caramel rounded-xl">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-brown">Returns & Refunds</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-brown mb-4">Return Policy</h3>
                  <ul className="space-y-3 text-coffee">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>30-day return window from delivery date</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Products must be unused and in original packaging</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Free replacement for damaged or defective items</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Refund processed within 7-10 business days</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-brown mb-4">How to Return</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-nude rounded-full flex items-center justify-center text-coffee font-bold">1</div>
                      <div className="flex-1">
                        <p className="font-medium text-brown">Contact Us</p>
                        <p className="text-sm text-coffee">WhatsApp or email with order details</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-nude rounded-full flex items-center justify-center text-coffee font-bold">2</div>
                      <div className="flex-1">
                        <p className="font-medium text-brown">Pack the Item</p>
                        <p className="text-sm text-coffee">Securely pack in original packaging</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-nude rounded-full flex items-center justify-center text-coffee font-bold">3</div>
                      <div className="flex-1">
                        <p className="font-medium text-brown">Pickup Scheduled</p>
                        <p className="text-sm text-coffee">We'll arrange free pickup from your address</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-nude rounded-full flex items-center justify-center text-coffee font-bold">4</div>
                      <div className="flex-1">
                        <p className="font-medium text-brown">Refund Processed</p>
                        <p className="text-sm text-coffee">Receive refund in 7-10 days after inspection</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Non-returnable Items */}
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl">
                <h4 className="font-semibold text-red-800 mb-2">Non-returnable Items:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Used or burned candles</li>
                  <li>• Products without original packaging</li>
                  <li>• Custom or personalized items</li>
                  <li>• Items damaged due to misuse</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact for Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-coffee to-caramel rounded-3xl p-8 text-center text-white">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Need Help with Shipping or Returns?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Our customer support team is here to assist you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/919845853903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-coffee font-medium rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  WhatsApp Support
                </a>
                <a
                  href="mailto:aryansalian5678@gmail.com"
                  className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Email Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}