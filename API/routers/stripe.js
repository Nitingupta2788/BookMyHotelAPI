import express from 'express'
import { stripePayment } from '../controllers/stripe.js'


const stripeRouter = express.Router()


stripeRouter.post('/payment', stripePayment)

export default stripeRouter
