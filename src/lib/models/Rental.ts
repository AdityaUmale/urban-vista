import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: String,
    required: [true, 'Creator is required'],
    trim: true,
  },
}, {
  timestamps: true,
});

// Create and export the Rental model
export default mongoose.models.Rental || mongoose.model('Rental', rentalSchema); 