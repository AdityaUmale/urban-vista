'use client';

import { useState, useEffect } from 'react';
import EduInstituteCard from '../../components/eduInstituteCard';
import AddEduInstituteForm from '@/components/AddEduInstituteForm';
import { Toaster } from 'sonner';

interface EduInstitute {
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

export default function EducationPage() {
  const [institutes, setInstitutes] = useState<EduInstitute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const fetchInstitutes = async () => {
    try {
      const response = await fetch('/api/eduInstitutes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch educational institutes');
      }
      
      const data = await response.json();
      setInstitutes(data.institutes);
    } catch (err) {
      setError('Error loading educational institutes. Please try again later.');
      console.error('Error fetching institutes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  // Get unique cities from institutes
  const cities = ['all', ...new Set(institutes.map(institute => institute.city || 'Unknown'))];
  
  // Filter institutes by selected city
  const filteredInstitutes = selectedCity === 'all' 
    ? institutes 
    : institutes.filter(institute => institute.city === selectedCity);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Educational Institutes</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading educational institutes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Educational Institutes</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Educational Institutes</h1>
        <AddEduInstituteForm onSuccess={fetchInstitutes} />
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
      
      {filteredInstitutes.length === 0 ? (
        <p className="text-center">No educational institutes found for the selected city.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutes.map((institute) => (
            <EduInstituteCard key={institute._id} institute={institute} />
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}