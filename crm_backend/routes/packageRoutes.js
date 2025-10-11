import express from "express";
import {
  addPackage,
  addTourToPackage,
  getSinglePackage,
} from "../controllers/packageController.js";

const router = express.Router();

// Add new package
router.post("/add", addPackage);

// Add tour to package
router.post("/add-tour", addTourToPackage);

// Get single package by ID
router.get("/:packageId", getSinglePackage);

export default router;
