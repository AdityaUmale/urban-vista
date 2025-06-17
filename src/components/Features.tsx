import { Card, CardContent } from "@/components/ui/index";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Features = () => {
  const [visibleWords, setVisibleWords] = useState(0);
  const text = "SalesKat delivers intelligent sales assistance with real-time AI conversation analysis and guidance.";
  const words = text.split(' ');

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('animated-text');
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate how much of the element is visible
        const visiblePercentage = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
        
        // Calculate how many words should be visible based on scroll
        const wordsToShow = Math.floor(visiblePercentage * words.length);
        setVisibleWords(wordsToShow);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 relative overflow-hidden flex flex-col justify-center">
      
      {/* Curved top section */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,100 Q720,0 1440,100 L1440,0 L0,0 Z" 
            fill="url(#gradientFeatures)"
          />
          <defs>
            <linearGradient id="gradientFeatures" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dcfce7" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col justify-center py-32">
        <div className="text-center mb-16">
          <p className="text-gray-600 text-sm uppercase tracking-wider mb-8">What we do</p>
        </div>

        <div className="text-center mb-24">
          <h2 id="animated-text" className="text-4xl lg:text-5xl font-bold leading-tight mb-12 max-w-4xl mx-auto px-4">
            {words.map((word, index) => (
              <span
                key={index}
                className={`transition-colors duration-300 ${
                  index < visibleWords ? 'text-black' : 'text-gray-400'
                }`}
              >
                {word}{' '}
              </span>
            ))}
          </h2>
        </div>

        {/* Two main feature cards with increased height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Real-time Coaching Card */}
          <Card className="bg-black text-white rounded-3xl p-8 relative overflow-hidden border-0 shadow-2xl h-[480px] flex flex-col justify-between">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="mb-8">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Real-time Coaching</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  SalesKat provides instant conversation insights and coaching during sales calls to help you 
                  handle objections, identify buying signals, and close more deals.
                </p>
              </div>
              
              {/* Enhanced circular visualization with smoother animation */}
              <div className="flex justify-center mt-auto">
                <div className="relative">
                  <div className="w-40 h-40 border-2 border-green-400 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-32 h-32 border border-green-400/50 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s' }}>
                      <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center">
                        <ArrowRight className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Enhanced rotating outer rings */}
                  <div className="absolute inset-0 w-40 h-40 border-2 border-transparent border-t-green-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-2 w-36 h-36 border border-transparent border-r-green-400/70 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Analytics Card */}
          <Card className="bg-black text-white rounded-3xl p-8 relative overflow-hidden border-0 shadow-2xl h-[480px] flex flex-col justify-between">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="mb-8">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Analytics</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Advanced AI analyzes conversation patterns, sentiment, and engagement to provide actionable 
                  insights and improve your sales performance with every call.
                </p>
              </div>
              
              {/* Enhanced audio visualization with smoother animation */}
              <div className="flex justify-center items-center mt-auto">
                <div className="flex items-center space-x-1">
                  {[...Array(24)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-green-400 rounded-full animate-pulse"
                      style={{ 
                        height: `${Math.sin(i * 0.5) * 30 + 20}px`,
                        animationDelay: `${i * 0.08}s`,
                        animationDuration: '1.2s'
                      }}
                    ></div>
                  ))}
                  <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-6">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  {[...Array(24)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-green-400/40 rounded-full animate-pulse"
                      style={{ 
                        height: `${12}px`,
                        animationDelay: `${i * 0.08 + 1}s`,
                        animationDuration: '1.8s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Simple curved bottom section - single curve only */}
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