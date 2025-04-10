'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building2, Clock, DollarSign } from "lucide-react"
import Image from "next/image"

interface JobCardProps {
  job: {
    _id: string
    title: string
    company: string
    location: string
    type: string
    salary: number
    description: string
    image: string
    createdAt: string
    createdBy: string
  }
}

export default function JobCard({ job }: JobCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src={job.image}
              alt={job.company}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{formatSalary(job.salary)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
          <p className="text-sm mt-4 line-clamp-3">{job.description}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  )
} 