import User from "../models/users.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import jwt from "jsonwebtoken";

const  signToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    })
}


const signUp = asyncWrapper(async (req, res) => {
    const newUser = await User.create(req.body);
    

    const token = signToken(newUser.id)

    res.status(201).json({
        status: 'success',
        token: token,
        user: newUser
    })
})

const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body

    console.log({email, password})

    if (!email || !password) {
        const error = new Error('Please provide an email or password');
        return  next(error)
    }

    const user = await User.findOne({email}).select('+password');
    
    const isMatch = await user.comparePassword(password, user.password)

    if (!user || !isMatch) {
        const error = new Error('Email or Password is incorrect');
        error.statusCode = 400
        return next(error)
    }

    const token = signToken(user.id)

    res.status(201).json({
        status: 'success',
        token: token,
        user: {
            email: user.email,
            userName: user.userName
        }
    })
})

export default {
    signUp,
    login
}