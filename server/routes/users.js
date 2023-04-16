import express from "express"; // Import express to create a router for the users routes 

import {  // Import the functions from the users controller   
  getUser,  
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";  
import { verifyToken } from "../middleware/auth.js";

const router = express.Router(); // Create a router for the users routes

/* READ */
router.get("/:id", verifyToken, getUser); // Route for getting a user 
router.get("/:id/friends", verifyToken, getUserFriends); // Route for getting a user's friends

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); // Route for adding or removing a friend

export default router; // Export the router for the users routes