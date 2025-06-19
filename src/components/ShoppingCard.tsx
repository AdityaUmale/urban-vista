'use client';

import { useState } from "react"
import { ShoppingBag, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ShoppingCardProps {
  shopping: {
    _id?: string;
    name: string;
    address?: string;
    type?: string;
    timings?: string;
    description?: string;
    image?: string;
    createdBy?: string;
  };
}

export default function ShoppingCard({ shopping }: ShoppingCardProps) {
  const [isValidImage, setIsValidImage] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  const handleImageError = () => {
    setIsValidImage(false);
    setShowFallback(true);
  };

  if (!shopping) {
    return null;
  }

  const isGoogleSearchUrl = shopping.image?.includes("google.com/url");
  if (!isValidImage || isGoogleSearchUrl) {
    setShowFallback(true);
  }

  // Get initials for avatar fallback - with null check
  const getInitials = (name: string = "") => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Link href={`/shopping/${shopping._id || ""}`} className="block">
      <Card className="overflow-hidden max-w-md w-full transition-all duration-200 hover:shadow-lg">
        <div className="relative h-48 w-full bg-gray-100">
          {!showFallback ? (
            <Image
              src={shopping.image || ""}
              alt={shopping.name || "Shopping place"}
              fill
              className="object-cover"
              priority
              onError={handleImageError}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100">
              <ShoppingBag className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No image available</p>
            </div>
          )}
          {shopping.type && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                {shopping.type}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{shopping.name || "Unnamed Place"}</h2>
              {shopping.address && (
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{shopping.address}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {shopping.description || 'No description available'}
          </p>

          {shopping.timings && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{shopping.timings}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(shopping.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Added by</p>
              <p className="text-sm font-medium">{shopping.createdBy || "Admin"}</p>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              // Get directions functionality can be added here
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