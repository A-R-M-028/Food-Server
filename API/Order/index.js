import express from "express";
const Router = express.Router();
import { OrderModel } from "../../database/allModels";

// Authentication
import passport from "passport";
import { Jwt } from "jsonwebtoken";
/*
Route          /
Desc            Get all Orders
Params          _id
Access          Public
Method          Get
*/

Router.get("/:_id", passport.authenticate("jwt, {session: false "), async (req, res) => {
  try {
    const { _id } = req.params;
    const getOrders = await OrderModel.findOne({ user: _id });

    if (!getOrders) {
      return res.status(404).json({ error: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /new
Desc            Add new orders
Params          _id
Access          Public
Method          Post
*/

Router.post("/new/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { orderDetails } = req.body;
    const addNewOrder = await OrderModel.findOneAndUpdate(
      { user: _id },
      { $push: { orderDetails: orderDetails } },
      { new: true }
    );
    return res.json({ order: addNewOrder });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
