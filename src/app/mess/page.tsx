'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddMessForm from "@/components/AddMessForm";
import MessCard from "@/components/MessCard";

// Define the Mess interface (ensure this matches your model)
interface IMess {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  websiteLink?: string;
  description?: string;
  image?: string;
  vegPrice?: number;
  nonVegPrice?: number;
  timings?: string;
  applicationUrl?: string;
  city: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function MessPage() {
  const [messes, setMesses] = useState<IMess[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state
  const [selectedCity, setSelectedCity] = useState<string>('all'); // Add city filter state

  const fetchMesses = async () => {
    setLoading(true);
    setError(null); // Reset error on new fetch
    try {
      const response = await fetch("/api/mess");
      const data = await response.json();

      if (!response.ok) {
        // If response is not OK, throw an error with the message from API if available
        throw new Error(data.error || "Failed to fetch mess listings");
      }
      
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setMesses(data);
      } else {
        // If data is not an array, treat it as an error scenario
        console.error("API did not return an array:", data);
        setMesses([]); // Set to empty array to prevent filter error
        throw new Error("Received invalid data format from server");
      }

    } catch (err) {
      console.error("Error fetching mess listings:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setMesses([]); // Ensure messes is an empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMesses();
  }, []);

  // Get unique cities from messes
  const cities = ['all', ...new Set(messes.map(mess => mess.city || 'Unknown'))];

  // Filter messes by selected city and search query
  const filteredMesses = messes
    .filter(mess => selectedCity === 'all' || mess.city === selectedCity)
    .filter(mess => {
      const searchLower = searchQuery.toLowerCase();
      return (
        mess.name.toLowerCase().includes(searchLower) ||
        mess.address.toLowerCase().includes(searchLower) ||
        mess.city.toLowerCase().includes(searchLower)
      );
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mess Listings</h1>
          <p className="text-muted-foreground mt-2">
            Find local mess and tiffin services
          </p>
        </div>
        <AddMessForm onSuccess={fetchMesses} />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search messes by name, address, or city..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* City filter dropdown */}
      <div className="mb-6">
        <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by City:
        </label>
        <select
          id="city-filter"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {cities.map(city => (
            <option key={city} value={city}>
              {city === 'all' ? 'All Cities' : city}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? ( // Display error message if fetch failed
        <div className="text-center py-12 text-red-600">
          <p>Error loading messes: {error}</p>
          <button onClick={fetchMesses} className="mt-4 text-primary underline">Try again</button>
        </div>
      ) : filteredMesses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery || selectedCity !== 'all'
              ? "No messes found matching your search criteria"
              : "No mess listings available at the moment"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMesses.map((mess) => (
            <MessCard key={mess._id} mess={mess} />
          ))}
        </div>
      )}
    </div>
  );
}