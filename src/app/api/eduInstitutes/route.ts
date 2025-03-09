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
    const { name, address, Phone, WebsiteLink, Description, Image, createdBy } = await request.json();
    
    // Validate input
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create new educational institute
    const newInstitute = await EduInstitute.create({
      name,
      address,
      Phone,
      WebsiteLink,
      Description,
      Image,
      createdBy,
    });
    
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