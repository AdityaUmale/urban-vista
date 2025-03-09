import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    price: Number,
    image: String,
    createdBy: String,
});

const Food = mongoose.models.Food || mongoose.model("Food", FoodSchema);
export default Food;