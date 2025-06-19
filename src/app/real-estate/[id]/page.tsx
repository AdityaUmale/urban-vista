import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, ArrowLeft, DollarSign, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Define the Property type
interface Property {
  _id: string;
  name: string;
  type?: string;
  price?: string;
  address?: string;
  description?: string;
  image?: string;
  createdBy?: string;
}

async function getPropertyById(id: string): Promise<Property | null> {
  try {
    // Use a hardcoded base URL if the environment variable is not available
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Fetch all properties
    const response = await fetch(`${baseUrl}/api/real-estate`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      console.error("API response not OK:", response.status);
      return null;
    }
    
    // Handle different response formats
    const data = await response.json();
    
    // Determine the structure of the response
    let properties: Property[];
    if (Array.isArray(data)) {
      // Direct array response
      properties = data;
    } else if (data.properties && Array.isArray(data.properties)) {
      // Object with properties array property
      properties = data.properties;
    } else {
      console.error("API response is not in expected format:", data);
      return null;
    }
    
    // Find the specific property by ID - now properly typed
    const property = properties.find((prop: Property) => prop._id === id);
    console.log("Found property:", property);
    return property || null;
  } catch (error: unknown) {
    console.error(`Error fetching real estate ${id}:`, error);
    notFound();
    return null;
  }
}

export default async function RealEstateDetailPage({ params }: { params: Promise<{ id: string }> }){
  // Fix for the params warning - use Promise.resolve to ensure params is awaited
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const property = await getPropertyById(id);
  
  if (!property) {
    notFound();
  }
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  
  // Check if the image URL is valid
  const showFallback = !property.image;

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <Link href="/real-estate" className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all properties
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column - Image and basic info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={property.image as string}
                  alt={property.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                  <Building2 className="h-20 w-20 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">No image available</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Property Details</h2>
            <div className="space-y-5">
              {property.type && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium">{property.type}</p>
                  </div>
                </div>
              )}
              
              {property.price && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">{property.price}</p>
                  </div>
                </div>
              )}
              
              {property.address && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{property.address}</p>
                  </div>
                </div>
              )}
              
              <Button className="w-full mt-6 rounded-lg h-12 font-medium shadow-sm">
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
                {property.type && (
                  <Badge className="mt-3 bg-blue-50 text-blue-700 border-blue-200">
                    {property.type}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-3 mt-6 md:mt-0 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(property.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Listed by</p>
                  <p className="font-medium text-gray-800">{property.createdBy || "Property Agent"}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">About this property</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {property.description || 'No description available'}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">Location</h2>
            <div className="bg-gray-50 rounded-lg h-72 flex items-center justify-center border border-gray-100">
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full inline-flex mb-3">
                  <MapPin className="h-8 w-8 text-primary/70" />
                </div>
                <p className="text-gray-500">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}