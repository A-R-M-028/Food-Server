import express from "express";
import multer from "multer";
import { ImageModel } from "../../database/image";
const Router = express.Router(); // Use the locally created Router

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Define the route for image uploads
Router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Create a new image document
    const newImage = new ImageModel({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    // Save the image to MongoDB
    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error during image upload:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});

export default Router;
