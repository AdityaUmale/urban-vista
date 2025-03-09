import { useState } from "react"
import { ExternalLink, Mail, MapPin, Phone, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface EduInstituteProps {
  institute: {
    _id: string;
    name: string;
    address: string;
    Phone: string;
    WebsiteLink: string;
    Description: string;
    Image: string;
    createdBy: string;
  };
}

export default function EduInstituteCard({ institute }: EduInstituteProps) {
  const [imageError, setImageError] = useState(false)
  
  // Extract domain name from website link for display
  const websiteDomain = institute.WebsiteLink ? institute.WebsiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "") : ""

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Check if the image URL is a Google search URL
  const isGoogleSearchUrl = institute.Image?.includes("google.com/url");

  // Determine if we should show the fallback
  const showFallback = !institute.Image || imageError || isGoogleSearchUrl;

  return (
    <Card className="overflow-hidden max-w-md w-full">
      <div className="relative h-48 w-full bg-gray-100">
        {!showFallback ? (
          <Image
            src={institute.Image}
            alt={institute.name}
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
            <h2 className="text-2xl font-bold">{institute.name}</h2>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{institute.address}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {institute.Description || 'No description available'}
        </p>

        <div className="space-y-2">
          {institute.Phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{institute.Phone}</span>
            </div>
          )}

          {institute.WebsiteLink && (
            <div className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
              <Link
                href={institute.WebsiteLink}
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
            <AvatarFallback>{getInitials(institute.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">Created by</p>
            <p className="text-sm font-medium">{institute.createdBy}</p>
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

