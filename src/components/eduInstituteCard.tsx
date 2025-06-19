import { useState } from "react"
import { ExternalLink, MapPin, Phone, FileDown, Building2 } from "lucide-react"
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
    pdfUrl?: string;
    pdfName?: string;
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

  // Handle external website click
  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (institute.WebsiteLink) {
      window.open(institute.WebsiteLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle PDF download
  const handlePdfDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (institute.pdfUrl) {
      window.open(institute.pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link href={`/education/${institute._id}`} className="block">
      <Card className="overflow-hidden max-w-md w-full transition-all duration-200 hover:shadow-lg">
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
                <button
                  onClick={handleWebsiteClick}
                  className="text-sm text-primary hover:underline text-left"
                >
                  {websiteDomain}
                </button>
              </div>
            )}
            
            {/* PDF Download Button */}
            {institute.pdfUrl && (
              <div className="flex items-center">
                <FileDown className="h-4 w-4 mr-2 text-muted-foreground" />
                <button
                  onClick={handlePdfDownload}
                  className="text-sm text-primary hover:underline text-left"
                >
                  {institute.pdfName || 'Download PDF'}
                </button>
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

          {/* Show PDF download button if available, otherwise show contact button */}
          
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePdfDownload}
            >
              <FileDown className="h-4 w-4 mr-2" />
              Download
            </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

