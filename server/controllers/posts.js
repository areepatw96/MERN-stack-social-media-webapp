import Post from "../models/Post.js"; // import Post model
import User from "../models/User.js"; // import User model


/* CREATE */

export const createPost = async (req, res) => { // create a new post and save it to the database

  try {
    const { userId, description, picturePath } = req.body; // get the userId, description, and picturePath from the request body
    const user = await User.findById(userId); // find the user in the database
    const newPost = new Post({ // create a new post
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {}, // set the likes to an empty object (we will use this to store the userIds of the users who have liked the post)
      comments: [], // set the comments to an empty array (we will use this to store the comments for the post)
    });

    await newPost.save(); // save the new post to the database

    const post = await Post.find(); // find all the posts in the database
    res.status(201).json(post); // send the posts back to the client as a response

  } catch (err) {
    res.status(409).json({ message: err.message });  // if there is an error, send the error message back to the client as a response
  }
};

/* READ */

export const getFeedPosts = async (req, res) => { // get all the posts in the database 

  try {
    const post = await Post.find(); 
    res.status(200).json(post);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => { // get all the posts for a specific user

  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => { // like or unlike a post

  try {
    const { id } = req.params;  // get the id of the post from the request parameters
    const { userId } = req.body; // get the userId from the request body
    const post = await Post.findById(id); 
    const isLiked = post.likes.get(userId);

    if (isLiked) { // if the post is already liked by the user, remove the like
      post.likes.delete(userId);  
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate( // update the post in the database
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost); // send the updated post back to the client as a response
    
  } catch (err) {
    res.status(404).json({ message: err.message }); // if there is an error, send the error message back to the client as a response
  }
};