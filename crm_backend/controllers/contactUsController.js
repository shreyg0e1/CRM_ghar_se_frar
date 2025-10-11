// controllers/contactController.js
import Contact from "../models/ContactUs.js"; // Adjust path as needed

// Add a new contact
export const addContact = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile } = req.body;

    // Simple validation
    if (!firstName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "First name, email, and mobile are required",
      });
    }

    // Create new contact
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      mobile,
    });

    // Save to database
    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact added successfully",
      data: savedContact,
    });
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by latest first

    res.status(200).json({
      success: true,
      message: "Contacts retrieved successfully",
      data: contacts,
      count: contacts.length,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get single contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact retrieved successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete contact by ID
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: deletedContact,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
