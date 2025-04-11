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
              Travel Made{" "}
              <span className="text-neutral-400">
                {"Easy".split("").map((word, idx) => (
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
            Connecting people with opportunities and services in their community. Making urban living more accessible and efficient.
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
      <div className="mb-4">
      <AnimatedTestimonials
        testimonials={[
          {
            quote: "connecting people with the Educational Institutes in their community",
            name: "Educational Institutes",
            designation: "Find all Educational Institues",
            src: "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww"
          },
          {
            quote: " Connecting people with the Hospitals in their community",
            name: "Hospitals",
            designation: "Find all Hospitals",
            src: "https://plus.unsplash.com/premium_photo-1666299880508-bffece864e96?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGF0aWVudCUyMGhvc3BpdGFsfGVufDB8fDB8fHww"
          },
          {
            quote: "Connecting people with the Food Places in their community",
            name: "Food Places",
            designation: "Find all Food Places",
            src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
          },
          {
            quote: "Connecting people with the Shopping Places in their community",
            name: "Shopping",
            designation: "Find Places to Shop",
            src: "https://plus.unsplash.com/premium_photo-1683141052679-942eb9e77760?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW4lMjBzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D"
          },
          {
            quote: "The best solution for remote work I've found.",
            name: "Michael Chen",
            designation: "Software Engineer",
            src: "https://plus.unsplash.com/premium_photo-1664302152991-d013ff125f3f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzfGVufDB8fDB8fHww"
          }
        ]}
      />
      </div>
      <div className="mt-12 pt-8">
      <Footer />
      </div>
    </div>
  )
}
