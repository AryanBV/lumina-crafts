// app/api/checkout/razorpay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

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

    // Save order in database with pending status
    const { data: orderData, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user_id || null,
        guest_email,
        guest_name,
        guest_phone,
        subtotal,
        discount: 0,
        shipping,
        tax,
        total,
        status: 'pending',
        payment_method: 'razorpay',
        payment_intent_id: order.id,
        payment_status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Save order items
    const orderItems = items.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
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