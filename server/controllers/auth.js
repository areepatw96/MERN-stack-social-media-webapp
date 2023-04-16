import bcrypt from "bcrypt"; // for hashing passwords
import jwt from "jsonwebtoken"; // for creating tokens
import User from "../models/User.js"; // for creating new users


/* REGISTER USER */

export const register = async (req, res) => {   // async function to register a new user in the database

  try {  // try to register a new user
    const {     
      firstName, 
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body; // get the data from the request body

    const salt = await bcrypt.genSalt(); // generate a salt for hashing the password with bcrypt 
    const passwordHash = await bcrypt.hash(password, salt); // hash the password with the salt 

    const newUser = new User({ // create a new user with the data from the request body and the hashed password 
      firstName,
      lastName,
      email,
      password: passwordHash, // use the hashed password instead of the plain text password
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // generate a random number for the viewedProfile and impressions properties
      impressions: Math.floor(Math.random() * 10000), // generate a random number for the viewedProfile and impressions properties
    });

    const savedUser = await newUser.save(); // save the new user to the database
    res.status(201).json(savedUser); // send the new user back to the client as a response

  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

/* LOGGING IN */

export const login = async (req, res) => { // async function to log in a user 

  try { // try to log in a user 
    const { email, password } = req.body; // get the email and password from the request body
    const user = await User.findOne({ email: email }); // find the user in the database
    if (!user) return res.status(400).json({ msg: "User does not exist. " }); // if the user does not exist, send an error message back to the client

    const isMatch = await bcrypt.compare(password, user.password); // compare the password from the request body with the hashed password in the database
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " }); // if the passwords do not match, send an error message back to the client

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // create a token for the user 
    delete user.password; // delete the password from the user object
    res.status(200).json({ token, user }); // send the token and user back to the client as a response  

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};