import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constants/regex.js";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a full name"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    city: {
      type: String,
      required: [true, "Please provide a city name"],
    },
    country: {
      type: String,
      default: "Nepal",
    },
    province: String,
    street: String,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => {
        return EMAIL_REGEX.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  profileImageUrl: String,
  roles: {
    type: [String],
    default: ["user"],
    enum: ["user", "admin", "merchant"],
  },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

    const model = mongoose.model("User", userSchema);
    export default model;
// yaha hamile user ko schema banako xa jasma chai name, address, email, password, profileImageUrl, roles, createdAt vanne field haru xa