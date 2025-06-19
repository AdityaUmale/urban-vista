import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import connectDB from '@/lib/db';
import EduInstitute from '@/lib/models/EduInstitute';
import { v4 as uuidv4 } from 'uuid';

// Disable body parsing, we'll handle it ourselves
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to read form data
async function readFormData(req: NextRequest) {
  const formData = await req.formData();
  return formData;
}

// GET route to fetch all educational institutes
export async function GET() {
  try {
    await connectDB();
    const institutes = await EduInstitute.find({});
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
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const formData = await readFormData(req);
    
    const pdfFile = formData.get('pdfFile') as File | null;
    let pdfUrl = '';
    let pdfName = '';
    
    if (pdfFile) {
      // Create uploads directory if it doesn't exist
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        console.log(err);
        console.log('Upload directory already exists or cannot be created');
      }
      
      // Generate unique filename
      const uniqueId = uuidv4();
      const fileName = `${uniqueId}-${pdfFile.name}`;
      const filePath = join(uploadDir, fileName);
      
      // Convert file to buffer and save it
      const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
      await writeFile(filePath, fileBuffer);
      
      // Set the URL to the saved file
      pdfUrl = `/uploads/${fileName}`;
      pdfName = formData.get('pdfName') as string || pdfFile.name;
    }
    
    const newInstitute = new EduInstitute({
      name: formData.get('name'),
      address: formData.get('address'),
      Phone: formData.get('Phone'),
      WebsiteLink: formData.get('WebsiteLink'),
      Description: formData.get('Description'),
      Image: formData.get('Image'),
      city: formData.get('city'),
      pdfUrl: pdfUrl,
      pdfName: pdfName,
      googleMapsUrl: formData.get('googleMapsUrl'), // Added googleMapsUrl
      createdBy: 'anonymous', 
    });
    
    // Save to database
    await newInstitute.save();
    
    // Return success response
    return NextResponse.json({ message: 'Education institute created successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to create education institute' }, { status: 500 });
  }
}