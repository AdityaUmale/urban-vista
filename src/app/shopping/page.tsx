'use client';

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import AddShoppingForm from "@/components/AddShoppingForm"
import { toast } from "sonner"

interface Shopping {
  _id: string;
  name: string;
  address: string;
  type: string;
  timings: string;
  description: string;
  image: string;
  createdBy: string;
}

export default function ShoppingPage() {
  const [shopping, setShopping] = useState<Shopping[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchShopping = async () => {
    try {
      const response = await fetch("/api/shopping")
      if (!response.ok) {
        throw new Error("Failed to fetch shopping places")
      }
      const data = await response.json()
      setShopping(data)
    } catch (error) {
      console.error("Error fetching shopping places:", error)
      toast.error("Failed to fetch shopping places")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShopping()
  }, [])

  const filteredShopping = shopping.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Places</h1>
      
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
        <AddShoppingForm onSuccess={fetchShopping} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredShopping.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <p className="text-lg text-muted-foreground">
              {searchQuery
                ? "No shopping places found matching your search."
                : "No shopping places available yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShopping.map((place) => (
            <Card key={place._id} className="overflow-hidden">
              <div className="relative h-48 w-full bg-gray-100">
                {place.image ? (
                  <img
                    src={place.image}
                    alt={place.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{place.type}</p>
                <p className="text-sm mb-2">{place.address}</p>
                <p className="text-sm mb-2">{place.timings}</p>
                <p className="text-sm text-muted-foreground">{place.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 