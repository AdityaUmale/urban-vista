import { NextResponse } from "next/server"
import connectDB from "@/lib/db"

export async function GET() {
  try {
    const db = await connectDB()
    if (!db.connection?.db) {
      throw new Error("Database connection not established");
    }
    const shopping = await db.connection.db
      .collection("shopping")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(shopping)
  } catch (error) {
    console.error("Error fetching shopping places:", error)
    return NextResponse.json(
      { error: "Failed to fetch shopping places" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectDB()
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'address', 'type', 'timings', 'description', 'image']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate image URL
    const allowedDomains = [
      'images.unsplash.com',
      'upload.wikimedia.org',
      'www.wikipedia.org',
      'wikipedia.org',
      'commons.wikimedia.org',
      'live.staticflickr.com',
      'i.imgur.com',
      'res.cloudinary.com'
    ]
    
    try {
      const imageUrl = new URL(data.image)
      if (!allowedDomains.some(domain => imageUrl.hostname.includes(domain))) {
        return NextResponse.json(
          { error: 'Image URL must be from Unsplash, Wikimedia, Flickr, Imgur, or Cloudinary' },
          { status: 400 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid image URL format' },
        { status: 400 }
      )
    }

    const shopping = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Creating shopping place:', shopping)

    if (!db.connection?.db) {
      throw new Error("Database connection not established");
    }
    const result = await db.connection.db.collection("shopping").insertOne(shopping)

    if (!result.insertedId) {
      throw new Error('Failed to insert shopping place')
    }

    return NextResponse.json(
      { ...shopping, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating shopping place:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create shopping place" },
      { status: 500 }
    )
  }
} 