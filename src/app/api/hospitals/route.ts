import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Hospital from '../../../lib/models/Hospitals';

// GET route to fetch all hospitals
export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Fetch all hospitals
    const hospitals = await Hospital.find({});
    
    // Return success response
    return NextResponse.json({ hospitals }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hospitals' },
      { status: 500 }
    );
  }
}

// POST route to create a new hospital
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get request body
    const { name, address, phone, website, description, image, services, createdBy } = await request.json();
    
    // Validate input
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create new hospital
    const newHospital = await Hospital.create({
      name,
      address,
      phone,
      website,
      description,
      image,
      services,
      createdBy,
    });
    
    // Return success response
    return NextResponse.json({ hospital: newHospital }, { status: 201 });
  } catch (error) {
    console.error('Error creating hospital:', error);
    return NextResponse.json(
      { error: 'Failed to create hospital' },
      { status: 500 }
    );
  }
}