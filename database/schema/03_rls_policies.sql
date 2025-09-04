-- =============================================================================
-- LUMINA CRAFTS - ROW LEVEL SECURITY POLICIES
-- =============================================================================

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- PROFILES POLICIES
-- =============================================================================
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- =============================================================================
-- ADDRESSES POLICIES
-- =============================================================================
CREATE POLICY "Users can view own addresses" ON public.addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON public.addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON public.addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON public.addresses
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================================================
-- WISHLISTS POLICIES
-- =============================================================================
CREATE POLICY "Users can view own wishlist" ON public.wishlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist" ON public.wishlists
  FOR ALL USING (auth.uid() = user_id);

-- =============================================================================
-- CART ITEMS POLICIES
-- =============================================================================
CREATE POLICY "Users can view own cart" ON public.cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own cart" ON public.cart_items
  FOR ALL USING (auth.uid() = user_id);

-- =============================================================================
-- NEWSLETTER POLICIES
-- =============================================================================
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- =============================================================================
-- ORDERS POLICIES
-- =============================================================================
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- =============================================================================
-- ORDER ITEMS POLICIES
-- =============================================================================
CREATE POLICY "Users can view items in their own orders" ON public.order_items
  FOR SELECT USING (
    (SELECT user_id FROM public.orders WHERE id = order_id) = auth.uid()
  );

-- =============================================================================
-- CATEGORIES POLICIES
-- =============================================================================
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

-- =============================================================================
-- PRODUCTS POLICIES
-- =============================================================================
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (status = 'active');

-- =============================================================================
-- COUPONS POLICIES
-- =============================================================================
CREATE POLICY "Anyone can view active coupons" ON public.coupons
  FOR SELECT USING (is_active = true AND (valid_until IS NULL OR valid_until > NOW()));

-- =============================================================================
-- REVIEWS POLICIES
-- =============================================================================
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);