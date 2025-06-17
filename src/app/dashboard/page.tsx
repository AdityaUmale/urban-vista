"use client";

import type React from "react"
import { GraduationCap, Building2, Home, Utensils, Car, Stethoscope, Briefcase } from "lucide-react"
import Link from "next/link"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui"

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function CategoryCard({ icon, title, description, href }: CategoryCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg bg-white">
      <CardHeader>
        <div className="p-2 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-2">{icon}</div>
        <CardTitle className="text-black">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-2">
        <Button asChild className="w-full bg-black text-white hover:bg-gray-800 rounded-full">
          <Link href={href}>Explore {title}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function CategoriesPage() {
  const categories: CategoryCardProps[] = [
    {
      icon: <GraduationCap className="h-6 w-6 text-black" />,
      title: "Educational Institutions",
      description: "Find schools, colleges, universities and training centers",
      href: "/education",
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-black" />,
      title: "Hospitals",
      description: "Discover healthcare facilities and medical services",
      href: "/hospitals",
    },
    {
      icon: <Home className="h-6 w-6 text-black" />,
      title: "Rental Rooms",
      description: "Browse apartments, houses and rooms for rent",
      href: "/rentals",
    },
    {
      icon: <Utensils className="h-6 w-6 text-black" />,
      title: "Food",
      description: "Explore restaurants, cafes and food delivery services",
      href: "/food",
    },
    {
      icon: <Car className="h-6 w-6 text-black" />,
      title: "Transportation",
      description: "Find transportation services and vehicle rentals",
      href: "/transportation",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-black" />,
      title: "Jobs",
      description: "Find employment opportunities and career services",
      href: "/jobs",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-black" />,
      title: "Mess",
      description: "Find employment opportunities and career services",
      href: "/mess",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Animated background circles */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="absolute w-[72rem] h-[36rem] bg-white rounded-full shadow-2xl animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/50 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="absolute w-[60rem] h-[30rem] bg-white rounded-full shadow-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-300/50 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="absolute w-[48rem] h-[24rem] bg-white rounded-full shadow-xl animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="container py-10 mx-auto relative z-10">
        <div className="space-y-4 text-center mb-10">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Building2 className="w-8 h-8 text-black" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-black">Categories</h1>
          </div>
          <p className="text-gray-600 max-w-[700px] mx-auto">
            Explore our wide range of categories to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={category.description}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

