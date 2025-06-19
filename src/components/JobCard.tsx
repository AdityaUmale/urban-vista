'use client';

import { useState } from "react";
import { Briefcase, Building, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: {
    _id?: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    image?: string;
    createdAt?: string;
    applicationUrl?: string; // Add this new field
  };
}

export default function JobCard({ job }: JobCardProps) {
  const [isValidImage, setIsValidImage] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  const handleImageError = () => {
    setIsValidImage(false);
    setShowFallback(true);
  };

  if (!job) {
    return null;
  }

  const isGoogleSearchUrl = job.image?.includes("google.com/url");
  if (!isValidImage || isGoogleSearchUrl) {
    setShowFallback(true);
  }

  // Format date if available
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently posted";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Handle application button click
  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (job.applicationUrl) {
      window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link href={`/jobs/${job._id || ""}`} className="block">
      <Card className="overflow-hidden max-w-md w-full transition-all duration-200 hover:shadow-lg">
        <div className="relative h-48 w-full bg-gray-100">
          {!showFallback ? (
            <Image
              src={job.image || ''}
              alt={job.company}
              fill
              className="object-cover"
              priority
              onError={handleImageError}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100">
              <Building className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No company image</p>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {job.type}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <div className="flex items-center text-muted-foreground mt-1">
                <Building className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.company}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              {job.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
              {job.salary}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {formatDate(job.createdAt)}
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={handleApplyClick}
            disabled={!job.applicationUrl}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Apply
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}