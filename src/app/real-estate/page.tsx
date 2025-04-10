'use client';

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import AddRealEstateForm from "@/components/AddRealEstateForm"
import { toast } from "sonner"

interface RealEstate {
  _id: string;
  name: string;
  address: string;
  type: string;
  price: number;
  description: string;
  image: string;
  createdBy: string;
}

export default function RealEstatePage() {
  const [realEstate, setRealEstate] = useState<RealEstate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchRealEstate = async () => {
    try {
      const response = await fetch("/api/real-estate")
      if (!response.ok) {
        throw new Error("Failed to fetch real estate properties")
      }
      const data = await response.json()
      setRealEstate(data)
    } catch (error) {
      console.error("Error fetching real estate properties:", error)
      toast.error("Failed to fetch real estate properties")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRealEstate()
  }, [])

  const filteredRealEstate = realEstate.filter((property) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Real Estate Properties</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, type, or address..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <AddRealEstateForm onSuccess={fetchRealEstate} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredRealEstate.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <p className="text-lg text-muted-foreground">
              {searchQuery
                ? "No properties found matching your search."
                : "No properties available yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRealEstate.map((property) => (
            <Card key={property._id} className="overflow-hidden">
              <div className="relative h-48 w-full bg-gray-100">
                {property.image ? (
                  <img
                    src={property.image}
                    alt={property.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                <p className="text-lg font-bold text-primary mb-2">
                  {formatPrice(property.price)}
                </p>
                <p className="text-sm text-muted-foreground mb-2">{property.type}</p>
                <p className="text-sm mb-2">{property.address}</p>
                <p className="text-sm text-muted-foreground">{property.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 