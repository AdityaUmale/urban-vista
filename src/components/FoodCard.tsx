'use client';

import { useState } from "react"
import { ExternalLink, Mail, MapPin, Phone, Utensils, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FoodCardProps {
  foodPlace: {
    _id?: string;
    name: string;
    address?: string;
    Phone?: string;
    WebsiteLink?: string;
    Description?: string;
    Image?: string;
    Cuisine?: string;
    Rating?: string;
    Hours?: string;
    createdBy?: string;
  };
}

export default function FoodCard({ foodPlace }: FoodCardProps) {
  // Add a safety check at the beginning
  if (!foodPlace) {
    return null; // Don't render anything if foodPlace is undefined
  }

  const [imageError, setImageError] = useState(false)
  
  // Extract domain name from website link for display - with null check
  const websiteDomain = foodPlace.WebsiteLink 
    ? foodPlace.WebsiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "") 
    : "";

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
  const isGoogleSearchUrl = foodPlace.Image?.includes("google.com/url");

  // Determine if we should show the fallback
  const showFallback = !foodPlace.Image || imageError || isGoogleSearchUrl;

  // Handle external website click
  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (foodPlace.WebsiteLink) {
      window.open(foodPlace.WebsiteLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link href={`/food/${foodPlace._id || ""}`} className="block">
      <Card className="overflow-hidden max-w-md w-full transition-all duration-200 hover:shadow-lg">
        <div className="relative h-48 w-full bg-gray-100">
          {!showFallback ? (
            <Image
              src={foodPlace.Image || ""}
              alt={foodPlace.name || "Food place"}
              fill
              className="object-cover"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100">
              <Utensils className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No image available</p>
            </div>
          )}
          {foodPlace.Rating && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                {foodPlace.Rating}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{foodPlace.name || "Unnamed Place"}</h2>
              {foodPlace.address && (
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{foodPlace.address}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {foodPlace.Description || 'No description available'}
          </p>

          {foodPlace.Cuisine && (
            <div className="flex flex-wrap gap-1">
              {foodPlace.Cuisine.split(',').map((cuisine, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {cuisine.trim()}
                </Badge>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {foodPlace.Phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{foodPlace.Phone}</span>
              </div>
            )}

            {foodPlace.WebsiteLink && (
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
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(foodPlace.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Created by</p>
              <p className="text-sm font-medium">{foodPlace.createdBy || "Unknown"}</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}