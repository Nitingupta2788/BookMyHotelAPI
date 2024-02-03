import Room from '../models/Room.js'
import Hotel from '../models/hotels.js'
import { createError } from '../utils/error.js'

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {

            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    }
    catch (err) {
        next(err)
    }
}

export const getRoomsbyHotelID = async (req, res, next) => {
    const hotelid = req.params.hotelid
    try {
        const roomsID = await Hotel.findById(hotelid)
        const arrayofRooms = roomsID.rooms
        const roomsinHotel = await Room.find({ _id: { $in: arrayofRooms } })

        res.send(roomsinHotel)
    }
    catch (err) {
        next(createError(403, 'Can not get the Rooms'))
    }

}

export const updateRoom = async (req, res, next) => {
    try {
        const roomID = req.params.id
        const getUpdatedRoom = await Room.findByIdAndUpdate(roomID, { $set: req.body }, { new: true })
        res.status(200).json(getUpdatedRoom)
    }
    catch (err) {
        next(403, 'Can not update the Room')
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};
export const deleteRoom = async (req, res, next) => {
    await Room.findByIdAndDelete(req.params.id)
    res.status(200).json('Room Deleted')
}