'use client';

import { useState } from "react"
import { Bus, Clock, MapPin, ExternalLink, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TransportationCardProps {
  transportation: {
    _id: string;
    name: string;
    address: string;
    phone?: string;         // Changed from Phone
    websiteLink?: string;   // Changed from WebsiteLink
    description?: string;   // Changed from Description
    image?: string;         // Changed from Image
    googleMapsUrl?: string; // Added new field
    createdBy: string;
    city: string;
    type?: string;
    timings?: string;
  };
}

export default function TransportationCard({ transportation }: TransportationCardProps) {
  // Add a safety check at the beginning
  if (!transportation) {
    return null; // Don't render anything if transportation is undefined
  }

  const [imageError, setImageError] = useState(false)
  
  // Extract domain name from website link for display
  const websiteDomain = transportation.websiteLink ? transportation.websiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "") : ""
  
  // Get initials for avatar fallback - with null check
  const getInitials = (name: string = "") => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Check if the image URL is a Google search URL - with null check
  const isGoogleSearchUrl = transportation.image?.includes("google.com/url");

  // Determine if we should show the fallback
  const showFallback = !transportation.image || imageError || isGoogleSearchUrl;

  // Handle external website click
  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (transportation.websiteLink) {
      window.open(transportation.websiteLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link href={`/transportation/${transportation._id}`} className="block">
      <Card className="overflow-hidden max-w-md w-full transition-all duration-200 hover:shadow-lg">
        <div className="relative h-48 w-full bg-gray-100">
          {!showFallback ? (
            <Image
              src={transportation.image}
              alt={transportation.name}
              fill
              className="object-cover"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100">
              <Bus className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No image available</p>
            </div>
          )}
          {transportation.type && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                {transportation.type}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{transportation.name}</h2>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{transportation.address}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {transportation.description || 'No description available'}
          </p>

          <div className="space-y-2">
            {transportation.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{transportation.phone}</span>
              </div>
            )}

            {transportation.websiteLink && (
              <div className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                <button
                  onClick={handleWebsiteClick}
                  className="text-sm text-primary hover:underline text-left"
                >
                  {websiteDomain}
                </button>
              </div>
            )}
            
            {transportation.timings && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{transportation.timings}</span>
              </div>
            )}

            {/* Add Google Maps URL if available */}
            {transportation.googleMapsUrl && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(transportation.googleMapsUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-sm text-primary hover:underline text-left"
                >
                  View on Maps
                </button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(transportation.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Added by</p>
              <p className="text-sm font-medium">{transportation.createdBy}</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              // Use googleMapsUrl if available, otherwise fall back to address search
              if (transportation.googleMapsUrl) {
                window.open(transportation.googleMapsUrl, '_blank', 'noopener,noreferrer');
              } else {
                const address = encodeURIComponent(transportation.address);
                window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank', 'noopener,noreferrer');
              }
            }}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Directions
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}