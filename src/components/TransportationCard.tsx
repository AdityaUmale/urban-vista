'use client';

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

export function TransportationCard({ transportation }: TransportationCardProps) {
  const [isValidImage, setIsValidImage] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  const handleImageError = () => {
    setIsValidImage(false);
    setShowFallback(true);
  };

  if (!transportation) {
    return null;
  }

  // Get initials for avatar fallback
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const isGoogleSearchUrl = transportation.image?.includes("google.com/url");
  if (!isValidImage || isGoogleSearchUrl) {
    setShowFallback(true);
  }

  return (
    <Link href={`/transportation/${transportation._id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-48">
          {!showFallback ? (
            <Image
              src={transportation.image || ""}
              alt={transportation.name}
              fill
              className="object-cover"
              priority
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <Avatar className="w-16 h-16">
                <AvatarFallback>{getInitials(transportation.name)}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{transportation.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{transportation.address}</p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-medium">₹{transportation.price}</span>
            <span className="text-sm text-gray-500">{transportation.type}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}