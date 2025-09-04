// app/api/checkout/status/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const isRazorpayConfigured = !!(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && 
      process.env.RAZORPAY_KEY_SECRET
    );

    return NextResponse.json({
      razorpay_available: isRazorpayConfigured,
      public_key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null
    });
  } catch (error) {
    return NextResponse.json(
      { razorpay_available: false, public_key: null },
      { status: 500 }
    );
  }
}