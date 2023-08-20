import mongoose from "mongoose";

// Key: Datatype
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, requeired: true },
    email: { type: String, required: true },
    password: { type: String }, // Requered -> In auth part
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumbber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("Users", UserSchema);
