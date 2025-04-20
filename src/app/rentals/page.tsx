'use client';

import { useState, useEffect } from 'react';
import RentalCard from '../../components/RentalCard';
import AddRentalForm from '@/components/AddRentalForm';
import { Toaster } from 'sonner';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Rental {
  _id: string;
  name: string;
  address: string;
  price: number;
  type: string;
  description: string;
  image: string;
  createdBy: string;
  city: string;
}

export default function RentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchRentals = async () => {
    try {
      const response = await fetch('/api/rentals');
      
      if (!response.ok) {
        throw new Error('Failed to fetch rentals');
      }
      
      const data = await response.json();
      setRentals(data.rentals || []);
    } catch (err) {
      setError('Error loading rentals. Please try again later.');
      console.error('Error fetching rentals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  // Get unique cities from rentals
  const cities = ['all', ...new Set(rentals.map(rental => rental.city || 'Unknown'))];
  
  // Filter rentals by selected city and search query
  const filteredRentals = rentals
    .filter(rental => selectedCity === 'all' || rental.city === selectedCity)
    .filter(rental => 
      searchQuery === '' || 
      (rental.name && rental.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (rental.address && rental.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (rental.description && rental.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (rental.type && rental.type.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Rental Properties</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading rental properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Rental Properties</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rental Properties</h1>
        <AddRentalForm onSuccess={fetchRentals} />
      </div>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search rentals by name, address, type, or description..."
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
      
      {filteredRentals.length === 0 ? (
        <p className="text-center">
          {searchQuery 
            ? "No rental properties found matching your search." 
            : "No rental properties found for the selected city."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRentals.map((rental) => (
            <RentalCard key={rental._id} rental={rental} />
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}
