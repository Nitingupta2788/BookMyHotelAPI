import User from '../models/users.js'
import { createError } from '../utils/error.js'

//Get All Users

export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    }
    catch (err) {
        next(err)
    }
}

//Get User by ID

export const getUserbyID = async (req, res, next) => {
    try {

        const user = await User.findById((req.params.id))
        res.status(200).json(user)
    }
    catch (err) {
        next(err)
    }
}

//update User 

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    }
    catch (err) {
        next(createError(500, 'Can not update the user'))
    }
}

//Delete User

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User deleted')
    }
    catch (err) {
        next(createError(500, "Can not delete user"))
    }
}