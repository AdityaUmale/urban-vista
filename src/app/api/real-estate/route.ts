import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const db = await connectDB()
    const realEstate = await db.connection.db
      .collection("realEstate")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(realEstate)
  } catch (error) {
    console.error("Error fetching real estate properties:", error)
    return NextResponse.json(
      { error: "Failed to fetch real estate properties" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectDB()
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'address', 'type', 'price', 'description', 'image']
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

    const realEstate = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Creating real estate property:', realEstate)

    const result = await db.connection.db.collection("realEstate").insertOne(realEstate)

    if (!result.insertedId) {
      throw new Error('Failed to insert real estate property')
    }

    return NextResponse.json(
      { ...realEstate, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating real estate property:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create real estate property" },
      { status: 500 }
    )
  }
} 