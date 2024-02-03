import express from 'express'
import mongoose from 'mongoose'
import Hotel from '../models/hotels.js'
import { getHotelbyId, allHotels, updateHotelbyID, deleteHotelbyId, addNewHotel, getHotelCountbyCity, getHotelCountbyType } from '../controllers/hotel.js'
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js'
const hotelRouter = express()



//get hotel by ID
hotelRouter.get('/find/:id', getHotelbyId)
//Get all Data

hotelRouter.get('/', allHotels)

// Save new hotel -- POST Request
hotelRouter.post('/', verifyAdmin, addNewHotel)

//delete Hotel by ID
hotelRouter.delete('/:id', verifyAdmin, deleteHotelbyId)

//update hotel
hotelRouter.put('/:id', verifyAdmin, updateHotelbyID)

hotelRouter.get('/getHotelCountbyCity', getHotelCountbyCity)
hotelRouter.get('/getHotelCountbyType', getHotelCountbyType)
export default hotelRouter