import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Utensils, ExternalLink, Mail, MapPin, Phone, ArrowLeft, Clock, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Update the API endpoint in the getFoodPlaceById function
async function getFoodPlaceById(id: string) {
  try {
    // Use a hardcoded base URL if the environment variable is not available
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Change this line to use the correct API endpoint
    const response = await fetch(`${baseUrl}/api/food`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // Extract food places from the response - update this to match your API response structure
    const foodPlaces = data.foods;
    
    if (!foodPlaces || !Array.isArray(foodPlaces)) {
      console.error("API response is not in expected format:", data);
      return null;
    }
    
    // Find the specific food place by ID
    return foodPlaces.find((place: { _id: string }) => place._id === id) || null;
  } catch (error) {
    console.error("Error fetching food place:", error);
    return null;
  }
}

export default async function FoodDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const foodPlace = await getFoodPlaceById(id);
  
  if (!foodPlace) {
    notFound();
  }

  // Add websiteDomain calculation
  const websiteDomain = foodPlace.websiteLink 
    ? foodPlace.websiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "") 
    : "";

  const getInitials = (name: string = "") => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const isGoogleSearchUrl = foodPlace.image?.includes("google.com/url");
  const showFallback = !foodPlace.image || isGoogleSearchUrl;
  
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <Link href="/food" className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all food places
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column - Image and basic info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={foodPlace.image}  // Changed from Image to image
                  alt={foodPlace.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                  <Utensils className="h-20 w-20 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">No image available</p>
                </div>
              )}
            </div>
            
            {/* Update other property references */}
            {foodPlace.phone && (  // Changed from Phone to phone
              <div className="flex items-center group">
                <Phone className="h-5 w-5 text-primary" />
                <span>{foodPlace.phone}</span>
              </div>
            )}
            
            {foodPlace.websiteLink && (  // Changed from WebsiteLink to websiteLink
              <div className="flex items-center group">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <ExternalLink className="h-5 w-5 text-primary" />
                </div>
                <a
                  href={foodPlace.WebsiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {websiteDomain}
                </a>
              </div>
            )}
            
            {foodPlace.description && (  // Changed from Description to description
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {foodPlace.description}
              </p>
            )}
            
            {foodPlace.cuisine && (  // Changed from Cuisine to cuisine
              <div className="flex flex-wrap gap-2 mt-4">
                {foodPlace.cuisine.split(',').map((cuisine: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100">
                    {cuisine.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            <div className="space-y-5">
              {foodPlace.phone && ( // Corrected to lowercase 'phone'
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{foodPlace.phone}</span>
                </div>
              )}
              
              {foodPlace.websiteLink && ( // Corrected to lowercase 'websiteLink'
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href={foodPlace.websiteLink} // Corrected to lowercase 'websiteLink'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {websiteDomain}
                  </a>
                </div>
              )}

              {foodPlace.googleMapsUrl && ( // Added Google Maps URL display
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href={foodPlace.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    View on Google Maps
                  </a>
                </div>
              )}
              
              {foodPlace.hours && ( // Corrected to lowercase 'hours' if it exists in your schema like this
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{foodPlace.hours}</span>
                </div>
              )}
              
              <Button className="w-full mt-6 rounded-lg h-12 font-medium shadow-sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact Restaurant
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 mr-3">{foodPlace.name}</h1>
                  {foodPlace.Rating && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                      {foodPlace.Rating}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin className="h-5 w-5 mr-2 text-primary/70" />
                  <span>{foodPlace.address}</span>
                </div>
                {foodPlace.Cuisine && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {foodPlace.Cuisine.split(',').map((cuisine: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100">
                        {cuisine.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3 mt-6 md:mt-0 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(foodPlace.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created by</p>
                  <p className="font-medium text-gray-800">{foodPlace.createdBy}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {foodPlace.description || 'No description available'} 
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