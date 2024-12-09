import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: Number,
    required: [true, "Password is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
