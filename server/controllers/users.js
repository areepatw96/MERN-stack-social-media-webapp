import User from "../models/User.js"; // import User model from the User.js file in the models folder


/* READ */

export const getUser = async (req, res) => { // get a specific user from the database

  try {
    const { id } = req.params; // get the id from the request parameters
    const user = await User.findById(id); // find the user in the database with the id
    res.status(200).json(user); // send the user back to the client as a response

  } catch (err) {
    res.status(404).json({ message: err.message }); 
  }
};

export const getUserFriends = async (req, res) => { // get all the friends for a specific user from the database

  try {
    const { id } = req.params; 
    const user = await User.findById(id);

    const friends = await Promise.all( // get all the friends for the user 
      user.friends.map((id) => User.findById(id)) // map through the friends array and find each friend in the database
    );

    const formattedFriends = friends.map( 
        // format the friends array to only include the id, firstName, lastName, occupation, location, and picturePath for each friend 
        
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {  
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends); // send the formatted friends array back to the client as a response

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const addRemoveFriend = async (req, res) => { // add or remove a friend from a user's friends list 

  try {   
    const { id, friendId } = req.params; // get the id and friendId from the request parameters
    const user = await User.findById(id); // find the user in the database with the id 
    const friend = await User.findById(friendId); // find the friend in the database with the friendId 

    if (user.friends.includes(friendId)) { 
        // if the user's friends list includes the friendId, remove the friendId from the user's friends list and remove the id from the friend's friends list 

      user.friends = user.friends.filter((id) => id !== friendId);  
      friend.friends = friend.friends.filter((id) => id !== id); 
    } else { 
        // if the user's friends list does not include the friendId, add the friendId to the user's friends list and add the id to the friend's friends list

      user.friends.push(friendId); 
      friend.friends.push(id);
    }
    await user.save(); // save the user and friend to the database  
    await friend.save();    

    const friends = await Promise.all( // get all the friends for the user 
      user.friends.map((id) => User.findById(id)) 
    );

    const formattedFriends = friends.map( 
        // format the friends array to only include the id, firstName, lastName, occupation, location, and picturePath for each friend

      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);  // send the formatted friends array back to the client as a response

  } catch (err) {
    res.status(404).json({ message: err.message }); 
  }
};