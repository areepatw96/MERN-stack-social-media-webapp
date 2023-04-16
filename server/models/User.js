import mongoose from "mongoose";

const UserSchema = new mongoose.Schema( // Schema for a user in the database (MongoDB)
  {
    firstName: { // First name of the user
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    lastName: { // Last name of the user
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    email: {  // Email of the user
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    password: { // Password of the user
      type: String,
      required: true,
      min: 5,
    },

    picturePath: { // Path to the picture of the user
      type: String,
      default: "",
    },

    friends: { // Array of user IDs of the user's friends
      type: Array,
      default: [],
    },

    location: String, // Location of the user
    occupation: String, // Occupation of the user
    viewedProfile: Number, // Number of times the user's profile has been viewed
    impressions: Number, // Number of times the user's profile has been viewed
  },
  
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema); // Create a model for the user schema
export default User; // Export the user model