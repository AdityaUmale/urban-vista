'use client';

import { useState } from "react";
import { MapPin, Phone, ExternalLink, Utensils, DollarSign, Clock, Info } from "lucide-react"; // Added relevant icons
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Assuming IMess interface is defined elsewhere or copied here
interface IMess {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  websiteLink?: string;
  description?: string;
  image?: string;
  vegPrice?: number;
  nonVegPrice?: number;
  timings?: string;
  applicationUrl?: string;
  city: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MessCardProps {
  mess: IMess;
}

export default function MessCard({ mess }: MessCardProps) {
  const [imageError, setImageError] = useState(false);

  // Extract domain name from website link for display
  const websiteDomain = mess.websiteLink ? mess.websiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Determine if we should show the fallback
  const showFallback = !mess.image || imageError;

  // Handle external website click
  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (mess.websiteLink) {
      window.open(mess.websiteLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle apply button click
  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (mess.applicationUrl) {
      window.open(mess.applicationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link href={`/mess/${mess._id}`} className="block"> {/* Assuming detail page route */}
      <Card className="overflow-hidden max-w-md w-full transition-all duration-200 hover:shadow-lg">
        <div className="relative h-48 w-full bg-gray-100">
          {!showFallback ? (
            <Image
              src={mess.image as string}
              alt={mess.name}
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
        </div>

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{mess.name}</h2>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{mess.address}, {mess.city}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {mess.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {mess.description}
            </p>
          )}

          <div className="space-y-2">
            {mess.vegPrice !== undefined && (
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-medium mr-1">Veg:</span> ₹{mess.vegPrice}
              </div>
            )}
            {mess.nonVegPrice !== undefined && (
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 mr-2 text-red-600" />
                <span className="font-medium mr-1">Non-Veg:</span> ₹{mess.nonVegPrice}
              </div>
            )}
            {mess.timings && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                {mess.timings}
              </div>
            )}
            {mess.phone && (
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                {mess.phone}
              </div>
            )}
            {mess.websiteLink && (
              <div className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                <button
                  onClick={handleWebsiteClick}
                  className="text-sm text-primary hover:underline text-left truncate"
                  title={mess.websiteLink}
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
              {/* You might want a default mess avatar or use initials */}
              <AvatarFallback>{getInitials(mess.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Added by</p>
              <p className="text-sm font-medium">{mess.createdBy}</p>
            </div>
          </div>

          {mess.applicationUrl ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleApplyClick}
            >
              <Info className="h-4 w-4 mr-2" /> {/* Changed icon */}
              Apply / Contact
            </Button>
          ) : (
             <Badge variant="secondary">Info Only</Badge> // Show badge if no apply link
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}