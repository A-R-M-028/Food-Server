import express from "express";
const Router = express.Router();
import { ReviewModel } from "../../database/allModels";

/*
Route          /new
Desc            Add new Review
Params          Review Object
Access          Public
Method          Post
*/

Router.get("/:_id", async (req, res) => {
  try {
    const { reviewData } = req.body;
    await ReviewModel.create(reviewData);
    return res.json({ review: "Sucessfully Created Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /delete
Desc            Delete a Review
Params          _id
Access          Public
Method          Delete
*/

Router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ReviewModel.findByIdAndDelete(_id);
    return res.json({ review: "Sucessfully Deleted Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
