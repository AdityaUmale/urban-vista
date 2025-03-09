import mongoose from "mongoose";

const RentalRoomsSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    image: String,
    createdBy: String,
});

const RentalRooms = mongoose.models.RentalRooms || mongoose.model("RentalRooms", RentalRoomsSchema);
export default RentalRooms;