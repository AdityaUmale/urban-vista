import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';

export async function POST() {
  try {
    // Remove auth cookie
    removeAuthCookie();
    
    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signout error:', error);
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    );
  }
}