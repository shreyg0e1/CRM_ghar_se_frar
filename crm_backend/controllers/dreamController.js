// controllers/dreamController.js
import Dream from "../models/DreamTrip.js"; // Adjust path as needed

// Add a new dream
export const addDream = async (req, res) => {
  try {
    const {
      name,
      desination,
      departureDate,
      returnDate,
      durationType,
      travelGroup,
      startingCity,
      contactNumber,
      email,
    } = req.body;

    // Create new dream
    const newDream = new Dream({
      name,
      desination,
      departureDate,
      returnDate,
      durationType,
      travelGroup,
      startingCity,
      contactNumber,
      email,
    });

    // Save to database
    const savedDream = await newDream.save();

    res.status(201).json({
      success: true,
      message: "Dream submitted successfully",
      data: savedDream,
    });
  } catch (error) {
    console.error("Error adding dream:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all dreams
export const getAllDreams = async (req, res) => {
  try {
    const dreams = await Dream.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Dreams retrieved successfully",
      data: dreams,
      count: dreams.length,
    });
  } catch (error) {
    console.error("Error fetching dreams:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get single dream by ID
export const getDreamById = async (req, res) => {
  try {
    const { id } = req.params;

    const dream = await Dream.findById(id);

    if (!dream) {
      return res.status(404).json({
        success: false,
        message: "Dream not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dream retrieved successfully",
      data: dream,
    });
  } catch (error) {
    console.error("Error fetching dream:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete dream by ID
export const deleteDream = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDream = await Dream.findByIdAndDelete(id);

    if (!deletedDream) {
      return res.status(404).json({
        success: false,
        message: "Dream not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dream deleted successfully",
      data: deletedDream,
    });
  } catch (error) {
    console.error("Error deleting dream:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
