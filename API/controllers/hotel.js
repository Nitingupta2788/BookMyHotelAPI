import Hotel from '../models/hotels.js'
import { createError } from '../utils/error.js'

//Get hotel by ID
export const getHotelbyId = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById((req.params.id))
        res.send(getHotel)
    }
    catch (err) {
        next(createError('401', 'Hotel not found'))
    }


}

//Get All hotels
export const allHotels = async (req, res, next) => {
    try {

        let { min, max, ...others } = req.query

        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gte: min | 1, $lte: max || 999 }, })
        res.status(200).json(hotels)

    }
    catch (err) {
        next(err)
    }
}
//Update hotel by ID
export const updateHotelbyID = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    }
    catch (err) {
        res.status(500).json('Can not update the hotels, check logs for errors')
    }


}

export const deleteHotelbyId = async (req, res) => {
    try {

        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been deleted')
    }
    catch (err) {
        res.send(err)
    }

}
//Create new Hotel
export const addNewHotel = async (req, res) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch (err) {
        console.log(err)
        res.status(500).json()
    }
}

//Hotel Count by Country

export const getHotelCountbyCity = async (req, res, next) => {

    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map((city) => Hotel.countDocuments({ city: city })))

        res.status(200).json(list)
    }
    catch (err) {
        next(createError('401', 'Some problem occurs'))
    }

    res.status(200)
}



export const getHotelCountbyType = async (req, res, next) => {
    try {
        const hotels = await (Hotel.countDocuments({ type: 'Hotels' }))

        const cabin = await (Hotel.countDocuments({ type: 'Cabin' }))
        const Resort = await (Hotel.countDocuments({ type: 'Resort' }))
        const Villas = await (Hotel.countDocuments({ type: 'Villas' }))
        const Apartment = await (Hotel.countDocuments({ type: 'Apartment' }))
        const list = { 'hotels': hotels, 'cabin': cabin, 'Resort': Resort, 'Villas': Villas, 'Apartment': Apartment }
        res.status(200).json(list)
    }
    catch (err) {
        next(createError(402, 'Some error has occured'))
    }
    // try {
    //     const list = await Promise.all(cities.map((city) => Hotel.countDocuments({ city: city })))

    //     res.status(200).json(list)
    // }
    // catch (err) {
    //     next(createError('401', 'Some problem occurs'))
    // }

    res.status(200)
}
