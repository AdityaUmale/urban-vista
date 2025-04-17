import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    name: String,
    address: String,
    Phone: String,
    WebsiteLink: String,
    Description: String,
    Image: String,
    createdBy: String,
    city: String, // Added city field
});

const Food = mongoose.models.Food || mongoose.model('Food', FoodSchema);

export default Food;