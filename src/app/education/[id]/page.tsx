import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Building2, ExternalLink, Mail, MapPin, Phone, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

async function getInstituteById(id: string) {
  try {
    // Use a hardcoded base URL if the environment variable is not available
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Fetch all institutes
    const response = await fetch(`${baseUrl}/api/eduInstitutes`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // Based on the terminal output, the institutes are in data.institutes
    const institutes = data.institutes;
    
    if (!institutes || !Array.isArray(institutes)) {
      console.error("API response is not in expected format:", data);
      return null;
    }
    
    // Find the specific institute by ID
    return institutes.find((inst: any) => inst._id === id) || null;
  } catch (error) {
    console.error("Error fetching institute:", error);
    return null;
  }
}

export default async function InstituteDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Fix for the params warning - use Promise.resolve to ensure params is awaited
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const institute = await getInstituteById(id);
  
  if (!institute) {
    notFound();
  }
  
  // Rest of the component remains the same
  const websiteDomain = institute.WebsiteLink 
    ? institute.WebsiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "") 
    : "";
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  
  const isGoogleSearchUrl = institute.Image?.includes("google.com/url");
  const showFallback = !institute.Image || isGoogleSearchUrl;

  return (
    <div className="container max-w-4xl py-8">
      <Link href="/education" className="flex items-center text-primary mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all institutes
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 w-full bg-gray-100">
          {!showFallback ? (
            <Image
              src={institute.Image}
              alt={institute.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100">
              <Building2 className="h-16 w-16 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No image available</p>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold">{institute.name}</h1>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{institute.address}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{getInitials(institute.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Created by</p>
                <p className="font-medium">{institute.createdBy}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-b py-6 my-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {institute.Description || 'No description available'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {institute.Phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{institute.Phone}</span>
                  </div>
                )}
                
                {institute.WebsiteLink && (
                  <div className="flex items-center">
                    <ExternalLink className="h-5 w-5 mr-3 text-muted-foreground" />
                    <a
                      href={institute.WebsiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {websiteDomain}
                    </a>
                  </div>
                )}
                
                <Button className="mt-4">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Institute
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="bg-gray-100 rounded-md h-48 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Map view not available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}