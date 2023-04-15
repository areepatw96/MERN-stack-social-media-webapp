import User from '../models/user'; // used to import the user model

/*read*/
export const getUsers = async (req, res) => { // used to get a user
    try {
        const { id } = req.params;  // used to get the id from the params
        const user = await User.findById(id);  // used to find the user by id
        res.status(200).json(user); // used to send the user back to the client
    } catch (err) {
        res.status(404).json( {message: err.message} );
    }
}

export const getUserFriends = async (req, res) => {  // used to get a user's friends if we need to use them separately
    try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map( 
        ({ _id, firstName, lastName, occupation, location, picturePath}) => {
            return{ _id, firstName, lastName, occupation, location, picturePath};
}
    );

    res.status(200).json(formattedFriends); 

} catch (err) {
    res.status(404).json({ message: err.message });
}

}

/*update*/
export const addRemoveFriend = async (req, res) => {
try{  // used to add or remove a friend")
const { id, friendID } = req.params;
const user = await User.findById(id);
const friend = await User.findById(friendId);

if (user.friends.includes(friendID)) { // used to check if the user already has the friend
    user.friends = user.friends.filter((id) => id !== friendID);
    friend.friends = friend.friends.filter((id) => id !== id);

} else { // used to add the friend if not already added
    user.friends.push(friendID);
    friend.friends.push(id);
}

await user.save(); // used to save the user
await friend.save(); // used to save the friend

const friends = await Promise.all( // used to get the friends of the user
    user.friends.map((id) => User.findById(id))  
);

const formattedFriends = friends.map( // used to format the friends
    ({ _id, firstName, lastName, occupation, location, picturePath}) => {
        return{ _id, firstName, lastName, occupation, location, picturePath};
}
);

res.status(200).json(formattedFriends);

} catch (err) {
    res.status(404).json({ message: err.message });
}

}