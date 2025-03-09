import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import RentalRoom from '../../../lib/models/RentalRooms';

// GET route to fetch all rental rooms
export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Fetch all rental rooms
    const rentalRooms = await RentalRoom.find({});
    
    // Return success response
    return NextResponse.json({ rentalRooms }, { status: 200 });
  } catch (error) {
    console.error('Error fetching rental rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rental rooms' },
      { status: 500 }
    );
  }
}

// POST route to create a new rental room
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get request body
    const { 
      title, 
      description, 
      address, 
      price, 
      bedrooms, 
      bathrooms, 
      amenities, 
      images, 
      contactPhone, 
      contactEmail,
      createdBy 
    } = await request.json();
    
    // Validate input
    if (!title || !price) {
      return NextResponse.json(
        { error: 'Title and price are required' },
        { status: 400 }
      );
    }
    
    // Create new rental room
    const newRentalRoom = await RentalRoom.create({
      title,
      description,
      address,
      price,
      bedrooms,
      bathrooms,
      amenities,
      images,
      contactPhone,
      contactEmail,
      createdBy
    });
    
    // Return success response
    return NextResponse.json({ rentalRoom: newRentalRoom }, { status: 201 });
  } catch (error) {
    console.error('Error creating rental room:', error);
    return NextResponse.json(
      { error: 'Failed to create rental room' },
      { status: 500 }
    );
  }
}