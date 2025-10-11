import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactUsSchema);
export default Contact;
