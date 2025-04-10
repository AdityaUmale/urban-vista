'use client';

import { useState } from "react"
import { ExternalLink, Mail, MapPin, Phone, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface HospitalProps {
  hospital: {
    _id: string;
    name: string;
    address: string;
    phone: string;
    website: string;
    description: string;
    image: string;
    createdBy: string;
  };
}

export default function HospitalCard({ hospital }: HospitalProps) {
  const [imageError, setImageError] = useState(false)
  
  // Extract domain name from website link for display
  const websiteDomain = hospital.website ? hospital.website.replace(/^https?:\/\//, "").replace(/\/$/, "") : ""

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Check if the image URL is a Google search URL
  const isGoogleSearchUrl = hospital.image?.includes("google.com/url");

  // Determine if we should show the fallback
  const showFallback = !hospital.image || imageError || isGoogleSearchUrl;

  return (
    <Card className="overflow-hidden max-w-md w-full">
      <div className="relative h-48 w-full bg-gray-100">
        {!showFallback ? (
          <Image
            src={hospital.image}
            alt={hospital.name}
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
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{hospital.name}</h2>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{hospital.address}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {hospital.description || 'No description available'}
        </p>

        <div className="space-y-2">
          {hospital.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{hospital.phone}</span>
            </div>
          )}

          {hospital.website && (
            <div className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
              <Link
                href={hospital.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {websiteDomain}
              </Link>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(hospital.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">Created by</p>
            <p className="text-sm font-medium">{hospital.createdBy}</p>
          </div>
        </div>

        <Button variant="outline" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
}

