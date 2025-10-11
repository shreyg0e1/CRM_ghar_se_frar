import Escape from "../models/Escape.js";

export const addEscape = async (req, res) => {
  try {
    const { image, name, price, type } = req.body;
    if (!image || !name || !price || !type) {
      console.log("All fields are required");
      return res
        .status(404)
        .json({ message: "All fields are required", success: false });
    }
    const escape = new Escape({ image, name, price, type });
    await escape.save();
    return res.status(200).json({ success: true, escape });
  } catch (error) {
    console.log(error);
    return res.status.json(error);
  }
};

export const deleteEscape = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      console.log("Id is required");
      return res
        .status(404)
        .json({ message: "ID is required", success: false });
    }
    const escape = await Escape.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status.json(error);
  }
};

export const getAllEscapes = async (req, res) => {
  try {
    
    const escape = await Escape.find().populate("details");
    
    return res.status(200).json(escape);
  } catch (error) {
    console.log(error);
    return res.status.json(error);
  }
};

export const getSingleEscape = async (req, res) => {
  try {
    const { id } = req.params;

    const escape = await Escape.findById(id).populate("details");
    if (!escape) {
      return res.status(404).json(escape);
    }
    return res.status(200).json(escape);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addDetail = async (req, res) => {
  try {
    const { escapeId, detailsId } = req.body;
    if (!escapeId || !detailsId) {
      return res.status(404).json({ message: "Need both the data" });
    }
    const escape = await Escape.findById(escapeId);
    escape.details = detailsId;
    await escape.save();
    return res.status(200).json({ success: true, escape });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
