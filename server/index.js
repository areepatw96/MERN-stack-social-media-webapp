import express from "express"; // Import express to create the server    
import bodyParser from "body-parser"; // Import body-parser to parse the request body 
import mongoose from "mongoose"; // Import mongoose to connect to the database
import cors from "cors"; // Import cors to allow cross-origin requests
import dotenv from "dotenv"; // Import dotenv to use environment variables 
import multer from "multer"; // Import multer to upload files
import helmet from "helmet"; // Import helmet to secure the server
import morgan from "morgan"; // Import morgan to log HTTP requests
import path from "path"; // Import path to get the current directory
import { fileURLToPath } from "url"; // Import fileURLToPath to get the current directory
import authRoutes from "./routes/auth.js"; // Import the auth routes
import userRoutes from "./routes/users.js"; // Import the users routes
import postRoutes from "./routes/posts.js"; // Import the posts routes
import { register } from "./controllers/auth.js"; // Import the register function from the auth controller
import { createPost } from "./controllers/posts.js"; // Import the createPost function from the posts controller
import { verifyToken } from "./middleware/auth.js"; // Import the verifyToken function from the auth middleware
import User from "./models/User.js"; // Import the user model  
import Post from "./models/Post.js"; // Import the post model
import { users, posts } from "./data/index.js"; // Import the users and posts data

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url); // Get the current directory 
const __dirname = path.dirname(__filename); // Get the current directory

dotenv.config();
const app = express(); // Create the server  

app.use(express.json()); // Parse the request body
app.use(helmet()); // Secure the server
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Secure the server
app.use(morgan("common")); // Log HTTP requests
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse the request body
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse the request body
app.use(cors()); // Allow cross-origin requests
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Allow access to the public folder  

/* FILE STORAGE */
const storage = multer.diskStorage({ // Set the destination and filename for the uploaded file 
  destination: function (req, file, cb) { 
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }); // Upload the file

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register); // Route for registering a user
app.post("/posts", verifyToken, upload.single("picture"), createPost); // Route for creating a post 

/* ROUTES */
app.use("/auth", authRoutes); // Use the auth routes
app.use("/users", userRoutes); // Use the users routes
app.use("/posts", postRoutes); // Use the posts routes

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; // Set the port for the server 
mongoose
  .connect(process.env.MONGO_URL, {  // Connect to the database
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(() => { // If the connection is successful
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`)); // Start the server  

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`)); // If the connection is unsuccessful 
