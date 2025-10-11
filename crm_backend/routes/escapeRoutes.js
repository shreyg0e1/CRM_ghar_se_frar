import express from "express";
import {
  addEscape,
  deleteEscape,
  getAllEscapes,
  getSingleEscape,
  addDetail,
} from "../controllers/escapeController.js";

const router = express.Router();

// Create a new escape
router.post("/add", addEscape);

// Delete escape by ID
router.delete("/delete", deleteEscape);

// Get all escapes
router.get("/all", getAllEscapes);

// Get single escape by ID
router.get("/:id", getSingleEscape);

// Add detail to escape
router.post("/add-detail", addDetail);

export default router;
