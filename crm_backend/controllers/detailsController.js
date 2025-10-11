import mongoose from "mongoose";
import Package from "../models/Package.js";
import Details from "../models/Details.js";

export const addDetails = async (req, res) => {
  try {
    const { video, packageName, discount, price } = req.body;
    const details = new Details({
      video,
      packageName,
      discount,
      price,
    });
    await details.save();
    return res.status(200).json({ success: true, details });
  } catch (error) {
    console.log(error);
    return res.status.json(error);
  }
};

export const addPackage = async (req, res) => {
  try {
    const { packageId, detailsId } = req.body;
    const details = await Details.findById(detailsId);
    if(!details){
      return res.status(404).json({message:"Detail not found"})
    }
    details.packages.push(packageId);
    await details.save();
    return res.status(200).json({ success: true, details });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const getDetails = async (req, res) => {
  try {
    const { detailsId } = req.params;

    const detail = await Details.findById(detailsId).populate({
      path: "packages",
      populate: {
        path: "tours", // field in Package schema
        model: "Trip", // the ref name from your schema
      },
    });

    return res.status(200).json({ success: true, detail });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

