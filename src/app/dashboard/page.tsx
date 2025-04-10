import type React from "react"
import { GraduationCap, Building2, Home, Utensils, Car, ShoppingBag, Stethoscope, Briefcase } from "lucide-react"
import Link from "next/link"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function CategoryCard({ icon, title, description, href }: CategoryCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-2">
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>Explore {title}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function CategoriesPage() {
  const categories: CategoryCardProps[] = [
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: "Educational Institutions",
      description: "Find schools, colleges, universities and training centers",
      href: "/education",
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      title: "Hospitals",
      description: "Discover healthcare facilities and medical services",
      href: "/hospitals",
    },
    {
      icon: <Home className="h-6 w-6 text-primary" />,
      title: "Rental Rooms",
      description: "Browse apartments, houses and rooms for rent",
      href: "/rentals",
    },
    {
      icon: <Utensils className="h-6 w-6 text-primary" />,
      title: "Food",
      description: "Explore restaurants, cafes and food delivery services",
      href: "/food",
    },
    {
      icon: <Car className="h-6 w-6 text-primary" />,
      title: "Transportation",
      description: "Find transportation services and vehicle rentals",
      href: "/transportation",
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
      title: "Shopping",
      description: "Discover retail stores and shopping centers",
      href: "/shopping",
    },
    {
      icon: <Building2 className="h-6 w-6 text-primary" />,
      title: "Real Estate",
      description: "Browse properties for sale and investment opportunities",
      href: "/categories/real-estate",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Jobs",
      description: "Find employment opportunities and career services",
      href: "/categories/jobs",
    },
  ]

  return (
    <div className="container py-10 mx-auto">
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Categories</h1>
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          Explore our wide range of categories to find exactly what youre looking for
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
  )
}

