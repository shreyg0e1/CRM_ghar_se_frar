// routes/dreamRoutes.js
import express from "express";
import {
  addDream,
  getAllDreams,
  getDreamById,
  deleteDream,
} from "../controllers/dreamController.js";

const router = express.Router();

// Add a new dream
router.post("/add", addDream);

// Get all dreams
router.get("/all", getAllDreams);

// Get single dream by ID
router.get("/dreams/:id", getDreamById);

// Delete dream by ID
router.delete("/dreams/:id", deleteDream);

export default router;
