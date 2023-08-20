import express from "express";
const Router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import passport from "passport";
// Models
import { UserModel } from "../../database/user";
// import { restart } from "nodemon";

// Validation
import { ValidateSignup, ValidateSignin } from "../../validation/auth";

//                                         Designing
/*
Route          /signup
Desc            signup with email and password
Params          None
Access          Public
Method          Post
*/

Router.post("/signup", async (req, res) => {
  // Use try and catch best practice
  try {
    await ValidateSignup(req.body.credentials);
    const { email, password, fullname, phoneNumber } = req.body.credentials;
    // Check whether email or phoneNumber exists or not
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
      return res.json({ error: "User Already Exists" });
    }
    // Hashing
    const bcryptSalt = await bcrypt.genSalt(8); // 8 times extra sec or Hash
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    // DB
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });
    // await UserModel.create({
    //     email: req.body.credentials.email,
    //     fullname: req.body.credentials.fullname,
    //     phoneNumber: req.body.credentials.phoneNumber,
    //     password: hashedPassword,

    // JWT
    const token = jwt.sign({ user: { fullname, email } }, "ZomatoApp");
    return res.status(200).json({ token });
  } catch (error) {
    // Internal Server Error -> Messed up with code
    return res.status(500).json({ error: error.message });
  }
});

/*
Route          /signin
Desc            signin with email and password
Params          None
Access          Public
Method          Post
*/

Router.post("/signin", async (req, res) => {
  // Use try and catch best practice
  try {
    await ValidateSignin(req.body.credentials);
    const { email, password } = req.body.credentials;
    // Check whether email or phoneNumber exists or not
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.json({ error: "Password not matched" });
    }

    // JWT
    const token = jwt.sign(
      { user: { fullname: user.fullname, email } },
      "ZomatoApp"
    );
    // const token = jwt.sign({ user: { fullname: user.fullname, email } }, process.env.JWT_SECRET);

    return res.status(200).json({ token, status: "Success" });
  } catch (error) {
    // Internal Server Error -> Messed up with code
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
