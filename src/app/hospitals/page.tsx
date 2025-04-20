'use client';

import { useState, useEffect } from 'react';
import HospitalCard from '../../components/HospitalCard';
import AddHospitalForm from '@/components/AddHospitalForm';
import { Toaster } from 'sonner';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Update your Hospital interface to include city
interface Hospital {
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

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchHospitals = async () => {
    try {
      const response = await fetch('/api/hospitals');
      
      if (!response.ok) {
        throw new Error('Failed to fetch hospitals');
      }
      
      const data = await response.json();
      setHospitals(data.hospitals || []);
    } catch (err) {
      setError('Error loading hospitals. Please try again later.');
      console.error('Error fetching hospitals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Hospitals</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading hospitals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Hospitals</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // Get unique cities from hospitals
  const cities = ['all', ...new Set(hospitals.map(hospital => hospital.city || 'Unknown'))];
  
  // Filter hospitals by selected city and search query
  const filteredHospitals = hospitals
    .filter(hospital => selectedCity === 'all' || hospital.city === selectedCity)
    .filter(hospital => 
      searchQuery === '' || 
      (hospital.name && hospital.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (hospital.address && hospital.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (hospital.Description && hospital.Description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hospitals</h1>
        <AddHospitalForm onSuccess={fetchHospitals} />
      </div>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search hospitals by name, address, or description..."
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
      
      {filteredHospitals.length === 0 ? (
        <p className="text-center">
          {searchQuery 
            ? "No hospitals found matching your search." 
            : "No hospitals found for the selected city."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital._id} hospital={hospital} />
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}