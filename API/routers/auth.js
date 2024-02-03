import express from 'express'
import { createUser, login } from '../controllers/auth.js'

const regRouters = express.Router()

regRouters.post('/register', createUser)
regRouters.post('/login', login)

export default regRouters