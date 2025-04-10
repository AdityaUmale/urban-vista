import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const db = await connectDB()
    const jobs = await db.connection.db
      .collection("jobs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectDB()
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['title', 'company', 'location', 'type', 'salary', 'description', 'image']
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

    const job = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Creating job:', job)

    const result = await db.connection.db.collection("jobs").insertOne(job)

    if (!result.insertedId) {
      throw new Error('Failed to insert job')
    }

    return NextResponse.json(
      { ...job, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create job" },
      { status: 500 }
    )
  }
} 