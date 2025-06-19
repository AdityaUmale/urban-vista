import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, // Keep this for the new link
  ArrowLeft,
  DollarSign,
  Utensils, 
  CalendarDays,
  Info, 
  Phone,
  Clock,
  ExternalLink
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Define the Mess interface (ensure this matches your model)
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
  googleMapsUrl?: string; // Added Google Maps URL field
  city: string;
  createdBy: string;
  createdAt: string; // Assuming string from API
  updatedAt: string; // Assuming string from API
}

async function getMessById(id: string): Promise<IMess | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/mess/${id}`, {
      cache: "no-store", // Fetch fresh data every time
    });

    if (!response.ok) {
      // If status is 404, it means not found
      if (response.status === 404) {
        return null;
      }
      // For other errors, log and return null
      const errorData = await response.json().catch(() => ({})); // Try to parse error
      console.error(`Error fetching mess ${id}:`, response.status, errorData.message || response.statusText);
      return null;
    }

    const mess = await response.json();
    return mess;
  } catch {
    notFound();
    return null;
  }
}

export default async function MessDetailPage({ params }: { params: Promise<{ id: string }> }){
  // Await the params object before accessing its properties
  // Although often not strictly necessary in page components, it's good practice
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id; // Use the resolved params

  if (!id) {
    notFound();
  }

  const mess = await getMessById(id);

  if (!mess) {
    notFound();
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      console.log(e);
      return "Invalid Date";
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "M"; // Fallback initial
  };

  // Check if the image URL is valid
  const showFallback = !mess.image;
  const websiteDomain = mess.websiteLink ? mess.websiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <Link href="/mess" className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all messes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column - Mess Image & Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={mess.image as string}
                  alt={mess.name}
                  fill
                  className="object-cover"
                  priority
                  // Add onError handler if needed
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                  <Utensils className="h-20 w-20 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">No mess image</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Mess Information</h2>
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                  <Utensils className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mess Name</p>
                  <p className="font-medium">{mess.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{mess.address}, {mess.city}</p>
                </div>
              </div>
              
              {mess.phone && (
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{mess.phone}</p>
                  </div>
                </div>
              )}
              
              {mess.websiteLink && (
                 <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  <div className="overflow-hidden"> {/* Added for truncation */} 
                    <p className="text-sm text-gray-500">Website</p>
                    <a 
                      href={mess.websiteLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-primary hover:underline truncate block" /* Added truncate */
                      title={mess.websiteLink} /* Added title */
                    >
                      {websiteDomain}
                    </a>
                  </div>
                </div>
              )}

              {/* Added Google Maps Link Section - This part looks correct */}
              {mess.googleMapsUrl && (
                 <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-500">Location</p>
                    <a 
                      href={mess.googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-primary hover:underline truncate block"
                      title={mess.googleMapsUrl} 
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Listed on</p>
                  <p className="font-medium">{formatDate(mess.createdAt)}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right column - Details & Apply */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{mess.name}</h1>
                {/* Badges for Price/Timings */} 
                <div className="flex flex-wrap gap-2 mt-3">
                  {mess.vegPrice !== undefined && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Veg: ₹{mess.vegPrice}
                    </Badge>
                  )}
                  {mess.nonVegPrice !== undefined && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Non-Veg: ₹{mess.nonVegPrice}
                    </Badge>
                  )}
                  {mess.timings && (
                     <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Clock className="h-3 w-3 mr-1" />
                      {mess.timings}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-6 md:mt-0 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(mess.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Listed by</p>
                  <p className="font-medium text-gray-800">{mess.createdBy}</p>
                </div>
              </div>
            </div>

            {mess.description && (
              <div className="border-t border-gray-100 pt-8">
                <h2 className="text-xl font-semibold mb-5 text-gray-800">Description</h2>
                <div className="prose max-w-none text-gray-700">
                  {/* Use pre-wrap to preserve line breaks from textarea */} 
                  <p className="whitespace-pre-wrap">{mess.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact/Apply Section */} 
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">Contact / Apply</h2>
            <p className="text-gray-700 mb-6">
              Interested in this mess service? Use the button below to contact them or apply if a link is available.
            </p>
            {mess.applicationUrl ? (
              <Button asChild className="w-full md:w-auto">
                <a href={mess.applicationUrl} target="_blank" rel="noopener noreferrer">
                  <Info className="h-4 w-4 mr-2" />
                  Contact / Apply Now
                </a>
              </Button>
            ) : (
              <Button className="w-full md:w-auto" disabled>
                <Info className="h-4 w-4 mr-2" />
                Contact / Apply (Link not available)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}