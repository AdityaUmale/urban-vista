import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ExternalLink,
  MapPin,
  Phone,
  ArrowLeft,
  FileDown,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define the type for an individual institute
interface Institute {
  _id: string;
  name: string;
  address: string;
  Phone?: string;
  WebsiteLink?: string;
  googleMapsUrl?: string;
  pdfUrl?: string;
  Image?: string;
  createdBy: string;
  Description?: string;
}

// Fetch an institute by its ID
async function getInstituteById(id: string): Promise<Institute | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    // Ideally fetch a single institute by ID from the API
    const response = await fetch(`${baseUrl}/api/eduInstitutes/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;

    const data = await response.json();
    return data.institute || null;
  } catch {
    return null;
  }
}

// Page component now accepts params as a Promise
export default async function InstituteDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  // Await to unwrap the params promise
  const { id } = await params;
  if (!id) notFound();

  const institute = await getInstituteById(id);
  if (!institute) notFound();

  const websiteDomain = institute.WebsiteLink
    ? institute.WebsiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "";

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const showFallback = !institute.Image || institute.Image.includes("google.com/url");

  return (
    <div className="container py-12 max-w-6xl ml-32">
      <Link
        href="/education"
        className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all institutes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={institute.Image!}
                  alt={institute.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <Building2 className="h-20 w-20 text-gray-300" />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            <div className="space-y-5">
              {institute.Phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-4" />
                  <span>{institute.Phone}</span>
                </div>
              )}
              {institute.WebsiteLink && (
                <div className="flex items-center">
                  <ExternalLink className="h-5 w-5 text-primary mr-4" />
                  <a href={institute.WebsiteLink} target="_blank" rel="noopener noreferrer">
                    {websiteDomain}
                  </a>
                </div>
              )}
              {institute.googleMapsUrl && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-4" />
                  <a href={institute.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    View on Google Maps
                  </a>
                </div>
              )}
              {institute.pdfUrl && (
                <div className="flex items-center">
                  <FileDown className="h-5 w-5 text-primary mr-4" />
                  <a href={institute.pdfUrl} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">{institute.name}</h1>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2 text-primary/70" />
                  <span>{institute.address}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14">
                  <AvatarFallback>
                    {getInitials(institute.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created by</p>
                  <p className="font-medium text-gray-800">{institute.createdBy}</p>
                </div>
              </div>
            </div>
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold mb-5">About</h2>
              <p className="leading-relaxed whitespace-pre-wrap">
                {institute.Description || "No description available"}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-5">Location</h2>
            <div className="bg-gray-50 rounded-lg h-72 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary/70" />
              <p className="ml-3">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
