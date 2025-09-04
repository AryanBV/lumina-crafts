-- =============================================================================
-- LUMINA CRAFTS - SEED DATA
-- =============================================================================

-- =============================================================================
-- CATEGORIES SEED DATA
-- =============================================================================

-- Insert categories
INSERT INTO public.categories (id, name, slug, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Pillar Candles', 'pillar-candles', 'Classic pillar candles for any occasion', 'https://example.com/pillar.jpg'),
('550e8400-e29b-41d4-a716-446655440002', 'Jar Candles', 'jar-candles', 'Scented jar candles with long burn time', 'https://example.com/jar.jpg'),
('550e8400-e29b-41d4-a716-446655440003', 'Tea Light Candles', 'tea-light-candles', 'Small tea light candles perfect for ambiance', 'https://example.com/tealight.jpg'),
('550e8400-e29b-41d4-a716-446655440004', 'Votive Candles', 'votive-candles', 'Votive candles for special occasions', 'https://example.com/votive.jpg'),
('550e8400-e29b-41d4-a716-446655440005', 'Specialty Candles', 'specialty-candles', 'Unique and specialty candle designs', 'https://example.com/specialty.jpg');

-- =============================================================================
-- PRODUCTS SEED DATA
-- =============================================================================

-- Insert sample products
INSERT INTO public.products (id, name, slug, description, price, compare_at_price, category_id, scent, size, burn_time, stock, featured, images, ingredients, care_instructions, meta_title, meta_description, status) VALUES
-- Pillar Candles
('650e8400-e29b-41d4-a716-446655440001', 'Classic White Pillar Candle', 'classic-white-pillar-candle', 'A timeless white pillar candle perfect for any occasion', 59900, 69900, '550e8400-e29b-41d4-a716-446655440001', 'Unscented', '3" x 6"', '40-45 hours', 25, true, ARRAY['https://example.com/white-pillar-1.jpg', 'https://example.com/white-pillar-2.jpg'], 'Premium soy wax, cotton wick', 'Trim wick to 1/4 inch before lighting. Burn on heat-resistant surface.', 'Classic White Pillar Candle - Premium Quality', 'Beautiful white pillar candle made from premium soy wax. Perfect for home decor and special occasions.', 'active'),
('650e8400-e29b-41d4-a716-446655440002', 'Burgundy Pillar Candle', 'burgundy-pillar-candle', 'Rich burgundy colored pillar candle for elegant ambiance', 64900, null, '550e8400-e29b-41d4-a716-446655440001', 'Cinnamon Spice', '3" x 8"', '55-60 hours', 15, false, ARRAY['https://example.com/burgundy-pillar-1.jpg'], 'Soy wax blend, natural dyes, cotton wick', 'Keep away from drafts. Burn for maximum 4 hours at a time.', 'Burgundy Cinnamon Spice Pillar Candle', 'Elegant burgundy pillar candle with warm cinnamon spice fragrance.', 'active'),

-- Jar Candles
('650e8400-e29b-41d4-a716-446655440003', 'Vanilla Dream Jar Candle', 'vanilla-dream-jar-candle', 'Sweet vanilla scented jar candle with wooden wick', 79900, 89900, '550e8400-e29b-41d4-a716-446655440002', 'Vanilla Bean', '4" diameter', '50-55 hours', 30, true, ARRAY['https://example.com/vanilla-jar-1.jpg', 'https://example.com/vanilla-jar-2.jpg'], 'Natural soy wax, vanilla essential oil, wooden wick', 'Trim wooden wick before each use. Allow wax to melt evenly across surface.', 'Vanilla Dream Jar Candle - Long Lasting', 'Luxurious vanilla scented jar candle with crackling wooden wick for ultimate relaxation.', 'active'),
('650e8400-e29b-41d4-a716-446655440004', 'Ocean Breeze Jar Candle', 'ocean-breeze-jar-candle', 'Fresh ocean breeze scent in a beautiful blue jar', 74900, null, '550e8400-e29b-41d4-a716-446655440002', 'Ocean Breeze', '4" diameter', '45-50 hours', 20, false, ARRAY['https://example.com/ocean-jar-1.jpg'], 'Coconut soy wax, sea salt, cotton wick', 'Store in cool, dry place away from direct sunlight.', 'Ocean Breeze Jar Candle - Fresh Scent', 'Refreshing ocean breeze scented candle perfect for creating a coastal atmosphere.', 'active'),

-- Tea Light Candles
('650e8400-e29b-41d4-a716-446655440005', 'Tea Light Set - Lavender', 'tea-light-set-lavender', 'Set of 12 lavender scented tea light candles', 39900, 49900, '550e8400-e29b-41d4-a716-446655440003', 'Lavender', '1.5" diameter', '4-5 hours each', 50, true, ARRAY['https://example.com/lavender-tealights-1.jpg'], 'Paraffin wax, lavender oil, cotton wick', 'Use in proper tea light holders. Never leave burning unattended.', 'Lavender Tea Light Candles Set of 12', 'Relaxing lavender scented tea light candles perfect for meditation and relaxation.', 'active'),

-- Votive Candles
('650e8400-e29b-41d4-a716-446655440006', 'Rose Garden Votive', 'rose-garden-votive', 'Romantic rose scented votive candle', 34900, null, '550e8400-e29b-41d4-a716-446655440004', 'Rose Garden', '2" x 2"', '15-18 hours', 35, false, ARRAY['https://example.com/rose-votive-1.jpg'], 'Beeswax blend, rose essential oil', 'Use in votive holder. Trim wick to 1/4 inch.', 'Rose Garden Votive Candle - Romantic', 'Beautiful rose scented votive candle perfect for romantic occasions.', 'active'),

-- Specialty Candles
('650e8400-e29b-41d4-a716-446655440007', 'Chakra Healing Candle Set', 'chakra-healing-candle-set', 'Set of 7 chakra healing candles with corresponding colors and scents', 129900, 149900, '550e8400-e29b-41d4-a716-446655440005', 'Mixed Essential Oils', 'Various sizes', '6-8 hours each', 10, true, ARRAY['https://example.com/chakra-set-1.jpg', 'https://example.com/chakra-set-2.jpg'], 'Natural soy wax, 7 essential oil blends, cotton wicks', 'Light corresponding candle during meditation. Use with intention and mindfulness.', 'Chakra Healing Candle Set - Meditation', 'Complete set of 7 chakra healing candles for meditation and spiritual practice.', 'active');

-- =============================================================================
-- COUPONS SEED DATA
-- =============================================================================

-- Insert sample coupons
INSERT INTO public.coupons (id, code, description, discount_type, discount_value, min_purchase_amount, usage_limit, valid_from, valid_until, is_active) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'WELCOME10', 'Welcome discount for new customers', 'percentage', 10, 50000, 100, NOW(), NOW() + INTERVAL '30 days', true),
('750e8400-e29b-41d4-a716-446655440002', 'FLAT200', 'Flat ₹200 off on orders above ₹1000', 'fixed', 20000, 100000, 50, NOW(), NOW() + INTERVAL '7 days', true),
('750e8400-e29b-41d4-a716-446655440003', 'FESTIVE25', 'Festive season special discount', 'percentage', 25, 75000, null, NOW(), NOW() + INTERVAL '15 days', true);