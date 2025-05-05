import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the structure of a Mess document
export interface IMess extends Document {
  name: string;
  address: string;
  phone?: string; // Optional phone number
  websiteLink?: string; // Optional website link
  description?: string; // Optional description
  image?: string; // URL for the mess image
  vegPrice?: number; // Price for veg tiffin
  nonVegPrice?: number; // Price for non-veg tiffin
  timings?: string; // Operating hours or meal timings
  applicationUrl?: string; // Link to apply or contact
  city: string; // City where the mess is located
  createdBy: string; // User who added the mess
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