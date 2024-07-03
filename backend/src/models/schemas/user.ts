import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [2, "Kullanıcı adı 2 karakterden fazla olmalı."],
        maxLength: [15, "Kullanıcı adı 15 karakterden az olmalı."]
    },
    email: {
        type: String,
        required: true,
        minLength: [5, "Email  5 karakterden fazla olmalı."],
        maxLength: [50, "Email 50 karakterden az olmalı."]
    },
    password: {
        type: String,
        required: true,

    },
    profileImage: {
        type: String,
    },
    bio: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model("Users", userSchema);

import User from "./user";

export const getUsers = () => User.find();
export const getUserById = (userId: string) => User.findOne({ _id: userId });
export const getUserByEmail = (email: string) => User.findOne({ email: email });

export const createUser = (values: object) => new User(values).save().then(user => user.toObject());
export const updateUserById = (userId: string, values: object) => User.findByIdAndUpdate(userId, values);
export const deleteUserById = (userId: string) => User.findByIdAndDelete(userId);

