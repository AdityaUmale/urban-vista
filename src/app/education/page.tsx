'use client';

import { useState, useEffect } from 'react';
import EduInstituteCard from '../../components/eduInstituteCard';

interface EduInstitute {
  _id: string;
  name: string;
  address: string;
  Phone: string;
  WebsiteLink: string;
  Description: string;
  Image: string;
  createdBy: string;
}

export default function EducationPage() {
  const [institutes, setInstitutes] = useState<EduInstitute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchInstitutes();
  }, []);

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
      <h1 className="text-2xl font-bold mb-6">Educational Institutes</h1>
      
      {institutes.length === 0 ? (
        <p className="text-center">No educational institutes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutes.map((institute) => (
            <EduInstituteCard key={institute._id} institute={institute} />
          ))}
        </div>
      )}
    </div>
  );
}