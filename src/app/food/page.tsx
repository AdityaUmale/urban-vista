'use client';

import { useState, useEffect } from 'react';
import FoodCard from '@/components/FoodCard';
import AddFoodForm from '@/components/AddFoodForm';
import { Toaster } from 'sonner';

interface Food {
  _id: string;
  name: string;
  address: string;
  cuisine: string;
  timings: string;
  description: string;
  image: string;
  createdBy: string;
}

export default function FoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = async () => {
    try {
      const response = await fetch('/api/food');
      
      if (!response.ok) {
        throw new Error('Failed to fetch food places');
      }
      
      const data = await response.json();
      setFoods(data.foods || []);
    } catch (err) {
      setError('Error loading food places. Please try again later.');
      console.error('Error fetching food places:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Food Places</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading food places...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Food Places</h1>
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Places</h1>
        <AddFoodForm onSuccess={fetchFoods} />
      </div>
      
      {foods.length === 0 ? (
        <p className="text-center">No food places found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}
