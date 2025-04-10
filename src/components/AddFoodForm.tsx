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

interface AddFoodFormProps {
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

export default function AddFoodForm({ onSuccess }: AddFoodFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageError, setImageError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setImageError("")

    const formData = new FormData(e.currentTarget)
    const imageUrl = formData.get("image") as string

    if (imageUrl && !isValidImageUrl(imageUrl)) {
      setImageError("Please provide a direct image URL from supported sources (e.g., Unsplash, Wikimedia, Imgur)")
      setLoading(false)
      return
    }

    const data = {
      name: formData.get("name"),
      address: formData.get("address"),
      cuisine: formData.get("cuisine"),
      timings: formData.get("timings"),
      description: formData.get("description"),
      image: imageUrl,
      createdBy: "User", // You can replace this with actual user data
    }

    try {
      const response = await fetch("/api/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create food place")
      }

      toast.success("Food place has been created successfully")
      if (formRef.current) {
        formRef.current.reset()
      }
      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error("Error creating food place:", error)
      toast.error("Failed to create food place. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <Plus className="w-4 h-4 mr-2" />
          Add Food Place
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Food Place</DialogTitle>
          <DialogDescription>
            Fill in the details of the food place. Click save when you&apos;re done.
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
            <Label htmlFor="cuisine">Cuisine</Label>
            <Input id="cuisine" name="cuisine" placeholder="e.g., Italian, Indian, Chinese" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timings">Timings</Label>
            <Input id="timings" name="timings" placeholder="e.g., 10 AM - 10 PM" />
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
              onChange={() => setImageError("")}
            />
            {imageError ? (
              <div className="flex items-center gap-2 text-sm text-red-500 mt-1">
                <AlertCircle className="h-4 w-4" />
                <span>{imageError}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                Use direct image URLs from: Unsplash, Wikimedia, Imgur, etc. 
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
              {loading ? "Creating..." : "Create Food Place"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 