import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 10,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location : String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    }, {timestamps: true}
    ); // used to add the createdAt and updatedAt fields

const User = mongoose.model("User", userSchema); // used to create a model

export default User;
         