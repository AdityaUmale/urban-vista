'use client';

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface AddJobFormProps {
  onSuccess: () => void;
}

const isValidImageUrl = (url: string) => {
  if (!url) return true // Allow empty URLs
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname
    const allowedDomains = [
      'images.unsplash.com',
      'upload.wikimedia.org',
      'www.wikipedia.org',
      'wikipedia.org',
      'commons.wikimedia.org',
      'live.staticflickr.com',
      'i.imgur.com',
      'res.cloudinary.com'
    ]
    return allowedDomains.some(domain => hostname.includes(domain))
  } catch {
    return false
  }
}

export default function AddJobForm({ onSuccess }: AddJobFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setImageError(false)

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    try {
      // Validate image URL before submitting
      if (!isValidImageUrl(formData.get("image") as string)) {
        setImageError(true)
        toast({
          title: "Invalid Image URL",
          description: "Please use an image from Unsplash, Wikimedia, Flickr, Imgur, or Cloudinary",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create job")
      }

      toast({
        title: "Success",
        description: "Job added successfully",
      })
      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error("Error creating job:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create job",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Job Listing</DialogTitle>
          <DialogDescription>
            Fill in the details of the job. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input id="title" name="title" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company Name *</Label>
            <Input id="company" name="company" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input id="location" name="location" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Job Type *</Label>
            <Input id="type" name="type" placeholder="e.g., Full-time, Part-time, Remote" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salary">Salary *</Label>
            <Input id="salary" name="salary" type="number" placeholder="e.g., 50000 (in ₹)" required />
            <p className="text-sm text-muted-foreground mt-1">
              Please enter the salary in Indian Rupees (₹).
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea id="description" name="description" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Company Logo URL *</Label>
            <Input 
              id="image" 
              name="image" 
              type="url" 
              required
              onChange={() => setImageError(false)}
            />
            {imageError && (
              <div className="flex items-center gap-2 text-sm text-red-500 mt-1">
                <AlertCircle className="h-4 w-4" />
                <span>Please use an image from Unsplash, Wikimedia, Flickr, Imgur, or Cloudinary</span>
              </div>
            )}
            {!imageError && (
              <p className="text-sm text-muted-foreground mt-1">
                Use direct image URLs from: Unsplash, Wikimedia, Flickr, Imgur, or Cloudinary. 
                Don&apos;t use Google Images search URLs.
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="applicationUrl">Application Form URL *</Label>
            <Input 
              id="applicationUrl" 
              name="applicationUrl" 
              type="url" 
              placeholder="e.g., https://forms.gle/example"
              required
            />
            <p className="text-sm text-muted-foreground mt-1">
              Paste your Google Form URL or any application form link here
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}