import express from "express";
const Router = express.Router();
import { FoodModel } from "../../database/allModels";

// Validation
import { ValidateCategory, ValidateRestaurantId } from "../../validation/food";

/*
Route          /
Desc            Get all the Foods based on the particular Restaurants
Params          _id
Access          Public
Method          Get
*/

Router.get("/:", async (req, res) => {
  try {
    await ValidateRestaurantId(req.params);
    const { _id } = req.params;
    const foods = await FoodModel.find({ restaurant: _id });
    return res.json({ foods });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
Route          /r
Desc            Get all the Foods based on the particular Category
Params          category
Access          Public
Method          Get
*/

Router.get("/r/:category", async (req, res) => {
  try {
    await ValidateCategory(req.params);
    const { category } = req.params;
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
