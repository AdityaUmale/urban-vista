import Image from 'next/image';

export const HowItWorks = () => {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Curved top border */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <svg 
          viewBox="0 0 1440 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C480,120 960,120 1440,0 L1440,320 L0,320 Z" 
            fill="#000000"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-6">Building a more</p>
          <h2 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            successful sales team
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Boost Revenue Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Boost revenue
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Increase deal closure rates and average deal size with AI-powered sales assistance 
                that helps identify opportunities and overcome objections.
              </p>
            </div>
            
            {/* Revenue Visualization */}
            <div className="mt-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                    alt="Sales rep"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400 flex items-center">
                        <span className="text-xl mr-2">▲</span> Increased
                      </span>
                      <span className="text-2xl font-bold">DEALS</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 flex items-center">
                    <span className="text-xl mr-2">▲</span> Higher
                  </span>
                  <span className="text-2xl font-bold">REVENUE</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full w-3/5 transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhance Performance Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden min-h-[400px]">
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Enhance performance
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Empower your sales team with 95% improved call effectiveness and real-time coaching.
              </p>
            </div>
            
            {/* Main Image */}
            <div className="relative z-10 mb-6">
              <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                <Image
                  src="/images/search.jpg"
                  alt="Search"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Statistics Overlay */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 text-2xl">▲</span>
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Call effectiveness</p>
                    <p className="text-black text-3xl font-bold">95%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
          {/* Reduce Rejections */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">Reduce rejections</h3>
            <p className="text-gray-300 leading-relaxed">
              Handle objections effectively with AI-suggested responses and turn potential 
              rejections into opportunities.
            </p>
          </div>

          {/* Build Confidence */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">Build confidence</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Empower sales reps to be more confident and persuasive in every conversation.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" 
                alt="Sales team member"
                className="w-12 h-12 rounded-full object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                alt="Sales team member"
                className="w-12 h-12 rounded-full object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=80&h=80&fit=crop&crop=face" 
                alt="Sales team member"
                className="w-12 h-12 rounded-full object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=80&h=80&fit=crop&crop=face" 
                alt="Sales team member"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>

          {/* AI Assistant Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">SalesKat status</h3>
              <div className="bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm">SalesKat active</span>
                  <div className="w-12 h-6 bg-green-400 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">AI Assistant</span>
                  <span className="text-green-400 text-lg">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curved section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,100 Q720,0 1440,100 L1440,100 L0,100 Z" 
            fill="#000000"
          />
        </svg>
      </div>
    </section>
  );
};