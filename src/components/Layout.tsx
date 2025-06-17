'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui";
import { ArrowRight, Building } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prevScrollY = useRef(0);
  const heroSectionHeight = useRef(0);

  // Get hero section height on component mount
  useEffect(() => {
    const getHeroHeight = () => {
      const heroSection = document.querySelector('section') as HTMLElement;
      if (heroSection) {
        heroSectionHeight.current = heroSection.offsetHeight;
      }
    };
    
    getHeroHeight();
    window.addEventListener('resize', getHeroHeight);
    return () => window.removeEventListener('resize', getHeroHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we're past the hero section
      const isPastHero = currentScrollY > heroSectionHeight.current * 0.7;
      
      // Calculate scroll progress for animation smoothness
      // This gives us a value between 0 and 1 for the transition zone
      const transitionZoneStart = heroSectionHeight.current * 0.5;
      const transitionZoneEnd = heroSectionHeight.current * 0.9;
      const transitionZoneSize = transitionZoneEnd - transitionZoneStart;
      
      let progress = 0;
      if (currentScrollY > transitionZoneStart) {
        progress = Math.min((currentScrollY - transitionZoneStart) / transitionZoneSize, 1);
      }
      
      setScrollProgress(progress);
      setIsScrolled(isPastHero);
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    window.open('https://urbanvista.com', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-800 ease-out">
        <div 
          className={`bg-black/95 backdrop-blur-xl rounded-full border border-gray-700/50 shadow-xl transition-all duration-800 ease-out ${isScrolled ? 'px-6 py-3' : 'px-8 py-4'}`}
          style={{
            width: isScrolled ? '14rem' : '100%',
            maxWidth: isScrolled ? '14rem' : '85rem',
            transform: `scale(${1 - scrollProgress * 0.03})`,
            opacity: 1 - scrollProgress * 0.05
          }}
        >
          {isScrolled ? (
            <div 
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <Button 
                onClick={handleLinkClick}
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 font-medium text-sm transition-all duration-300"
              >
                Explore Now
              </Button>
              
              {isMenuOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl min-w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="px-8 py-6 space-y-1">
                    <div className="pb-2 mb-4 border-b border-gray-800">
                      <div className="text-white font-semibold text-sm">Navigation</div>
                    </div>
                    {['Education', 'Healthcare', 'Dining', 'Jobs', 'Housing'].map((item) => (
                      <button key={item} onClick={handleLinkClick} className="flex items-center justify-between py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 group w-full text-left">
                        <span>{item}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div 
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center justify-between w-full max-w-6xl mx-auto"
                style={{
                  opacity: 1 - scrollProgress * 1.2,
                  transform: `translateY(${scrollProgress * 8}px)`
                }}
              >
                <div className="flex items-center">
                  <div className="text-white text-xl font-bold flex items-center space-x-3">
                    <Building className="w-5 h-5" />
                    <span>Urban Vista</span>
                  </div>
                </div>
                
                <nav className="hidden md:flex items-center space-x-12 mx-16"
                  style={{
                    opacity: 1 - scrollProgress * 1.5,
                    transform: `translateY(${scrollProgress * 15}px)`
                  }}
                >
                  {['Education', 'Healthcare', 'Dining', 'Jobs', 'Housing'].map((item) => (
                    <button key={item} onClick={handleLinkClick} className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                      {item}
                    </button>
                  ))}
                </nav>

                <div className="hidden md:flex items-center"
                  style={{
                    opacity: 1 - scrollProgress * 0.3
                  }}
                >
                  <Button 
                    onClick={handleLinkClick}
                    className="bg-white text-black hover:bg-gray-100 rounded-full px-10 py-3 font-medium transition-all duration-300"
                  >
                    Explore Now
                  </Button>
                </div>
              </div>
              
              {isMenuOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-black/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl min-w-96 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="px-8 py-6">
                    <div className="pb-4 mb-6 border-b border-gray-800">
                      <div className="text-white font-semibold">Explore Your Community</div>
                      <div className="text-white/60 text-sm mt-1">Find what you need nearby</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Education', desc: 'Schools & colleges' },
                        { name: 'Healthcare', desc: 'Hospitals & clinics' },
                        { name: 'Dining', desc: 'Restaurants & cafes' },
                        { name: 'Jobs', desc: 'Career opportunities' }
                      ].map((item) => (
                        <button key={item.name} onClick={handleLinkClick} className="flex items-center justify-between p-4 text-white/80 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 group w-full text-left">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-white/50 mt-1">{item.desc}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <button onClick={handleLinkClick} className="flex items-center justify-between p-4 text-white/80 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 group w-full text-left">
                        <div>
                          <div className="font-medium">Housing</div>
                          <div className="text-xs text-white/50 mt-1">Rentals & properties</div>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer-curve relative min-h-[230px] flex flex-col items-center justify-center text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div className="text-white text-2xl font-bold flex items-center justify-center space-x-3 mb-4">
              <Building className="w-6 h-6" />
              <span>Urban Vista</span>
            </div>
            <p className="text-white/80 max-w-md mx-auto">
              Connecting people with opportunities and services in their community.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Education', 'Healthcare', 'Dining', 'Jobs', 'Housing', 'Privacy', 'Terms'].map((item) => (
              <button key={item} onClick={handleLinkClick} className="text-white/70 hover:text-white transition-colors duration-200">
                {item}
              </button>
            ))}
          </div>
          
          <div className="text-white/60 text-sm">
            © 2024 Urban Vista. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
