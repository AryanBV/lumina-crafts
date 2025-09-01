"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "The Lavender Fields candle transformed my bedroom into a peaceful sanctuary. The scent is natural and not overwhelming. Best candles I've ever purchased!",
      product: "Lavender Fields",
    },
    {
      id: 2,
      name: "Arjun Patel",
      location: "Delhi",
      rating: 5,
      text: "Gifted the luxury gift set to my wife on our anniversary. The packaging was elegant and the candles burn evenly for hours. Highly recommended!",
      product: "Luxury Gift Set",
    },
    {
      id: 3,
      name: "Sneha Reddy",
      location: "Bangalore",
      rating: 5,
      text: "As someone sensitive to artificial fragrances, I love that these are made with natural soy wax. The Vanilla Dream is my favorite - smells like home!",
      product: "Vanilla Dream",
    },
  ];

  return (
    <section className="section-padding py-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brown mb-4">
          What Our Customers Say
        </h2>
        <p className="text-xl text-coffee max-w-2xl mx-auto">
          Join thousands of happy customers who have transformed their spaces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-cream to-nude-light rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-gold mb-4" />
              
              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-coffee mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-nude pt-4">
                <p className="font-semibold text-brown">{testimonial.name}</p>
                <p className="text-sm text-coffee">{testimonial.location}</p>
                <p className="text-xs text-caramel mt-1">Purchased: {testimonial.product}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}