import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Food from '@/lib/models/Food';

// GET route to fetch all food places
export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Fetch all food places
    const foods = await Food.find({});
    
    // Return success response
    return NextResponse.json({ foods }, { status: 200 });
  } catch (error) {
    console.error('Error fetching food places:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food places' },
      { status: 500 }
    );
  }
}

// POST route to create a new food place
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get request body
    const { name, address, cuisine, timings, description, image, createdBy } = await request.json();
    
    // Validate input
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create new food place
    const newFood = await Food.create({
      name,
      address,
      cuisine,
      timings,
      description,
      image,
      createdBy,
    });
    
    // Return success response
    return NextResponse.json({ food: newFood }, { status: 201 });
  } catch (error) {
    console.error('Error creating food place:', error);
    return NextResponse.json(
      { error: 'Failed to create food place' },
      { status: 500 }
    );
  }
}