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
    await connectDB();
    
    const { name, address, phone, websiteLink, description, image, city } = await request.json();
    
    const newHospital = new Hospital({
      name,
      address,
      phone,
      websiteLink,
      description,
      image,
      city,
      createdBy: 'anonymous',
    });
    
    await newHospital.save();
    
    return NextResponse.json({ hospital: newHospital }, { status: 201 });
  } catch (error) {
    console.error('Error creating hospital:', error);
    return NextResponse.json(
      { error: 'Failed to create hospital' },
      { status: 500 }
    );
  }
}