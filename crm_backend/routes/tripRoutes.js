import express from "express";
import {
  addPackageOption,
  addTrip,
  getSingleTrip,
} from "../controllers/tripController.js";

const router = express.Router();

// Add new trip
router.post("/add", addTrip);

// Get single trip by ID
router.get("/:tripId", getSingleTrip);


router.post("/:tripId/package-options", addPackageOption);


export default router;
