# 🕯️ Lumina Crafts - Premium Handcrafted Candles

A modern e-commerce platform for premium handcrafted candles, built with Next.js 14 and powered by Supabase.

## ✨ Features

### 🛍️ **E-commerce Core**
- Beautiful product catalog with category filtering
- Advanced shopping cart with quantity management
- Secure checkout with Razorpay integration
- Guest and authenticated user support
- Real-time cart updates with notifications

### 💳 **Payment Processing**
- **Razorpay Integration** - UPI, Cards, Net Banking, Wallets
- **Cash on Delivery** support
- Secure payment verification and order tracking
- Automatic order confirmation emails

### 🎨 **User Experience**
- Responsive design for all devices
- Smooth animations with Framer Motion
- Quick Add buttons on product cards
- Free shipping calculator (₹1000+ orders)
- Toast notifications for user feedback

### 🔐 **Authentication & Security**
- Supabase Authentication (Email/Password + Google OAuth)
- Row Level Security (RLS) policies
- Secure API endpoints with service role access
- Protected routes and middleware

### 📱 **Modern UI/UX**
- Custom design system with brand colors
- Glassmorphism and gradient effects
- Loading states and error handling
- Mobile-first responsive design

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications
- **Zustand** - Lightweight state management

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security
- **API Routes** - Next.js server-side API endpoints

### **Payment & Integration**
- **Razorpay** - Payment gateway for India
- **WhatsApp Integration** - Customer support
- **Email Notifications** - Order confirmations

### **Development & Deployment**
- **Vercel** - Hosting and deployment
- **Git** - Version control
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AryanBV/lumina-crafts.git
   cd lumina-crafts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   
   NEXT_PUBLIC_SITE_NAME=Lumina Crafts
   ```

4. **Database Setup**
   - Set up your Supabase project
   - Create required tables (see Database Schema)
   - Configure Row Level Security policies

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Visit** `http://localhost:3000`

## 📊 Database Schema

### Core Tables
- `orders` - Customer orders with shipping info
- `order_items` - Individual items in each order
- `shipping_addresses` - Shipping address details
- `products` - Product catalog
- `categories` - Product categories

### Authentication
- Handled by Supabase Auth
- User profiles linked to orders
- Google OAuth integration

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Set up authentication providers (Email + Google)
3. Configure redirect URLs:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/api/auth/callback`
4. Set up RLS policies for secure data access

### Razorpay Setup
1. Create Razorpay account
2. Get API keys from dashboard
3. Configure webhook endpoints for payment verification
4. Test with sample transactions

### Deployment (Vercel)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically on push to main

## 🎨 Design System

### Brand Colors
- **Brown**: `#8B4513` - Primary brand color
- **Coffee**: `#6F4E37` - Text and secondary elements
- **Caramel**: `#D2691E` - Accent and highlights
- **Gold**: `#FFD700` - Premium elements
- **Cream**: `#F5F5DC` - Background and light areas
- **Nude**: `#E8DCC4` - Subtle backgrounds

### Typography
- **Headings**: Serif font family for elegance
- **Body**: Sans-serif for readability
- **Responsive**: Fluid typography scales

## 🛡️ Security Features

- **Row Level Security (RLS)** on all database tables
- **Service role** for secure API operations
- **Input validation** on all forms
- **XSS protection** with proper data sanitization
- **CSRF protection** with Next.js built-ins
- **Secure headers** and HTTPS enforcement

## 📱 API Endpoints

### Orders
- `POST /api/orders/create` - Create new order (COD)
- `POST /api/checkout/razorpay` - Create Razorpay order
- `POST /api/checkout/verify` - Verify Razorpay payment
- `GET /api/checkout/status` - Check payment system status

### Authentication
- `GET /api/auth/callback` - OAuth callback handler

## 🧪 Testing

Run the development server and test:
- Product browsing and filtering
- Cart functionality (add, remove, update)
- Checkout flow with form validation
- Payment processing (use Razorpay test mode)
- Order confirmation and email delivery

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Configure environment variables
3. Deploy with zero configuration

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_SITE_NAME=
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Supabase** for the backend infrastructure
- **Razorpay** for payment processing
- **Vercel** for seamless deployment
- **Tailwind CSS** for the utility-first approach

## 📞 Support

For support, email support@luminacrafts.com or join our WhatsApp support at +91 98458 53903.

## 🔗 Links

- **Live Demo**: [https://lumina-crafts.vercel.app](https://lumina-crafts.vercel.app)
- **Repository**: [https://github.com/AryanBV/lumina-crafts](https://github.com/AryanBV/lumina-crafts)

---

**Built with ❤️ for premium candle lovers**
