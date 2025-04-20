'use client';

import { useState, useEffect } from 'react';
import TransportationCard from '../../components/TransportationCard';
import AddTransportationForm from '@/components/AddTransportationForm';
import { Toaster } from 'sonner';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Update your Transportation interface to include city
interface Transportation {
  _id: string;
  name: string;
  address: string;
  Phone: string;
  WebsiteLink: string;
  Description: string;
  Image: string;
  createdBy: string;
  city: string; // Added city field
}

export default function TransportationPage() {
  const [transportations, setTransportations] = useState<Transportation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchTransportations = async () => {
    try {
      const response = await fetch('/api/transportation');
      
      if (!response.ok) {
        throw new Error('Failed to fetch transportation services');
      }
      
      const data = await response.json();
      setTransportations(data.transportations || []);
    } catch (err) {
      setError('Error loading transportation services. Please try again later.');
      console.error('Error fetching transportations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransportations();
  }, []);

  // Get unique cities from transportations
  const cities = ['all', ...new Set(transportations.map(transportation => transportation.city || 'Unknown'))];
  
  // Filter transportations by selected city and search query
  const filteredTransportations = transportations
    .filter(transportation => selectedCity === 'all' || transportation.city === selectedCity)
    .filter(transportation => 
      searchQuery === '' || 
      (transportation.name && transportation.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transportation.address && transportation.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transportation.Description && transportation.Description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Transportation Services</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading transportation services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Transportation Services</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transportation Services</h1>
        <AddTransportationForm onSuccess={fetchTransportations} />
      </div>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search transportation services by name, address, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
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
      
      {filteredTransportations.length === 0 ? (
        <p className="text-center">
          {searchQuery 
            ? "No transportation services found matching your search." 
            : "No transportation services found for the selected city."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTransportations.map((transportation) => (
            <TransportationCard key={transportation._id} transportation={transportation} />
          ))}
        </div>
      )}
      {/* Make sure Toaster is used correctly - it should be just a component, not receiving objects */}
      <Toaster />
    </div>
  );
}