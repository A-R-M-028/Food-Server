import express from "express";
const Router = express.Router();
import { UserModel } from "../../database/allModels";

/*
Route          /_id
Desc            Get an user data
Params          _id
Access          Public
Method          Get
*/

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);
    return res.json({ user: getUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /update
Desc            Update an user data 
Params          _userId
Access          Public
Method          Put
*/

Router.get("/update/:_userId", async (req, res) => {
  try {
    const { _userId } = req.params;
    const { userData } = req.body;
    const updateUserData = await UserModel.findByIdAndUpdate(
      _userId,
      {
        $set: userData,
      },
      { new: true }
    );
    return res.json({ user: updateUserData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
