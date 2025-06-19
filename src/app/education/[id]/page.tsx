import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Building2, ExternalLink, MapPin, Phone, ArrowLeft, FileDown } from "lucide-react";
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
    return institutes.find((inst: { _id: string }) => inst._id === id) || null;
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
    <div className="container py-12 max-w-6xl ml-32">
      <Link href="/education" className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all institutes
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column - Image and basic info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={institute.Image}
                  alt={institute.name}
                  fill
                  className="object-cover"
                  priority
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
              {institute.Phone && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{institute.Phone}</span>
                </div>
              )}
              
              {institute.WebsiteLink && (
                <div className="flex items-center group overflow-hidden"> {/* Added overflow-hidden here */} 
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0"> {/* Added flex-shrink-0 */} 
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href={institute.WebsiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors truncate" /* Added truncate */
                    title={websiteDomain} /* Added title attribute for full URL on hover */
                  >
                    {websiteDomain}
                  </a>
                </div>
              )}

              {/* Display Google Maps URL */}
              {institute.googleMapsUrl && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href={institute.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    View on Google Maps
                  </a>
                </div>
              )}

              {/* Add PDF Download Button */} 
              {institute.pdfUrl && (
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FileDown className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href={institute.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Download {/* Changed text to always be "Download" */}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{institute.name}</h1>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin className="h-5 w-5 mr-2 text-primary/70" />
                  <span>{institute.address}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6 md:mt-0 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(institute.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created by</p>
                  <p className="font-medium text-gray-800">{institute.createdBy}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {institute.Description || 'No description available'}
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