import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Home, Mail, MapPin, ArrowLeft, IndianRupee } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

async function getRentalById(id: string) {
  try {
    // Use a hardcoded base URL if the environment variable is not available
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Fetch all rentals
    const response = await fetch(`${baseUrl}/api/rentals`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // Extract rentals from the response
    const rentals = data.rentals;
    
    if (!rentals || !Array.isArray(rentals)) {
      console.error("API response is not in expected format:", data);
      return null;
    }
    
    // Find the specific rental by ID
    return rentals.find((rental: any) => rental._id === id) || null;
  } catch (error) {
    console.error("Error fetching rental:", error);
    return null;
  }
}

export default async function RentalDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Fix for the params warning - use Promise.resolve to ensure params is awaited
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const rental = await getRentalById(id);
  
  if (!rental) {
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
  
  // Combine all image validation logic into a single section
  const isGoogleSearchUrl = rental.image?.includes("google.com/url");
  const isValidImage = rental.image && 
    typeof rental.image === 'string' && 
    rental.image.startsWith('http');
  const showFallback = !isValidImage || isGoogleSearchUrl;
  
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <Link href="/rentals" className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all rentals
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column - Image and basic info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={rental.image}
                  alt={rental.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                  <Home className="h-20 w-20 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">No image available</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Property Details</h2>
            <div className="space-y-5">
              {rental.price && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <IndianRupee className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-semibold">
                    {rental.price}
                  </span>
                </div>
              )}
              
              {rental.address && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {rental.address}
                  </span>
                </div>
              )}

              {/* Add Google Maps URL link here */}
              {rental.googleMapsUrl && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <Link href={rental.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline group-hover:text-primary-dark transition-colors">
                    View on Google Maps
                  </Link>
                </div>
              )}
              
              <Button className="w-full mt-6 rounded-lg h-12 font-medium shadow-sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact Owner
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{rental.name}</h1>
                {rental.city && (
                  <Badge className="mt-3 bg-blue-50 text-blue-700 border-blue-200">
                    {rental.city}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-3 mt-6 md:mt-0 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(rental.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Listed by</p>
                  <p className="font-medium text-gray-800">{rental.createdBy || "Property Owner"}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">About this property</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {rental.description || 'No description available'}
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