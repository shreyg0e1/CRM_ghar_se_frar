import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
    },
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    price: {
      type: String,
    },
    durationThumbnail: {
      type: String,
    },
    time: {
      type: String,
    },
    video: {
      type: String,
    },
    packageOptions: [
      {
        option: {
          type: String,
        },
        price: {
          type: String,
        },
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    plans: [
      {
        type: String,
      },
    ],
    duration: {
      type: String,
    },
    destinationRoutes: [
      {
        type: String,
      },
    ],
    tripHighlights: [
      {
        type: String,
      },
    ],
    itineary: [
      {
        image: {
          type: String,
        },
        day: {
          type: String,
        },
        details: {
          type: String,
        },
      },
    ],
    offering: [
      {
        include: [
          {
            type: String,
          },
        ],
        exclude: [
          {
            type: String,
          },
        ],
      },
    ],
    packagingList: [
      {
        pack: {
          title: {
            type: String,
          },
          details: [
            {
              type: String,
            },
          ],
        },
      },
    ],
    packingTips: [
      {
        type: String,
      },
    ],
    overview: [
      {
        pickup: {
          type: String,
        },
        drop: {
          type: String,
        },
        included: [
          {
            type: String,
          },
        ],
        essentials: [
          {
            type: String,
          },
        ],
      },
    ],
    knowBeforeYouGo: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
