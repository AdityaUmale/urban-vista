import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Building2, ExternalLink, Mail, MapPin, Phone, ArrowLeft} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

async function getHospitalById(id: string) {
  try {
    // Use a hardcoded base URL if the environment variable is not available
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Fetch all hospitals
    const response = await fetch(`${baseUrl}/api/hospitals`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // Extract hospitals from the response
    const hospitals = data.hospitals;
    
    if (!hospitals || !Array.isArray(hospitals)) {
      console.error("API response is not in expected format:", data);
      return null;
    }
    
    // Find the specific hospital by ID
    return hospitals.find((hospital: { _id: string }) => hospital._id === id) || null;
  } catch (error) {
    console.error("Error fetching hospital:", error);
    return null;
  }
}

export default async function HospitalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  if (!id) {
    notFound();
  }
  
  const hospital = await getHospitalById(id);
  
  if (!hospital) {
    notFound();
  }

  // Define getInitials function
  const getInitials = (name: string = "") => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  
  // Extract domain name from website link for display
  // Move all variable declarations before return
  const websiteDomain = hospital.websiteLink 
    ? hospital.websiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "") 
    : "";

  const isValidImage = hospital.image && 
    typeof hospital.image === 'string' && 
    (hospital.image.startsWith('http://') || hospital.image.startsWith('https://'));
  const isGoogleSearchUrl = hospital.image?.includes("google.com/url");
  const showFallback = !isValidImage || isGoogleSearchUrl;

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <Link href="/hospitals" className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all hospitals
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={hospital.image}
                  alt={hospital.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                  <Building2 className="h-20 w-20 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">No image available</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            <div className="space-y-5">
              {hospital.Phone && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{hospital.Phone}</span>
                </div>
              )}
              
              {hospital.WebsiteLink && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href={hospital.WebsiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {websiteDomain}
                  </a>
                </div>
              )}

              {hospital.googleMapsUrl && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" /> {/* Using MapPin icon for location */}
                  </div>
                  <a
                    href={hospital.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {/* You can display the full URL or a custom text like "View on Google Maps" */}
                    View on Google Maps 
                  </a>
                </div>
              )}
              
              <Button className="w-full mt-6 rounded-lg h-12 font-medium shadow-sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact Hospital
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hospital.name}</h1>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin className="h-5 w-5 mr-2 text-primary/70" />
                  <span>{hospital.address}</span>
                </div>
                {hospital.city && (
                  <Badge className="mt-3 bg-blue-50 text-blue-700 border-blue-200">
                    {hospital.city}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-3 mt-6 md:mt-0 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(hospital.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created by</p>
                  <p className="font-medium text-gray-800">{hospital.createdBy}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {hospital.description || 'No description available'}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">Location</h2>
            <div className="bg-gray-50 rounded-lg h-72 flex items-center justify-center border border-gray-100">
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full inline-flex mb-3">
                  <MapPin className="h-8 w-8 text-primary/70" />
                </div>
                <p className="text-gray-500">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}