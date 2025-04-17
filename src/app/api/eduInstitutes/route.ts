import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import EduInstitute from '@/lib/models/EduInstitute';

// GET route to fetch all educational institutes
export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Fetch all educational institutes
    const institutes = await EduInstitute.find({});
    
    // Return success response
    return NextResponse.json({ institutes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching educational institutes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch educational institutes' },
      { status: 500 }
    );
  }
}

// POST route to create a new educational institute
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get request body
    const { name, address, Phone, WebsiteLink, Description, Image, city } = await request.json();
    
    // Create new institute
    const newInstitute = new EduInstitute({
      name,
      address,
      Phone,
      WebsiteLink,
      Description,
      Image,
      city,
      createdBy: 'anonymous', // Default value since we don't have user authentication yet
    });
    
    // Save to database
    await newInstitute.save();
    
    // Return success response
    return NextResponse.json({ institute: newInstitute }, { status: 201 });
  } catch (error) {
    console.error('Error creating educational institute:', error);
    return NextResponse.json(
      { error: 'Failed to create educational institute' },
      { status: 500 }
    );
  }
}