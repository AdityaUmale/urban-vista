import { NextResponse } from "next/server"
import connectDB from "@/lib/db"


export async function GET() {
  try {
    const db = await connectDB()
    const dbConnection = db.connection?.db ?? (await connectDB()).connection?.db
    if (!dbConnection) throw new Error("Failed to establish database connection")
    const transportation = dbConnection
      .collection("transportation")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(transportation)
  } catch (error) {
    console.error("Error fetching transportation services:", error)
    return NextResponse.json(
      { error: "Failed to fetch transportation services" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectDB()
    const data = await request.json()

    // Validate required fields (googleMapsUrl is optional)
    const requiredFields = ['name', 'type', 'timings', 'description', 'image']
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

    // Create transportation object with googleMapsUrl included
    const transportation = {
      ...data,
      googleMapsUrl: data.googleMapsUrl || null, // Add googleMapsUrl field, default to null if not provided
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Creating transportation service:', transportation)

    const dbConnection = db.connection?.db ?? (await connectDB()).connection?.db
    if (!dbConnection) throw new Error("Failed to establish database connection")
    const result = await dbConnection.collection("transportation").insertOne(transportation)

    if (!result.insertedId) {
      throw new Error('Failed to insert transportation service')
    }

    return NextResponse.json(
      { ...transportation, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating transportation service:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create transportation service" },
      { status: 500 }
    )
  }
}