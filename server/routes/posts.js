import express from "express"; // Import express to create a router for the posts routes
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js"; // Import the functions from the posts controller  
import { verifyToken } from "../middleware/auth.js"; 

const router = express.Router(); // Create a router for the posts routes  

/* READ */
router.get("/", verifyToken, getFeedPosts); // Route for getting the posts of the user's friends  
router.get("/:userId/posts", verifyToken, getUserPosts); // Route for getting the posts of a user 

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); // Route for liking a post  

export default router; // Export the router for the posts routes