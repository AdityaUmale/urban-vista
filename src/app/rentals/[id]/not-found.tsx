import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RentalNotFound() {
  return (
    <div className="container max-w-4xl py-16 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Rental Property Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8">
        The rental property you're looking for doesn't exist or has been removed.
      </p>
      <Link 
        href="/rentals" 
        className="flex items-center text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all rental properties
      </Link>
    </div>
  );
}