import mongoose, { Schema } from "mongoose";

const hospitalSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  websiteLink: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  city: { type: String, required: true },
  googleMapsUrl: { type: String, required: false }, // <<< CHECK THIS LINE VERY CAREFULLY
  createdBy: { type: String, required: true },
});

const Hospitals = mongoose.models.Hospitals || mongoose.model("Hospitals", hospitalSchema);
export default Hospitals;