import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Food from '@/lib/models/Food';

// GET route to fetch all food items
export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Fetch all food items
    const foodItems = await Food.find({});
    
    // Return success response
    return NextResponse.json({ foodItems }, { status: 200 });
  } catch (error) {
    console.error('Error fetching food items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food items' },
      { status: 500 }
    );
  }
}

// POST route to create a new food item
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get request body
    const { name, description, address, phone, price, image, createdBy } = await request.json();
    
    // Validate input
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create new food item
    const newFood = await Food.create({
      name,
      description,
      address,
      phone,
      price,
      image,
      createdBy,
    });
    
    // Return success response
    return NextResponse.json({ food: newFood }, { status: 201 });
  } catch (error) {
    console.error('Error creating food item:', error);
    return NextResponse.json(
      { error: 'Failed to create food item' },
      { status: 500 }
    );
  }
}