import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_number,
    } = body;
    
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    
    // Check if Razorpay key secret is available before using it
    if (!razorpaySecret) {
      console.error('RAZORPAY_KEY_SECRET is not set. Cannot verify payment signature.');
      // Return an error response if the secret is missing. This prevents the build from failing.
      return NextResponse.json({ success: false, message: 'Payment key not configured' }, { status: 500 });
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(text)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ success: false, message: 'Invalid signature' });
    }

    // Update order status in database
    const supabase = createServiceClient();
    
    const { error } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_intent_id: razorpay_payment_id,
      })
      .eq('order_number', order_number);

    if (error) throw error;

    // TODO: Send confirmation email

    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}