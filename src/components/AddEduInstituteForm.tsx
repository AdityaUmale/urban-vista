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
import { Plus, AlertCircle, FileUp } from "lucide-react"
import { toast } from "sonner"

interface AddEduInstituteFormProps {
  onSuccess: () => void;
}

export default function AddEduInstituteForm({ onSuccess }: AddEduInstituteFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Check if file is a PDF
      if (file.type !== 'application/pdf') {
        toast.error("Please select a PDF file")
        return
      }
      
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setImageError(false)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    
    // Add the file to formData if it exists
    if (selectedFile) {
      formData.append("pdfFile", selectedFile)
    }

    try {
      // Use FormData for multipart/form-data submission
      const response = await fetch("/api/eduInstitutes", {
        method: "POST",
        body: formData, // No need to set Content-Type header, browser will set it with boundary
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create educational institute")
      }

      toast.success("Educational institute added successfully")
      setOpen(false)
      onSuccess()
      
      // Reset file selection
      setSelectedFile(null)
    } catch (error) {
      console.error("Error creating educational institute:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create educational institute")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <Plus className="w-4 h-4 mr-2" />
          Add Educational Institute
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Educational Institute</DialogTitle>
          <DialogDescription>
            Fill in the details of the educational institute. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="Enter city name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="Phone">Phone</Label>
            <Input id="Phone" name="Phone" placeholder="e.g., +1 (123) 456-7890" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="WebsiteLink">Website</Label>
            <Input id="WebsiteLink" name="WebsiteLink" type="url" placeholder="e.g., https://example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="Description">Description</Label>
            <Textarea id="Description" name="Description" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="Image">Image URL</Label>
            <Input 
              id="Image" 
              name="Image" 
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
          
          {/* Add PDF file upload field */}
          <div className="space-y-2">
            <Label htmlFor="pdfFile">PDF Document (Brochure, Syllabus, etc.)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="pdfFile"
                name="pdfFile"
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center"
              >
                <FileUp className="h-4 w-4 mr-2" />
                {selectedFile ? "Change PDF" : "Upload PDF"}
              </Button>
            </div>
            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-green-600 mt-1">
                <span>Selected: {selectedFile.name}</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Upload a PDF document (max 5MB)
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
              {loading ? "Creating..." : "Create Institute"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}