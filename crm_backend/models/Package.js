import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Package name is required"],
    trim: true,
  },
  place:{
    type:String
  },
  tours: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
