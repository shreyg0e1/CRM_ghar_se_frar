// controllers/enquiryController.js
import Enquiry from "../models/Enquiry.js"; // Adjust path as needed

// Add short enquiry (only fullName and mobile required)
export const addShortEnquiry = async (req, res) => {
  try {
    const { fullName, mobile } = req.body;

    // Validation for short enquiry
    if (!fullName || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Full name and mobile are required for short enquiry",
      });
    }

    // Create new short enquiry
    const newEnquiry = new Enquiry({
      fullName,
      mobile,
      shortEnquiry: true,
    });

    // Save to database
    const savedEnquiry = await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Short enquiry submitted successfully",
      data: savedEnquiry,
    });
  } catch (error) {
    console.error("Error adding short enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add full enquiry (all fields required)
export const addFullEnquiry = async (req, res) => {
  try {
    const { fullName, email, mobile, date, traveller, message } = req.body;

    // Validation for full enquiry
    if (!fullName || !email || !mobile || !date || !traveller || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for full enquiry",
      });
    }

    // Create new full enquiry
    const newEnquiry = new Enquiry({
      fullName,
      email,
      mobile,
      date,
      traveller,
      message,
      shortEnquiry: false,
    });

    // Save to database
    const savedEnquiry = await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Full enquiry submitted successfully",
      data: savedEnquiry,
    });
  } catch (error) {
    console.error("Error adding full enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Enquiries retrieved successfully",
      data: enquiries,
      count: enquiries.length,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry retrieved successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error fetching enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete enquiry by ID
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: deletedEnquiry,
    });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
