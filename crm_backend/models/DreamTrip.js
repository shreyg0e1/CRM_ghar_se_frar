import mongoose from "mongoose";

const dreamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    desination: {
      type: String,
    },
    departureDate: {
      type: String,
    },
    returnDate: {
      type: String,
    },
    durationType: {
      type: String,
    },
    travelGroup: {
      type: String,
    },
    startingCity: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Dream = mongoose.model("Dream", dreamSchema);
export default Dream;
