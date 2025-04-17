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
    const { name, description, address, phone, image, city } = await request.json();
    
    // Create new rental room
    const newRentalRoom = new RentalRoom({
      name,
      description,
      address,
      phone,
      image,
      city, // Include the city field
      createdBy: 'anonymous', // Default value
    });
    
    // Save to database
    await newRentalRoom.save();
    
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