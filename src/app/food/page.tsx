'use client';

import { useState, useEffect } from 'react';
import FoodCard from '../../components/FoodCard';
import AddFoodForm from '@/components/AddFoodForm';
import { Toaster } from 'sonner';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Food {
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

export default function FoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchFoods = async () => {
    try {
      const response = await fetch('/api/food');
      
      if (!response.ok) {
        throw new Error('Failed to fetch food places');
      }
      
      const data = await response.json();
      setFoods(data.foods);
    } catch (err) {
      setError('Error loading food places. Please try again later.');
      console.error('Error fetching foods:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Get unique cities from foods
  const cities = ['all', ...new Set(foods.map(food => food.city || 'Unknown'))];
  
  // Filter foods by selected city and search query
  const filteredFoods = foods
    .filter(food => selectedCity === 'all' || food.city === selectedCity)
    .filter(food => 
      searchQuery === '' || 
      (food.name && food.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (food.address && food.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (food.description && food.description.toLowerCase().includes(searchQuery.toLowerCase()))  // Changed from Description to description
    );

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

  // Remove this duplicate filtering logic that uses the undefined foodPlaces variable
  // const filteredFoodPlaces = foodPlaces
  //   .filter(place => selectedCity === 'all' || place.city === selectedCity)
  //   .filter(place => 
  //     searchQuery === '' || 
  //     (place.name && place.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (place.address && place.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (place.description && place.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (place.cuisine && place.cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
  //   );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Places</h1>
        <AddFoodForm onSuccess={fetchFoods} />
      </div>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search food places by name, cuisine, address, or description..."
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
      
      {filteredFoods.length === 0 ? (
        <p className="text-center">
          {searchQuery 
            ? "No food places found matching your search." 
            : "No food places found for the selected city."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} foodPlace={food} />
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
}
