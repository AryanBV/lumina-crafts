# 🗄️ Database Documentation

This folder contains SQL files and database documentation for the Lumina Crafts project.

**⚠️ Important:** These files are for documentation only and do NOT affect your running application or Supabase database.

## 📁 Structure

```
database/
├── schema/
│   ├── 01_extensions_and_functions.sql  # Extensions and utility functions
│   ├── 02_tables.sql                   # Table creation statements
│   ├── 03_rls_policies.sql             # Row Level Security policies
│   ├── 04_triggers_and_indexes.sql     # Database triggers and indexes
│   └── 05_seed_data.sql                # Sample data for testing
└── README.md                           # This file
```

## 🔄 How to Use

1. **Documentation Only**: These files document your current Supabase database schema
2. **Stay in Sync**: Update these files when you modify your database schema
3. **Reference**: Use these files to understand your database structure
4. **Backup**: Keep as backup reference of your schema structure

## 📊 Complete Schema Overview

Your database includes the following tables:

### User Management
- **`profiles`** - User profiles extending auth.users with additional fields
- **`addresses`** - User shipping/billing addresses with default address support
- **`newsletter_subscribers`** - Email newsletter subscription management

### Product Catalog
- **`categories`** - Product categories with slugs and descriptions
- **`products`** - Complete product catalog with images, pricing, inventory
- **`reviews`** - Product reviews with ratings and verified purchase tracking

### E-commerce Operations
- **`orders`** - Customer orders with payment details and status tracking
- **`order_items`** - Individual line items for each order
- **`cart_items`** - Persistent shopping cart for logged-in users
- **`wishlists`** - User wishlists for favorite products

### Marketing & Promotions
- **`coupons`** - Discount codes with usage limits and validation rules

### Key Features Implemented
- **Guest Checkout**: Orders support both authenticated and guest users
- **Payment Integration**: Full Razorpay payment gateway integration
- **Inventory Management**: Stock tracking with availability checks
- **Multi-address Support**: Users can save multiple shipping addresses
- **Review System**: Verified purchase reviews with featured review options

### Data Types & Standards
- **Prices**: Stored as integers in paise (₹1 = 100 paise)
- **Addresses**: Structured JSON for shipping address storage
- **UUIDs**: Primary keys for all tables
- **Timestamps**: All tables include created_at/updated_at with UTC timezone
- **Status Fields**: Enumerated status values with database constraints

### Authentication & Authorization
- **Supabase Auth**: Built-in user authentication system
- **Row Level Security**: Comprehensive RLS policies on all tables
- **Service Role**: Bypass RLS for server-side operations (checkout, orders)
- **User Roles**: Customer/Admin role system in profiles table

## 🛡️ Security Features

- **Row Level Security (RLS)** enabled on all tables
- **User-specific policies** for personal data (profiles, addresses, cart, orders)
- **Public read access** for product catalog and categories
- **Service role bypass** for server-side operations
- **Guest order support** while maintaining data security

## 🔧 Database Functions & Triggers

- **`handle_new_user()`** - Automatically creates profile on user signup
- **`update_updated_at_column()`** - Updates timestamp on record modifications
- **Automatic triggers** on all tables with updated_at columns
- **Performance indexes** on frequently queried columns

## 📈 Performance Optimizations

- Strategic indexes on slug fields for SEO-friendly URLs
- Composite indexes for common query patterns
- Foreign key indexes for efficient joins
- Status field indexes for filtering operations

---

**These files help document your database but don't modify your actual Supabase setup.**