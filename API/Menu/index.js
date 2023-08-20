import express from "express";
const Router = express.Router();
import { ImageModel, MenuModel } from "../../database/allModels";

/*
Route          /list
Desc            Get the list of menu based on id
Params          _id
Access          Public
Method          Get
*/

Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menus = await MenuModel.findOne(_id);
    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /image
Desc            Get the menu images based on id
Params          _id
Access          Public
Method          Get
*/

Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menus = await ImageModel.findOne(_id);
    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
