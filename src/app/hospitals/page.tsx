'use client';

import { useState, useEffect } from 'react';
import HospitalCard from '../../components/HospitalCard';
import AddHospitalForm from '@/components/AddHospitalForm';
import { Toaster } from 'sonner';
import { Input } from '@/components/ui';
import { Search, Hospital, MapPin } from 'lucide-react';

interface Hospital {
  _id: string;
  name: string;
  address: string;
  Phone: string;
  WebsiteLink: string;
  Description: string;
  Image: string;
  createdBy: string;
  city: string;
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

  const cities = ['all', ...new Set(hospitals.map(hospital => hospital.city || 'Unknown'))];
  
  const filteredHospitals = hospitals
    .filter(hospital => selectedCity === 'all' || hospital.city === selectedCity)
    .filter(hospital => 
      searchQuery === '' || 
      (hospital.name && hospital.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (hospital.address && hospital.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (hospital.Description && hospital.Description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Hospital className="w-8 h-8 text-black" />
            <h1 className="text-3xl font-bold text-black">Hospitals</h1>
          </div>
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-gray-600">Loading hospitals...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Hospital className="w-8 h-8 text-black" />
            <h1 className="text-3xl font-bold text-black">Hospitals</h1>
          </div>
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="absolute w-[72rem] h-[36rem] bg-white rounded-full shadow-2xl animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/50 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="absolute w-[60rem] h-[30rem] bg-white rounded-full shadow-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-300/50 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="absolute w-[48rem] h-[24rem] bg-white rounded-full shadow-xl animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="container mx-auto p-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
              <Hospital className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Hospitals</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the best hospitals and healthcare facilities in your area. Search, filter, and discover top-rated hospitals.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full md:w-auto">
            <AddHospitalForm onSuccess={fetchHospitals} />
          </div>
          <div className="w-full md:w-auto flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{hospitals.length} hospitals available</span>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-8 mb-8 transform transition-all duration-300 hover:shadow-md">
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search hospitals by name, address, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 w-full bg-gray-50 border-gray-200 h-12 text-lg rounded-xl"
              />
            </div>
          </div>
          
          {/* City filter dropdown */}
          <div>
            <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by City:
            </label>
            <select
              id="city-filter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="block w-full max-w-xs px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-lg"
            >
              {cities.map(city => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Results Section */}
        {filteredHospitals.length === 0 ? (
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-8 transform transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col items-center space-y-4">
              <Hospital className="w-12 h-12 text-gray-400" />
              <p className="text-gray-600 text-lg">
                {searchQuery 
                  ? "No hospitals found matching your search." 
                  : "No hospitals found for the selected city."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHospitals.map((hospital) => (
              <div key={hospital._id} className="transform transition-all duration-300 hover:scale-105">
                <HospitalCard hospital={hospital} />
              </div>
            ))}
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
}