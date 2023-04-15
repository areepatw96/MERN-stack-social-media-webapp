import express from "express";
import bodydyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authroutes from "./routes/auth.js"; 
import userroutes from "./routes/users.js";
import { register } from "./controllers/auth.js";


/* All my middleware(sth that runs between different requests or functions that run in between different things) and package configurations */

const __filename = fileURLToPath(import.meta.url);  // grabs the file url and used esp when we use the modules
const __dirname = path.dirname(__filename); // grabs the directory name
dotenv.config(); // used to load the environment variables from the .env file
const app = express(); // creates an express app
app.use(express.json()); // used to parse the json data
app.use(helmet()); // used to secure the app by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); // sets the Cross-Origin-Resource-Policy header
app.use(morgan("common")); // used to log the requests
app.use(bodydyparser.json({limit: "30mb", extended: true})); // used to parse the json data
app.use(bodydyparser.urlencoded({limit: "30mb", extended: true})); // used to parse the url encoded data
app.use(cors()); // used to enable cors(used to make requests from one domain to another domain)
app.use("/assets", express.static(path.join(__dirname, "<public/assets"))); // used to serve static files


/* Setup my file storage */

const storage = multer.diskStorage({ // used to store the files in the disk
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage}); // used to upload the files


/* Setup my routes with files*/

app.post("auth/register", upload.single("picture"), register); // used to register a user


/* Setup my routes */

app.use("/auth", authroutes); // used to register a user
app.use("/users", userroutes); // used to get all the users")



/* Setup Mongoose(my database connection) */

const PORT = process.env.PORT || 6001; // used to set the port
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true}).then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })// used to connect to the database
    .catch((error) => console.log(`${error} did not connet`)); // used to catch any errors