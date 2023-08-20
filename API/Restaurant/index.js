import express from "express";
const Router = express.Router();
import { RestaurantModel } from "../../database/allModels";

// Validation
import { ValidateRestaurantId } from "../../validation/food";
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant";


/*
Route          /
Desc            Get all the Restaurants details
Params          None
Access          Public
Method          Get
*/

Router.get("/", async (req, res) => {
  try {
    await ValidateRestaurantCity(req.query);
    const { city } = req.query;
    const Restaurants = await RestaurantModel.find({ city });
    return res.json({ Restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /
Desc            Get particular Restaurant details on ID
Params          id
Access          Public
Method          Get
*/

Router.get("/:_id", async (req, res) => {
  try {
    // in mongodb _df -> Unique id
    await ValidateRestaurantId(req.params);
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findOne(_id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /
Desc            Get Restaurant details on search
Params          none
Body            searchString     
Access          Public
Method          Get
*/
// Regex -> "xxxyyyzzz" -> yyy
Router.get("/search", async (req, res) => {
  try {
    await ValidateRestaurantSearchString(req.params);
    const { seachString } = req.body;
    const restaurants = await RestaurantModel.find({
      // options -> Not case sensetive
      name: { $regex: seachString, $options: "i" },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
