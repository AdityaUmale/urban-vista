import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema({
  name: String,
  address: String,
  price: String,
  description: String,
  image: String,
  createdBy: String,
  city: String, // Make sure city field is defined here
});

const Rental = mongoose.models.Rental || mongoose.model('Rental', RentalSchema);

export default Rental;