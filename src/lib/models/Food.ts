import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    cuisine: {
        type: String,
        trim: true,
    },
    timings: {
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

// Create and export the Food model
export default mongoose.models.Food || mongoose.model("Food", foodSchema);