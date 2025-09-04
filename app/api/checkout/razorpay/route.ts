// app/api/checkout/razorpay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createServiceClient();

    const {
      items,
      shipping_address,
      subtotal,
      shipping,
      tax,
      total,
      user_id,
      guest_email,
      guest_name,
      guest_phone,
    } = body;
    
    // Check if Razorpay keys are available before creating the client
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay keys are not set. Cannot create a Razorpay order.');
      // Return an error response instead of crashing the build
      return NextResponse.json(
        { error: 'Razorpay keys are not configured. Please contact support.' },
        { status: 500 }
      );
    }
    
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Generate order number
    const orderNumber = `LMN-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    // Create Razorpay order
    const options = {
      amount: Math.round(total * 100), // Amount in paise
      currency: 'INR',
      receipt: orderNumber,
      notes: {
        order_number: orderNumber,
        customer_email: guest_email || user_id,
      }
    };

    const order = await razorpay.orders.create(options);

    // Save order in database with pending status (convert decimals to integers as paise)
    const { data: orderData, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user_id || null,
        guest_email,
        guest_name,
        guest_phone,
        subtotal: Math.round(subtotal * 100), // Convert to paise
        discount: 0,
        shipping: Math.round(shipping * 100), // Convert to paise
        tax: Math.round(tax * 100), // Convert to paise
        total: Math.round(total * 100), // Convert to paise
        status: 'pending',
        payment_method: 'razorpay',
        payment_intent_id: order.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Save order items (convert prices to integers as paise)
    const orderItems = items.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: Math.round(item.price * 100), // Convert to paise
      quantity: item.quantity,
      total: Math.round(item.price * item.quantity * 100), // Convert to paise
    }));

    await supabase.from('order_items').insert(orderItems);

    // Save shipping address
    await supabase.from('shipping_addresses').insert({
      order_id: orderData.id,
      ...shipping_address,
    });

    return NextResponse.json({
      orderId: order.id,
      orderNumber: orderNumber,
    });
    
  } catch (error: any) {
    console.error('Razorpay order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}