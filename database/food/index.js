import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    isContainEgg: { type: Boolean, required: true },
    category: { type: String, required: true },
    photos: {
      // Referencing
      type: mongoose.Types.ObjectId,
      ref: "Images",
    },
    price: { type: Number, default: 1000, required: true },
    addOns: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Foods",
      },
    ],
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
  },
  {
    // Timestamp -> To track all the changes
    timestamps: true,
  }
);

export const FoodModel = mongoose.model("Foods", FoodSchema);
