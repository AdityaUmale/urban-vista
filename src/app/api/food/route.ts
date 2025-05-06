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
    await connectDB();
    
    const body = await request.json();
    
    const foodData = {
      name: body.name,
      address: body.address,
      phone: body.phone,
      websiteLink: body.websiteLink,
      description: body.description,
      image: body.image,
      cuisine: body.cuisine,
      rating: body.rating,
      hours: body.hours,
      city: body.city,
      googleMapsUrl: body.googleMapsUrl, // Added googleMapsUrl
      createdBy: 'Anonymous User'
    };
    
    // Log the data being sent to MongoDB for debugging
    console.log('Creating food place with data:', foodData);
    
    const newFood = await Food.create(foodData);
    
    return NextResponse.json({ food: newFood }, { status: 201 });
  } catch (error) {
    console.error('Error creating food place:', error);
    return NextResponse.json(
      { error: 'Failed to create food place' },
      { status: 500 }
    );
  }
}