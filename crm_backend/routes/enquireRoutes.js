// routes/enquiryRoutes.js
import express from "express";
import {
  addShortEnquiry,
  addFullEnquiry,
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

// Add short enquiry (only fullName and mobile)
router.post("/add/short", addShortEnquiry);

// Add full enquiry (all fields)
router.post("/add/full", addFullEnquiry);

// Get all enquiries
router.get("/all", getAllEnquiries);

// Get single enquiry by ID
router.get("/get/:id", getEnquiryById);

// Delete enquiry by ID
router.delete("/delete/:id", deleteEnquiry);

export default router;
