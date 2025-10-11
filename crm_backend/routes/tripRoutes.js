import express from "express";
import {
  addTrip,
  getSingleTrip,
} from "../controllers/tripController.js";

const router = express.Router();

// Add new trip
router.post("/add", addTrip);

// Get single trip by ID
router.get("/:tripId", getSingleTrip);


export default router;
