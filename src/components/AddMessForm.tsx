'use client';

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Utensils } from "lucide-react";
import { toast } from "sonner";
import { MapPin as MapPinIcon } from "lucide-react";

interface AddMessFormProps {
  onSuccess: () => void;
}

export default function AddMessForm({ onSuccess }: AddMessFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // NOTE: File upload for image is not included here for simplicity.
  // You would need a similar setup as the PDF upload in AddEduInstituteForm
  // if you want direct image uploads instead of just a URL.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImageError(false);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Basic validation for image URL format if provided
    const imageUrl = data.image as string;
    if (imageUrl && !imageUrl.match(/^https?:\/\//)) {
      setImageError(true);
      setLoading(false);
      toast.error("Please enter a valid image URL starting with http:// or https://");
      return;
    }

    // Convert prices to numbers if they exist
    const body = {
      ...data,
      vegPrice: data.vegPrice ? Number(data.vegPrice) : undefined,
      nonVegPrice: data.nonVegPrice ? Number(data.nonVegPrice) : undefined,
      createdBy: "Admin User" // Replace with actual user logic later
      // googleMapsUrl will be included from data if present
    };

    try {
      const response = await fetch("/api/mess", { // Changed API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create mess listing");
      }

      toast.success("Mess listing added successfully");
      setOpen(false);
      onSuccess();
      formRef.current?.reset(); // Reset form fields
    } catch (error) {
      console.error("Error creating mess listing:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create mess listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <Utensils className="w-4 h-4 mr-2" />
          Add Mess Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Mess Listing</DialogTitle>
          <DialogDescription>
            Fill in the details of the mess. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="name">Mess Name *</Label>
            <Input id="name" name="name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input id="address" name="address" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input id="city" name="city" placeholder="Enter city name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" placeholder="e.g., +1 (123) 456-7890" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vegPrice">Veg Tiffin Price</Label>
            <Input id="vegPrice" name="vegPrice" type="number" step="0.01" placeholder="e.g., 100.00" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nonVegPrice">Non-Veg Tiffin Price</Label>
            <Input id="nonVegPrice" name="nonVegPrice" type="number" step="0.01" placeholder="e.g., 120.00" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timings">Timings</Label>
            <Input id="timings" name="timings" placeholder="e.g., 12:00 PM - 2:00 PM, 7:00 PM - 9:00 PM" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="websiteLink">Website</Label>
            <Input id="websiteLink" name="websiteLink" type="url" placeholder="e.g., https://example.com" />
          </div>

          {/* Added Google Maps URL Input */}
          <div className="space-y-2">
            <Label htmlFor="googleMapsUrl">Google Maps Link</Label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                id="googleMapsUrl" 
                name="googleMapsUrl" 
                type="url" 
                placeholder="e.g., https://maps.app.goo.gl/xyz..." 
                className="pl-10"
              />
            </div>
             <p className="text-sm text-muted-foreground mt-1">
              Paste the share link from Google Maps.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationUrl">Application/Contact Link</Label>
            <Input id="applicationUrl" name="applicationUrl" type="url" placeholder="Link for users to apply or contact" />
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
                <span>Please enter a valid image URL</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Enter a valid image URL starting with http:// or https://
            </p>
          </div>
          
          {/* Note: 'createdBy' is hardcoded for now, replace with actual user logic */}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Mess"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}