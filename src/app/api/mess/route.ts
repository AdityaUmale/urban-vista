import { NextRequest, NextResponse } from 'next/server';
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
      googleMapsUrl 
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
      googleMapsUrl,
    });

    await newMess.save();

    return NextResponse.json(
      { message: 'Mess listing created successfully', mess: newMess }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating mess listing:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: 'Error creating mess listing', error: errorMessage }, { status: 500 });
  }
}

// GET handler for fetching a single mess listing
export async function GET(
  request: NextRequest,                               // you can also write Request here
  { params }: { params: Promise<{ id: string }> }     // <- note Promise<…>
) {
  try {
    await connectDB();

    // await the params promise, then destructure
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: 'Mess ID is required' },
        { status: 400 }
      );
    }

    const mess = await Mess.findById(id);

    if (!mess) {
      return NextResponse.json(
        { message: 'Mess not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(mess);
  } catch (error) {
    console.error('Error fetching mess:', error);
    return NextResponse.json(
      { message: 'Error fetching mess' },
      { status: 500 }
    );
  }
}