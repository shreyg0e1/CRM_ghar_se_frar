import Trip from "../models/Trip.js";

// Add a new trip
export const addTrip = async (req, res) => {
  try {
    const {
      thumbnail,
      title,
      location,
      time,
      video,
      images,
      plans,
      duration,
      destinationRoutes,
      tripHighlights,
      itineary,
      offering,
      packagingList,
      packingTips,
      overview,
      knowBeforeYouGo,
      price,
      durationThumbnail,
      packageOptions, // ✅ added here
    } = req.body;

    // Create new trip
    const trip = new Trip({
      thumbnail,
      title,
      location,
      time,
      video,
      images: images || [],
      plans: plans || [],
      duration,
      destinationRoutes: destinationRoutes || [],
      tripHighlights: tripHighlights || [],
      itineary: itineary || [],
      offering: offering || [],
      packagingList: packagingList || [],
      packingTips: packingTips || [],
      overview: overview || [],
      knowBeforeYouGo: knowBeforeYouGo || [],
      price,
      durationThumbnail,
      packageOptions: packageOptions || [], // ✅ added here
    });

    await trip.save();

    return res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: trip,
    });
  } catch (error) {
    console.error("Error adding trip:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get a single trip by ID
export const getSingleTrip = async (req, res) => {
  try {
    const { tripId } = req.params;



    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// ✅ Add a new package option to an existing trip
export const addPackageOption = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { option, price } = req.body;

    // Check if the trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Add new package option
    trip.packageOptions.push({ option, price });

    // Save updated trip
    await trip.save();

    res.status(200).json({
      message: "Package option added successfully",
      packageOptions: trip.packageOptions,
    });
  } catch (error) {
    console.error("Error adding package option:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
