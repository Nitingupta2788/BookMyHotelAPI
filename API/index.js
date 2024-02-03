import express from 'express'
import mongoose from 'mongoose'
import hotelRouter from './routers/hotels.js'
import regRouters from './routers/auth.js'
import userRouter from './routers/users.js'
import roomRouter from './routers/rooms.js'
import dotenv from 'dotenv'
import { errorHandler } from './utils/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'



const app = express()
const port = 3000
app.use(express.json())
dotenv.config()
const connecttoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to Mongo DB')
    }
    catch (err) {
        console.log(err)
    }
}
app.listen(port, () => {
    connecttoDB()
    console.log(`Listening to Port ${port}`)
})
app.use(cors())
app.use(cookieParser())
app.use('/hotels', hotelRouter)
app.use('/auth', regRouters)
app.use('/user', userRouter)
app.use('/rooms', roomRouter)
app.use(errorHandler)