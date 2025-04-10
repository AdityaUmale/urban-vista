'use client';

import { useState, useEffect } from 'react';
import HospitalCard from '@/components/HospitalCard';
import AddHospitalForm from '@/components/AddHospitalForm';
import { Toaster } from 'sonner';

interface Hospital {
  _id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  image: string;
  createdBy: string;
}

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hospitals</h1>
        <AddHospitalForm onSuccess={fetchHospitals} />
      </div>
      
      {hospitals.length === 0 ? (
        <p className="text-center">No hospitals found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital._id} hospital={hospital} />
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}