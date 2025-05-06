import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    websiteLink: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    cuisine: { type: String },
    rating: { type: String },
    hours: { type: String },
    createdBy: { type: String },
    city: { type: String, required: true },
    googleMapsUrl: { type: String, required: false } // Added Google Maps URL
});

const Food = mongoose.models.Food || mongoose.model('Food', FoodSchema);

export default Food;