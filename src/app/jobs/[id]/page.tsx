import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, DollarSign, Building, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

async function getJobById(id: string) {
  try {
    // Use a hardcoded base URL if the environment variable is not available
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Fetch all jobs
    const response = await fetch(`${baseUrl}/api/jobs`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      return null;
    }
    
    const jobs = await response.json();
    
    if (!jobs || !Array.isArray(jobs)) {
      console.error("API response is not in expected format:", jobs);
      return null;
    }
    
    // Find the specific job by ID
    return jobs.find((job: { _id: string }) => job._id === id) || null;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export default async function JobDetailPage({ 
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
  
  const job = await getJobById(id);
  
  if (!job) {
    notFound();
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Get company initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  
  // Check if the image URL is valid
  const showFallback = !job.image;

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <Link href="/jobs" className="inline-flex items-center text-primary mb-10 hover:underline font-medium transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all jobs
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column - Company info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
            <div className="relative aspect-square w-full bg-gray-50">
              {!showFallback ? (
                <Image
                  src={job.image}
                  alt={job.company}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50">
                  <Building className="h-20 w-20 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400 font-medium">No company image</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Company Information</h2>
            <div className="space-y-5">
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{job.company}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{job.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posted on</p>
                  <p className="font-medium">{formatDate(job.createdAt)}</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Right column - Job Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {job.type}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {job.salary}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6 md:mt-0 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(job.company)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Company</p>
                  <p className="font-medium text-gray-800">{job.company}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">Job Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-wrap">{job.description}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">How to Apply</h2>
            <p className="text-gray-700 mb-6">
              Interested in this position? Submit your application by clicking the apply button and following the instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}