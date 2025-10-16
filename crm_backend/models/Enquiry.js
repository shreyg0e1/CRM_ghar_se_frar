import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    date: {
      type: String,
    },
    traveller: {
      type: String,
    },
    message: {
      type: String,
    },
    shortEnquiry: {
      type: Boolean,
      default: true,
    },
    packageName: {
      type: String,
    },
    price: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
