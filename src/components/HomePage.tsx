'use client';

import { Button } from "@/components/ui/index";
import { ArrowRight, Globe } from "lucide-react";
import Image from 'next/image';
import { Building, Hospital, Briefcase, Home, School, Utensils } from 'lucide-react';

const HomePage = () => {
  const handleLinkClick = () => {
    window.open('https://urbanvista.com', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gray-100 overflow-hidden flex items-center justify-center">
        {/* Animated concentric semi-circles with gradient shadows - centered */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          {/* Largest semi-circle */}
          <div 
            className="absolute w-[72rem] h-[36rem] bg-white rounded-full shadow-2xl animate-pulse"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/50 to-transparent rounded-full blur-2xl"></div>
          </div>
          
          {/* Medium semi-circle */}
          <div 
            className="absolute w-[60rem] h-[30rem] bg-white rounded-full shadow-2xl animate-pulse"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-300/50 to-transparent rounded-full blur-2xl"></div>
          </div>
          
          {/* Smallest semi-circle */}
          <div 
            className="absolute w-[48rem] h-[24rem] bg-white rounded-full shadow-xl animate-pulse"
            style={{ animationDelay: '1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-xl"></div>
          </div>
        </div>
        
        {/* Content overlaid on top of circles */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top notification banner */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg">
                <Globe className="w-5 h-5 text-gray-700" />
                <span className="text-gray-800 font-medium">Explore Your Area</span>
              </div>
            </div>

            {/* Main content centered over circles */}
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-6xl lg:text-7xl font-bold text-black leading-tight mb-8">
                Urban Vista
              </h1>
              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                Connecting people with opportunities and services in their community. 
                Discover educational institutes, hospitals, restaurants, job opportunities, and rentals near you.
              </p>
              
              {/* Explore button */}
              <div className="flex justify-center">
                <Button 
                  onClick={handleLinkClick}
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg flex items-center space-x-3"
                >
                  <Building className="w-8 h-8 rounded-full" />
                  <span>Explore Now</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Everything You Need in Your Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the essential services and opportunities your neighborhood has to offer
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <School className="w-8 h-8 text-blue-600" />,
                title: "Educational Institutes",
                description: "Find schools, colleges, universities, and training centers in your area with detailed information and reviews."
              },
              {
                icon: <Hospital className="w-8 h-8 text-green-600" />,
                title: "Healthcare Services",
                description: "Locate hospitals, clinics, pharmacies, and specialized medical services near you."
              },
              {
                icon: <Utensils className="w-8 h-8 text-purple-600" />,
                title: "Dining & Food",
                description: "Explore restaurants, cafes, food trucks, and local eateries with ratings and menus."
              },
              {
                icon: <Briefcase className="w-8 h-8 text-orange-600" />,
                title: "Job Opportunities",
                description: "Discover local job openings, career fairs, and employment opportunities in your community."
              },
              {
                icon: <Home className="w-8 h-8 text-red-600" />,
                title: "Housing & Rentals",
                description: "Find apartments, houses, and rental properties with detailed listings and neighborhood insights."
              },
              {
                icon: <Building className="w-8 h-8 text-indigo-600" />,
                title: "Local Businesses",
                description: "Connect with local services, shops, and businesses that make your community thrive."
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              How Urban Vista Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to discover everything your community has to offer
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Set Your Location",
                description: "Enter your address or use GPS to automatically detect your current location and neighborhood."
              },
              {
                step: "02", 
                title: "Browse Categories",
                description: "Explore different categories like education, healthcare, dining, jobs, and housing based on your needs."
              },
              {
                step: "03",
                title: "Connect & Engage",
                description: "Get detailed information, read reviews, and connect directly with local services and opportunities."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Urban Vista Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Gradient shadow overlay only at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Main testimonial quote */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-relaxed text-white drop-shadow-2xl">
                &ldquo;Urban Vista helped me find the perfect apartment and discover amazing local restaurants.&rdquo;
              </h2>
              
              {/* Attribution */}
              <div className="flex items-center justify-center space-x-3">
                <span className="text-white/90 font-medium text-lg drop-shadow-lg">Sarah, New Resident</span>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom section with white background for next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden z-20">
          <svg 
            viewBox="0 0 1440 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,100 Q720,0 1440,100 L1440,100 L0,100 Z" 
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen bg-white relative overflow-hidden flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              Ready to explore your community?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of residents already using Urban Vista to discover opportunities and services in their neighborhood.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleLinkClick}
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold rounded-full shadow-lg flex items-center space-x-3"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                onClick={handleLinkClick}
                variant="outline"
                size="lg" 
                className="border-black text-black hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-full"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
