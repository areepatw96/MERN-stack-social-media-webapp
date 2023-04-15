import express from "express";
import {
    getUsers,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*read*/
router.get("/:id", verifyToken, getUsers); // used to get a user
router.get("/:id/friends", verifyToken, getUserFriends); // used to get a user's friends if we need to use them separately

/*update*/
router.patch("/:id/:friendID", verifyToken, addRemoveFriend); // used to add or remove a friend")