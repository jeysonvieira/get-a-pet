import PetController from "../controllers/PetsController.js";
import express from 'express'
import CheckToken from "../helpers/check-token.js";

const PetRouter = express.Router()


PetRouter.post('/add', CheckToken, PetController.AddPet)
PetRouter.post('/edit/:id', CheckToken, PetController.EditPet)
PetRouter.get('/remove/:id', CheckToken, PetController.RemovePet)
PetRouter.get('/adoted/:id', CheckToken, PetController.Adoted)
PetRouter.get('/dashboard', CheckToken, PetController.Dashboard)


export default PetRouter