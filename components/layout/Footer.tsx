import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart, Flame, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-cream to-nude-light mt-20">
      {/* Newsletter Section */}
      <div className="border-t border-nude">
        <div className="section-padding py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
            <div className="mx-auto mb-6 flex justify-center">
              <Image
                src="/images/Lumina-logo.png"
                alt="Lumina Crafts Logo"
                width={45}
                height={45}
                className="object-contain"
              />
            </div>
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
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/footer-brand-name.png?v=2"
                alt="Lumina Crafts Logo"
                width={45}
                height={45}
                className="object-contain"
              />
              <Image
                src="/images/footer-brand-logo.png?v=2"
                alt="Lumina Crafts"
                width={140}
                height={35}
                className="object-contain"
              />
            </div>
            <p className="text-coffee mb-6">
              Handcrafted candles made with natural soy wax and premium fragrances to illuminate your moments.
            </p>
            <div className="flex space-x-3">
              {/* Social media icons - will be activated later */}
              <div className="p-2.5 bg-white rounded-full opacity-50 cursor-not-allowed">
                <Facebook className="w-5 h-5 text-coffee" />
              </div>
              <div className="p-2.5 bg-white rounded-full opacity-50 cursor-not-allowed">
                <Instagram className="w-5 h-5 text-coffee" />
              </div>
              <div className="p-2.5 bg-white rounded-full opacity-50 cursor-not-allowed">
                <Twitter className="w-5 h-5 text-coffee" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-brown mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-coffee hover:text-caramel transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-coffee hover:text-caramel transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-coffee hover:text-caramel transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-coffee hover:text-caramel transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-coffee hover:text-caramel transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold text-brown mb-4">Policies</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping-returns" className="text-coffee hover:text-caramel transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-coffee hover:text-caramel transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-coffee hover:text-caramel transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq#payment" className="text-coffee hover:text-caramel transition-colors">
                  Secure Payments
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-brown mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:aryansalian5678@gmail.com"
                  className="flex items-start space-x-3 text-coffee hover:text-caramel transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5" />
                  <span>aryansalian5678@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919845853903"
                  className="flex items-start space-x-3 text-coffee hover:text-caramel transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5" />
                  <span>+91 9845853903</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/919845853903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 text-coffee hover:text-caramel transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mt-0.5" />
                  <span>WhatsApp Support</span>
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-caramel mt-0.5" />
                <span className="text-coffee">Bengaluru, Karnataka, India</span>
              </li>
            </ul>

            {/* WhatsApp CTA Button */}
            <a
              href="https://wa.me/919845853903?text=Hi%20Lumina%20Crafts!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 mt-6 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-nude">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-coffee text-sm">
              © 2025 Lumina Crafts. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <p className="flex items-center text-coffee text-sm">
                Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> in India
              </p>
              <div className="flex items-center space-x-4 text-coffee text-sm">
                <span>We accept:</span>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-white rounded text-xs font-bold">UPI</span>
                  <span className="px-2 py-1 bg-white rounded text-xs font-bold">Cards</span>
                  <span className="px-2 py-1 bg-white rounded text-xs font-bold">COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}