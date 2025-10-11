import express from "express";
import {
  addDetails,
  addPackage,
  getDetails,
} from "../controllers/detailsController.js";

const router = express.Router();

// Add new details
router.post("/add", addDetails);

// Add package to details
router.post("/add-package", addPackage);

// Get details by ID
router.get("/:detailsId", getDetails);

export default router;
