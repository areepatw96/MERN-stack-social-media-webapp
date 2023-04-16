import mongoose from "mongoose"; // Import mongoose to create a schema for the post

const postSchema = mongoose.Schema( // Schema for a post in the database (MongoDB) 
  {
    userId: { // User ID of the user who created the post 
      type: String,
      required: true,
    },

    firstName: { // First name of the user who created the post 
      type: String,
      required: true,
    },

    lastName: { // Last name of the user who created the post
      type: String,
      required: true,
    },

    location: String, // Location of the user who created the post
    description: String, // Description of the post
    picturePath: String, // Path to the picture of the post
    userPicturePath: String, // Path to the picture of the user who created the post
    likes: { // Array of user IDs of users who liked the post
      type: Map, // Map is used instead of an array because it is easier to check if a user has already liked a post
      of: Boolean, // The value of each key in the map is a boolean
    },

    comments: { // Array of comments on the post
      type: Array,
      default: [],
    },

  },

  { timestamps: true } // This will automatically add createdAt and updatedAt fields to the schema
  
); 

const Post = mongoose.model("Post", postSchema); // Create a model for the post schema

export default Post; // Export the post model