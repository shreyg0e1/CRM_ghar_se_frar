import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema(
  {
    video: {
      type: String,
    },
    packageName: {
      type: String,
    },
    discount: {
      type: Number,
    },
    price: {
      type: String,
    },
    packages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Detail = mongoose.model("Detail", detailsSchema);
export default Detail;
