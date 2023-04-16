import jwt from "jsonwebtoken"; // npm i jsonwebtoken to install this package 

export const verifyToken = async (req, res, next) => { // this is a middleware function  that will be used to verify the token in the header of the request 

  try {
    let token = req.header("Authorization"); // get the token from the header of the request  

    if (!token) {
      return res.status(403).send("Access Denied"); // if there is no token in the header of the request, send a 403 status code and a message
    }

    if (token.startsWith("Bearer ")) {  // if the token starts with "Bearer " then remove it from the token   
      token = token.slice(7, token.length).trimLeft(); // slice the token from the 7th character to the end of the token and remove any white space from the left side of the token
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET); // verify the token using the secret key in the .env file  
    req.user = verified; 
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};