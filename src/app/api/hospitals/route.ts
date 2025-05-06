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
    
    const body = await request.json();
    console.log('Received data:', body); // Log the received data
    const { name, address, phone, websiteLink, description, image, city, googleMapsUrl } = body;
    
    const newHospital = new Hospital({
      name,
      address,
      phone,
      websiteLink,
      description,
      image,
      city,
      googleMapsUrl,
      createdBy: 'anonymous',
    });
    console.log('Hospital object before save:', newHospital); // Log the object
    
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