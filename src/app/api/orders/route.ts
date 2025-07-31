import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/orders - Get user orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ orders }, { status: 200 });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create new order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      serviceType,
      description,
      amount,
      scheduledAt
    } = body;

    // Validate required fields
    if (!userId || !serviceType) {
      return NextResponse.json(
        { error: 'User ID and service type are required' },
        { status: 400 }
      );
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        serviceType,
        description,
        amount: amount ? parseFloat(amount) : null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: 'pending'
      }
    });

    return NextResponse.json({
      message: 'Order created successfully',
      order
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// PUT /api/orders - Update order status
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, completedAt } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    const updateData: { status: string; completedAt?: Date } = { status };
    if (status === 'completed' && completedAt) {
      updateData.completedAt = new Date(completedAt);
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: updateData
    });

    return NextResponse.json({
      message: 'Order updated successfully',
      order
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}