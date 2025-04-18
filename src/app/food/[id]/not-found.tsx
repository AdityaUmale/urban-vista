import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FoodPlaceNotFound() {
  return (
    <div className="container max-w-4xl py-16 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Restaurant Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8">
        The restaurant or food place youre looking for doesnt exist or has been removed.
      </p>
      <Link 
        href="/food" 
        className="flex items-center text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all food places
      </Link>
    </div>
  );
}