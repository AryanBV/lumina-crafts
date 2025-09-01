"use client";

import { Flame, Heart, ShoppingBag, ArrowRight, Star } from "lucide-react";

export default function PreviewPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Color Palette Display */}
      <div className="section-padding py-12">
        <h1 className="text-4xl font-serif font-bold text-center mb-12" style={{ color: '#3A3330' }}>
          Lumina Crafts - New Color Palette Preview
        </h1>

        {/* Color Swatches */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#3A3330' }}>Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-full h-24 rounded-lg shadow-md mb-2" style={{ backgroundColor: '#8B7355' }}></div>
              <p className="text-sm font-medium">Coffee</p>
              <p className="text-xs text-gray-500">#8B7355</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-lg shadow-md mb-2" style={{ backgroundColor: '#C4A574' }}></div>
              <p className="text-sm font-medium">Caramel</p>
              <p className="text-xs text-gray-500">#C4A574</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-lg shadow-md mb-2" style={{ backgroundColor: '#E8DCC4' }}></div>
              <p className="text-sm font-medium">Nude Beige</p>
              <p className="text-xs text-gray-500">#E8DCC4</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-lg shadow-md mb-2" style={{ backgroundColor: '#FAF7F2' }}></div>
              <p className="text-sm font-medium">Warm Cream</p>
              <p className="text-xs text-gray-500">#FAF7F2</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-lg shadow-md mb-2" style={{ backgroundColor: '#3A3330' }}></div>
              <p className="text-sm font-medium">Dark Brown</p>
              <p className="text-xs text-gray-500">#3A3330</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-lg shadow-md mb-2" style={{ backgroundColor: '#D4AF37' }}></div>
              <p className="text-sm font-medium">Soft Gold</p>
              <p className="text-xs text-gray-500">#D4AF37</p>
            </div>
          </div>
        </div>

        {/* Button Styles */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#3A3330' }}>Button Styles</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              className="px-8 py-3 rounded-full font-medium transition-all hover:scale-105"
              style={{ 
                backgroundColor: '#8B7355', 
                color: 'white'
              }}
            >
              Primary Button
            </button>
            <button 
              className="px-8 py-3 rounded-full font-medium transition-all hover:scale-105"
              style={{ 
                backgroundColor: '#C4A574', 
                color: 'white'
              }}
            >
              Secondary Button
            </button>
            <button 
              className="px-8 py-3 rounded-full font-medium transition-all"
              style={{ 
                border: '2px solid #8B7355',
                color: '#8B7355',
                backgroundColor: 'transparent'
              }}
            >
              Outline Button
            </button>
            <button 
              className="px-8 py-3 rounded-full font-medium transition-all"
              style={{ 
                background: 'linear-gradient(to right, #C4A574, #D4AF37)',
                color: 'white'
              }}
            >
              Gradient Button
            </button>
          </div>
        </div>

        {/* Mini Hero Section */}
        <div 
          className="rounded-2xl shadow-lg p-12 mb-12"
          style={{ 
            background: 'linear-gradient(135deg, #E8DCC4 0%, #FAF7F2 100%)'
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" 
                 style={{ backgroundColor: '#C4A574' }}>
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-serif font-bold mb-4" style={{ color: '#3A3330' }}>
              Illuminate Your Sacred Space
            </h2>
            <p className="text-lg mb-8" style={{ color: '#8B7355' }}>
              Transform your home with our handcrafted candles made from natural soy wax
            </p>
            <button 
              className="px-8 py-4 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center space-x-2"
              style={{ 
                backgroundColor: '#8B7355', 
                color: 'white'
              }}
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#3A3330' }}>Product Card Samples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 flex items-center justify-center" style={{ backgroundColor: '#E8DCC4' }}>
                  <span className="text-6xl">🕯️</span>
                </div>
                <div className="p-6" style={{ backgroundColor: '#FFFFFF' }}>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3A3330' }}>
                    Vanilla Dream
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#8B7355' }}>
                    Sweet and comforting vanilla scent
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold" style={{ color: '#8B7355' }}>₹599</span>
                    <button className="p-2 rounded-full transition-colors" style={{ backgroundColor: '#FAF7F2' }}>
                      <Heart className="w-5 h-5" style={{ color: '#C4A574' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Bar Sample */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#3A3330' }}>Navigation Bar</h2>
          <div className="rounded-lg p-4" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E8DCC4' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: '#C4A574' }}>
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-serif font-bold" style={{ color: '#3A3330' }}>Lumina Crafts</span>
              </div>
              <div className="flex items-center space-x-8">
                <a href="#" style={{ color: '#8B7355' }} className="hover:opacity-70 transition-opacity">Home</a>
                <a href="#" style={{ color: '#8B7355' }} className="hover:opacity-70 transition-opacity">Shop</a>
                <a href="#" style={{ color: '#8B7355' }} className="hover:opacity-70 transition-opacity">About</a>
                <a href="#" style={{ color: '#8B7355' }} className="hover:opacity-70 transition-opacity">Contact</a>
              </div>
              <div className="flex items-center space-x-4">
                <ShoppingBag className="w-5 h-5" style={{ color: '#8B7355' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#3A3330' }}>New Palette (Nude)</h3>
            <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="space-y-4">
                <div className="h-20 rounded-lg flex items-center justify-center text-white font-medium" 
                     style={{ backgroundColor: '#8B7355' }}>Coffee Primary</div>
                <div className="h-20 rounded-lg flex items-center justify-center text-white font-medium" 
                     style={{ backgroundColor: '#C4A574' }}>Caramel Secondary</div>
                <div className="h-20 rounded-lg flex items-center justify-center" 
                     style={{ backgroundColor: '#E8DCC4', color: '#3A3330' }}>Nude Beige Accent</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">Old Palette (Orange)</h3>
            <div className="rounded-xl p-6 bg-white">
              <div className="space-y-4">
                <div className="h-20 rounded-lg bg-orange-600 flex items-center justify-center text-white font-medium">
                  Orange Primary
                </div>
                <div className="h-20 rounded-lg bg-amber-500 flex items-center justify-center text-white font-medium">
                  Amber Secondary
                </div>
                <div className="h-20 rounded-lg bg-amber-50 flex items-center justify-center text-gray-900">
                  Light Accent
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}