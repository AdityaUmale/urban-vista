import mongoose from 'mongoose';

const EduInstituteSchema = new mongoose.Schema({
    name: String,
    address: String,
    Phone: String,
    WebsiteLink: String,
    Description: String,
    Image: String,
    createdBy: String,
    city: String, // Added city field
    pdfUrl: String, // Added PDF URL field
    pdfName: String, // Added PDF name field
    googleMapsUrl: String, // Added Google Maps URL field
});

const EduInstitute = mongoose.models.EduInstitute || mongoose.model('EduInstitute', EduInstituteSchema);

export default EduInstitute;
