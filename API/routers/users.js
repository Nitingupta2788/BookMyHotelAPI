import express from 'express'
import { getAllUsers, getUserbyID, updateUser, deleteUser } from '../controllers/user.js'
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js'
const userRouter = express.Router()

userRouter.get('/checkauthentication', verifyToken, (req, res) => {
    res.send('You are authenticated')
})

userRouter.get('/checkUser/:id', verifyUser, (req, res) => {
    res.send('You are authorized to delete your id')
})

userRouter.get('/', verifyAdmin, getAllUsers)
userRouter.get('/:id', verifyUser, getUserbyID)
userRouter.put('/:id', verifyAdmin, updateUser)
userRouter.delete('/:id', verifyAdmin, deleteUser)
export default userRouter