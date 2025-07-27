import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, totalItems, timestamp } = body;

    // Validate required fields
    if (!items || !totalItems || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send data to Zapier webhook
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('ZAPIER_WEBHOOK_URL environment variable is not set');
      return NextResponse.json(
        { error: 'Webhook configuration error' },
        { status: 500 }
      );
    }

    const zapierResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items,
        total_items: totalItems,
        order_timestamp: timestamp,
        restaurant: 'The Treehouse',
      }),
    });

    if (!zapierResponse.ok) {
      console.error('Failed to send data to Zapier:', zapierResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to process order' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Order processed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}