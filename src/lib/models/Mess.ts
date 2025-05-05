import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the structure of a Mess document
export interface IMess extends Document {
  name: string;
  address: string;
  phone?: string; 
  websiteLink?: string; 
  description?: string; 
  image?: string; 
  vegPrice?: number; 
  nonVegPrice?: number; 
  timings?: string; 
  applicationUrl?: string; 
  googleMapsUrl?: string; // Added Google Maps URL field
  city: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema for Mess
const MessSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Mess name is required.'], 
      trim: true 
    },
    address: { 
      type: String, 
      required: [true, 'Address is required.'], 
      trim: true 
    },
    phone: { 
      type: String, 
      trim: true 
    },
    websiteLink: { 
      type: String, 
      trim: true 
    },
    description: { 
      type: String, 
      trim: true 
    },
    image: { 
      type: String, // Assuming storing image URL
      trim: true 
    },
    vegPrice: { 
      type: Number 
    },
    nonVegPrice: { 
      type: Number 
    },
    timings: { 
      type: String, 
      trim: true 
    },
    applicationUrl: { // Renamed from 'Apply for mess button' to store a URL
      type: String, 
      trim: true 
    },
    // Add the missing field definition here:
    googleMapsUrl: {
      type: String,
      trim: true
    },
    city: { 
      type: String, 
      required: [true, 'City is required.'], 
      trim: true 
    },
    createdBy: { 
      type: String, 
      required: [true, 'Creator information is required.'] 
    },
  },
  { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Mess model
// Checks if the model already exists before defining it to prevent OverwriteModelError
const Mess = mongoose.models.Mess || mongoose.model<IMess>('Mess', MessSchema);

export default Mess;