"use client"
import WorldMap from "@/components/ui/world-map"
import Navbar from "@/components/navbar"
import { motion } from "motion/react"
import { AnimatedTestimonials } from "@/components/HeroCategories"
import Footer from "@/components/Footer"

export default function WorldMapDemo() {
  return (
    <div className="flex flex-col dark:bg-black bg-white w-full min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-32 md:pb-40 flex-grow">
        <div className="max-w-7xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
              Remote{" "}
              <span className="text-neutral-400">
                {"Connectivity".split("").map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.04 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </p>
            <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
              Break free from traditional boundaries. Work from anywhere, at the comfort of your own studio apartment.
              Perfect for Nomads and Travellers.
            </p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
          <WorldMap
            dots={[
              {
                start: {
                  lat: 64.2008,
                  lng: -149.4937,
                }, // Alaska (Fairbanks)
                end: {
                  lat: 34.0522,
                  lng: -118.2437,
                }, // Los Angeles
              },
              {
                start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              },
              {
                start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 28.6139, lng: 77.209 }, // New Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
              },
            ]}
            lineColor="#0ea5e9"
          />
        </motion.div>
      </div>
      <AnimatedTestimonials
        testimonials={[
          {
            quote: "This platform has transformed how I work remotely.",
            name: "Sarah Johnson",
            designation: "Digital Nomad",
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          },
          {
            quote: "The best solution for remote work I've found.",
            name: "Michael Chen",
            designation: "Software Engineer",
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
          }
        ]}
      />
      <Footer />
    </div>
  )
}
