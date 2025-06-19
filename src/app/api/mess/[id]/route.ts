import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Mess from '@/lib/models/Mess';


// GET handler for fetching a single mess listing by ID
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

// You can add PUT and DELETE handlers here later if needed