import Package from "../models/Package.js";

export const addPackage = async (req, res) => {
  try {
    const { name } = req.body;
    const packageData = new Package({ name });
    await packageData.save();
    return res.status(200).json({ success: true, packageData });
  } catch (error) {
    console.log(error);
    return res.status.json(error);
  }
};

export const addTourToPackage = async (req, res) => {
  try {
    const { packageId, tourId } = req.body;

    if (!packageId || !tourId) {
      return res
        .status(400)
        .json({ success: false, message: "packageId and tourId are required" });
    }

    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res
        .status(404)
        .json({ success: false, message: "Package not found" });
    }

    packageData.tours.push(tourId);
    await packageData.save();

    return res.status(200).json({ success: true, packageData });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


export const getSinglePackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const packageData = await Package.findById(packageId).populate("tours");
    return res.status(200).json({ success: true, packageData });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
