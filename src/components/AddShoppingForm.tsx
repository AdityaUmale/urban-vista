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

interface AddShoppingFormProps {
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

export default function AddShoppingForm({ onSuccess }: AddShoppingFormProps) {
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

      const response = await fetch("/api/shopping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create shopping place")
      }

      toast({
        title: "Success",
        description: "Shopping place added successfully",
      })
      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error("Error creating shopping place:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create shopping place",
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
          Add Shopping Place
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Shopping Place</DialogTitle>
          <DialogDescription>
            Fill in the details of the shopping place. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" name="type" placeholder="e.g., Mall, Market, Boutique" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timings">Timings</Label>
            <Input id="timings" name="timings" placeholder="e.g., 10 AM - 9 PM" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image" 
              name="image" 
              type="url" 
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
              {loading ? "Creating..." : "Create Shopping Place"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 