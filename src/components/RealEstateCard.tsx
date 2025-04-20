'use client';

import { useState } from "react"
import { Building2, MapPin, DollarSign} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RealEstateCardProps {
  property: {
    _id?: string;
    name: string;
    address?: string;
    price?: number;
    type?: string;
    description?: string;
    image?: string;
    createdBy?: string;
  };
}

export default function RealEstateCard({ property }: RealEstateCardProps) {
  // Add a safety check at the beginning
  if (!property) {
    return null; // Don't render anything if property is undefined
  }

  const [imageError, setImageError] = useState(false)
  
  // Get initials for avatar fallback - with null check
  const getInitials = (name: string = "") => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Determine if we should show the fallback
  const showFallback = !property.image || imageError;

  // Format price
  const formatPrice = (price?: number) => {
    if (!price) return "Price not available";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Link href={`/real-estate/${property._id || ""}`} className="block">
      <Card className="overflow-hidden max-w-md w-full transition-all duration-200 hover:shadow-lg">
        <div className="relative h-48 w-full bg-gray-100">
          {!showFallback ? (
            <Image
              src={property.image || ""}
              alt={property.name || "Real estate property"}
              fill
              className="object-cover"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100">
              <Building2 className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No image available</p>
            </div>
          )}
          {property.type && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                {property.type}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{property.name || "Unnamed Property"}</h2>
              {property.address && (
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.address}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {property.description || 'No description available'}
          </p>

          {property.price !== undefined && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">{formatPrice(property.price)}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(property.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Listed by</p>
              <p className="text-sm font-medium">{property.createdBy || "Property Owner"}</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/real-estate/${property._id || ""}`;
            }}
          >
            <MapPin className="h-4 w-4 mr-2" />
            View
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}