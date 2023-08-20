//  env variable
require("dotenv").config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import helmet from "helmet";

// API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/Order";
import Review from "./API/Review";

// Config
import routeConfig from "./config/routeConfig";
import passport from "passport";

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const food = express(); // Initialized

food.use(express.json());
food.use(express.urlencoded({ extended: false }));
food.use(helmet());
food.use(cors());

// Route config
routeConfig(passport); // Pass the passport instance to the routeConfig function
food.use(passport.initialize()); // Initialize passport middleware

food.use("/auth", Auth);
food.use("/restaurant", Restaurant);
food.use("/restaurant", Food);
food.use("/menu", Menu);
food.use("/image", Image);
food.use("/order", Order);
food.use("/review", Review);

food.get("/", (req, res) => {
  res.json({ message: "Setup Successfull!" });
});

food.listen(4000, () => {
  console.log("Server is up and running");
});
