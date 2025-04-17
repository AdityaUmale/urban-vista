import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Rental from '@/lib/models/Rental';

// GET route to fetch all rentals
export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Fetch all rentals
    const rentals = await Rental.find({});
    
    // Return success response
    return NextResponse.json({ rentals }, { status: 200 });
  } catch (error) {
    console.error('Error fetching rentals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rentals' },
      { status: 500 }
    );
  }
}

// POST route to create a new rental
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get request body
    const { name, address, price, description, image, city } = await request.json();
    
    // Create new rental
    const newRental = new Rental({
      name,
      address,
      price,
      description,
      image,
      city, // Make sure city is included here
      createdBy: 'anonymous',
    });
    
    // Save to database
    await newRental.save();
    
    // Return success response
    return NextResponse.json({ rental: newRental }, { status: 201 });
  } catch (error) {
    console.error('Error creating rental:', error);
    return NextResponse.json(
      { error: 'Failed to create rental' },
      { status: 500 }
    );
  }
}