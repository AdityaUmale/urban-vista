import mongoose from "mongoose";

const HospitalsSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    image: String,
    createdBy: String,
    city: String,
});

const Hospitals = mongoose.models.Hospitals || mongoose.model("Hospitals", HospitalsSchema);
export default Hospitals;