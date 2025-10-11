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
      knowBeforeYouGo,
      price,
      durationThumbnail,
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
