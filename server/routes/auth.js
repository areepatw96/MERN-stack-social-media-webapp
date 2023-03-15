import express from "express";
import {login} from "../controllers/auth.js";

const router = express.Router(); // used to create a router

router.post("/login", login); // used to login a user

export default router; // used to connect to the database