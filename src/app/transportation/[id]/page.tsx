import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bus, MapPin, ArrowLeft, Clock} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

async function getTransportationById(id: string) {
  try {
    // Use a hardcoded base URL if the environment variable is not available
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Fetch all transportation services
    const response = await fetch(`${baseUrl}/api/transportation`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      return null;
    }
    
    // The API returns an array directly, not an object with a transportationServices property
    const transportationServices = await response.json();
    
    if (!transportationServices || !Array.isArray(transportationServices)) {
      console.error("API response is not in expected format:", transportationServices);
      return null;
    }
    
    // Find the specific transportation service by ID
    return transportationServices.find((service: { _id: string }) => service._id === id) || null;
  } catch (error) {
    console.error("Error fetching transportation service:", error);
    return null;
  }
}

export default async function TransportationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Fix for the params warning - use Promise.resolve to ensure params is awaited
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const transportation = await getTransportationById(id);
  
  if (!transportation) {
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
  
  // Check if the image URL is a Google search URL
  const isGoogleSearchUrl = transportation.image?.includes("google.com/url");
  const showFallback = !transportation.image || isGoogleSearchUrl;

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <Link href="/transportation" className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all transportation services
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column - Image and basic info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={transportation.image}
                  alt={transportation.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                  <Bus className="h-20 w-20 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">No image available</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Service Details</h2>
            <div className="space-y-5">
              {transportation.type && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Bus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{transportation.type}</p>
                  </div>
                </div>
              )}
              
              {transportation.timings && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Operating Hours</p>
                    <p className="font-medium">{transportation.timings}</p>
                  </div>
                </div>
              )}
              
             
              {transportation.address && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{transportation.address}</p>
                  </div>
                </div>
              )}
              
              {/* Add Google Maps URL link */}
              {transportation.googleMapsUrl && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Maps</p>
                    <Link 
                      href={transportation.googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline font-medium"
                    >
                      View on Google Maps
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Update the Get Directions button */}
              <Link 
                href={transportation.googleMapsUrl || 
                  (transportation.address ? 
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(transportation.address)}` : 
                    '#')
              } 
              target="_blank" 
              rel="noopener noreferrer"
              >
                <Button className="w-full mt-6 rounded-lg h-12 font-medium shadow-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{transportation.name}</h1>
                {transportation.type && (
                  <Badge className="mt-3 bg-blue-50 text-blue-700 border-blue-200">
                    {transportation.type}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-3 mt-6 md:mt-0 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(transportation.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Added by</p>
                  <p className="font-medium text-gray-800">{transportation.createdBy || "Admin"}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">About this service</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {transportation.description || 'No description available'}
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