import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema({
  name: String,
  address: String,
  price: String,
  description: String,
  image: String,
  createdBy: String,
  city: String, 
  googleMapsUrl: { type: String, required: false } // Added Google Maps URL
});

const Rental = mongoose.models.Rental || mongoose.model('Rental', RentalSchema);

export default Rental;