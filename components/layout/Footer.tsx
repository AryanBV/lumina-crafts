import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart, Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-cream to-nude-light mt-20">
      {/* Newsletter Section */}
      <div className="border-t border-nude">
        <div className="section-padding py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
            <Flame className="w-12 h-12 text-caramel mx-auto mb-4" />
            <h3 className="text-3xl font-serif font-bold text-brown mb-3">
              Light Up Your Inbox
            </h3>
            <p className="text-coffee mb-6 max-w-md mx-auto">
              Subscribe to get special offers, exclusive candle care tips, and early access to new collections
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-nude focus:outline-none focus:border-caramel transition-colors"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-coffee to-caramel text-white font-medium rounded-full hover:shadow-lg transition-all duration-200 hover:scale-105">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-caramel to-gold p-2 rounded-full">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brown">
                Lumina Crafts
              </h2>
            </div>
            <p className="text-coffee mb-6">
              Handcrafted candles made with natural soy wax and premium fragrances to illuminate your moments.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2.5 bg-white rounded-full hover:bg-nude transition-colors group">
                <Facebook className="w-5 h-5 text-coffee group-hover:text-caramel" />
              </a>
              <a href="#" className="p-2.5 bg-white rounded-full hover:bg-nude transition-colors group">
                <Instagram className="w-5 h-5 text-coffee group-hover:text-caramel" />
              </a>
              <a href="#" className="p-2.5 bg-white rounded-full hover:bg-nude transition-colors group">
                <Twitter className="w-5 h-5 text-coffee group-hover:text-caramel" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-brown mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Shop All", "New Arrivals", "Best Sellers", "Gift Sets", "Sale"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-coffee hover:text-caramel transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold text-brown mb-4">Customer Care</h3>
            <ul className="space-y-3">
              {["About Us", "Contact", "Shipping Info", "Returns", "FAQ", "Candle Care Guide"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-coffee hover:text-caramel transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-brown mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-caramel mt-0.5" />
                <span className="text-coffee">hello@luminacrafts.in</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-caramel mt-0.5" />
                <span className="text-coffee">+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-caramel mt-0.5" />
                <span className="text-coffee">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-nude">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-coffee text-sm">
              © 2024 Lumina Crafts. All rights reserved.
            </p>
            <p className="flex items-center text-coffee text-sm">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}