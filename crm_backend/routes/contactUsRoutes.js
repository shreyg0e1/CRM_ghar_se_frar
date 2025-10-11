// routes/contactRoutes.js
import express from "express";
import {
  addContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../controllers/contactUsController.js";

const router = express.Router();

// Add a new contact
router.post("/add", addContact);

// Get all contacts
router.get("/all", getAllContacts);

// Get single contact by ID
router.get("/contacts/:id", getContactById);

// Delete contact by ID
router.delete("/contacts/:id", deleteContact);

export default router;
