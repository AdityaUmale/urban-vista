import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Mess from '@/lib/models/Mess';

// POST handler for creating a new mess listing
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Destructure all fields including the new one
    const { 
      name, 
      address, 
      city, 
      createdBy, 
      phone, 
      websiteLink, 
      description, 
      image, 
      vegPrice, 
      nonVegPrice, 
      timings, 
      applicationUrl, 
      googleMapsUrl // Added googleMapsUrl
    } = body;

    if (!name || !address || !city || !createdBy) {
      return NextResponse.json(
        { message: 'Missing required fields: name, address, city, createdBy' }, 
        { status: 400 }
      );
    }

    const newMess = new Mess({
      name,
      address,
      city,
      createdBy,
      phone,
      websiteLink,
      description,
      image,
      vegPrice,
      nonVegPrice,
      timings,
      applicationUrl,
      googleMapsUrl, // Include googleMapsUrl here
    });

    await newMess.save();

    return NextResponse.json(
      { message: 'Mess listing created successfully', mess: newMess }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating mess listing:', error);
    // Provide a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: 'Error creating mess listing', error: errorMessage }, { status: 500 });
  }
}

// GET handler for fetching all mess listings
export async function GET() {
  try {
    await connectDB();
    const messes = await Mess.find({}).sort({ createdAt: -1 }); // Sort by newest first

    // Return the array directly
    return NextResponse.json(messes, { status: 200 }); // Changed this line
  } catch (error) {
    console.error('Error fetching mess listings:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    // Return an error object, which the frontend now handles
    return NextResponse.json({ message: 'Error fetching mess listings', error: errorMessage }, { status: 500 });
  }
}