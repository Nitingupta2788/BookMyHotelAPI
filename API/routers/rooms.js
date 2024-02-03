import express from 'express'
import { createRoom, getRoomsbyHotelID, updateRoom, updateRoomAvailability } from '../controllers/Rooms.js'
const roomRouter = express.Router()

roomRouter.post('/:hotelid', createRoom)
roomRouter.get('/:hotelid', getRoomsbyHotelID)
roomRouter.put('/:id', updateRoom)
roomRouter.put("/availability/:id", updateRoomAvailability);
export default roomRouter