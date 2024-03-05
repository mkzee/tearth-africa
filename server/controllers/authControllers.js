import User from "../models/users.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import jwt from "jsonwebtoken";


const signUp = asyncWrapper(async (req, res) => {
    const newUser = await User.create(req.body);

    const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    })

    res.cookie("jwt", token, {
        httpOnly: false,
        maxAge: process.env.LOGIN_EXPIRES * 1000
    }).status(201).json({
        status: 'success',
        token: token,
        data: newUser
    })
})

export default {
    signUp
}