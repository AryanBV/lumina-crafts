// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
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
      payment_method,
      user_id,
      guest_email,
      guest_name,
      guest_phone,
    } = body;

    // Generate order number
    const orderNumber = `LMN-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    // Create order in database
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
        status: payment_method === 'cod' ? 'confirmed' : 'pending',
        payment_method,
        payment_status: payment_method === 'cod' ? 'pending' : 'pending',
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
      success: true,
      orderNumber: orderNumber,
      orderId: orderData.id
    });
    
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}