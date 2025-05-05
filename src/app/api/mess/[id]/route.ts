import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Mess from '@/lib/models/Mess';
import mongoose from 'mongoose';

// GET handler for fetching a single mess listing by ID
export async function GET(
  request: Request, 
  { params }: { params: { id: string } } // Correct: Destructuring params from the second argument
) {
  try {
    await connectDB();
    const { id } = params; // Correct: Accessing id from destructured params

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid Mess ID format' }, { status: 400 });
    }

    const mess = await Mess.findById(id);

    if (!mess) {
      return NextResponse.json({ message: 'Mess listing not found' }, { status: 404 });
    }

    return NextResponse.json(mess, { status: 200 });
  } catch (error) {
    console.error('Error fetching mess listing:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: 'Error fetching mess listing', error: errorMessage }, { status: 500 });
  }
}

// You can add PUT and DELETE handlers here later if needed