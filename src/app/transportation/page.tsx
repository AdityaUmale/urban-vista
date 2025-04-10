'use client';

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import TransportationCard from "@/components/TransportationCard"
import AddTransportationForm from "@/components/AddTransportationForm"

interface Transportation {
  _id: string;
  name: string;
  address: string;
  type: string;
  timings: string;
  description: string;
  image: string;
  createdBy: string;
}

export default function TransportationPage() {
  const [transportation, setTransportation] = useState<Transportation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchTransportation = async () => {
    try {
      const response = await fetch("/api/transportation")
      if (!response.ok) {
        throw new Error("Failed to fetch transportation services")
      }
      const data = await response.json()
      setTransportation(data)
    } catch (error) {
      console.error("Error fetching transportation services:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransportation()
  }, [])

  const filteredTransportation = transportation.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Transportation Services</h1>
      
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
        <AddTransportationForm onSuccess={fetchTransportation} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredTransportation.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <p className="text-lg text-muted-foreground">
              {searchQuery
                ? "No transportation services found matching your search."
                : "No transportation services available yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTransportation.map((service) => (
            <TransportationCard key={service._id} transportation={service} />
          ))}
        </div>
      )}
    </div>
  )
} 