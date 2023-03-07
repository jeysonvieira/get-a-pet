import express from 'express'
import UserController from '../controllers/UsersController.js'
import CheckToken from '../helpers/check-token.js'


const UserRouter = express.Router()

UserRouter.post('/signup',UserController.Signup)

UserRouter.post('/login', UserController.Login)

UserRouter.get('/checkuser', UserController.Checkuser)

UserRouter.get('/getid/:id', UserController.GetUserId)

UserRouter.patch('/edit', CheckToken, UserController.Edit)

export default UserRouter