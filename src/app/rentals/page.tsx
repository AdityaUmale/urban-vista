'use client';

import { useState, useEffect } from 'react';
import RentalCard from '@/components/RentalCard';
import AddRentalForm from '@/components/AddRentalForm';
import { Toaster } from 'sonner';

interface Rental {
  _id: string;
  name: string;
  address: string;
  price: string;
  description: string;
  image: string;
  createdBy: string;
  city: string; // Added city field
}

export default function RentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all'); // Added city filter state

  const fetchRentals = async () => {
    try {
      const response = await fetch('/api/rentals');
      
      if (!response.ok) {
        throw new Error('Failed to fetch rentals');
      }
      
      const data = await response.json();
      console.log('API response data:', data); // Log the API response
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
  
  // Improved city extraction logic
  const availableCities = rentals
    .map(rental => rental.city)
    .filter(city => city && city.trim() !== '');
  
  console.log('Available cities:', availableCities);
  
  // Get unique cities from rentals with better filtering
  const cities = ['all', ...new Set(availableCities)];
  
  console.log('City options:', cities);
    
  // Filter rentals by selected city
  const filteredRentals = selectedCity === 'all' 
    ? rentals 
    : rentals.filter(rental => rental.city === selectedCity);
  
  // Add this console log to see filtered rentals
  console.log('Filtered rentals:', filteredRentals);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Rental Properties</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading rentals...</p>
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
        <p className="text-center">No rental properties found for the selected city.</p>
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
