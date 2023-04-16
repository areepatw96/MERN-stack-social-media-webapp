import express from "express"; // Import express to create a router for the auth routes  
import { login } from "../controllers/auth.js"; // Import the login function from the auth controller 

const router = express.Router(); // Create a router for the auth routes

router.post("/login", login); // Route for logging in a user 

export default router; // Export the router for the auth routes 