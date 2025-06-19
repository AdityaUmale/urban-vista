import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TransportationNotFound() {
  return (
    <div className="container max-w-4xl py-16 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Transportation Service Not Found</h1>
      <p className="text-gray-600">
        We couldn&apos;t find the transportation service you&apos;re looking for.
      </p>
      <Link 
        href="/transportation" 
        className="flex items-center text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to all transportation services
      </Link>
    </div>
  );
}