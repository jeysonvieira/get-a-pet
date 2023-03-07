import express from 'express'
import mongoose from './db/conn.js'
import cors from 'cors'
import UserRouter from './routers/usersrouter.js'
import PetRouter from './routers/petsrouter.js'


const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))


//Rotas
app.use('/users', UserRouter)
app.use('/pets', PetRouter)

app.listen(5000)