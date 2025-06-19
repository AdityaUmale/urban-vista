'use client';

import { useState } from "react"
import { MapPin, DollarSign} from "lucide-react"
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

export function RealEstateCard({ property }: RealEstateCardProps) {
  const [isValidImage, setIsValidImage] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  const handleImageError = () => {
    setIsValidImage(false);
    setShowFallback(true);
  };

  if (!property) {
    return null;
  }

  const isGoogleSearchUrl = property.image?.includes("google.com/url");
  if (!isValidImage || isGoogleSearchUrl) {
    setShowFallback(true);
  }

  // Get initials for avatar fallback
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
              onError={handleImageError}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100">
              <Avatar className="w-16 h-16">
                <AvatarFallback>{getInitials(property.name)}</AvatarFallback>
              </Avatar>
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