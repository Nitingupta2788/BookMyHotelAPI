
import User from "../models/users.js";
import bcrypt from 'bcrypt'
import { createError } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {

    try {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash

        })

        await newUser.save()
        res.status(200).json('User Created Sucesffuly')
    }
    catch (err) {
        next(err)
    }



}

export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(createError(404, "user not found"))
        }

        const userPassword = bcrypt.compareSync(req.body.password, user.password)
        if (!userPassword) {
            return next(createError(401, "user or password does not match"))
        }
        const { password, isAdmin, ...otherDetails } = user._doc
        const token = Jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({ ...otherDetails })
    }

    catch (err) {
        res.status(next(err))
    }

}