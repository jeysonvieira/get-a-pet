import Pet from "../models/pets.js"
import GetToken from "./get-token.js"
import GetUserByToken from "./get-user-by-token.js"


const CheckOwner = async (req, res) => {

    const token = GetToken(req)

    const user = await GetUserByToken(token)

    const idPet = req.params.id

    const pet = await Pet.findById(idPet).lean()


    if(user.id !== pet.owner){

        return false

    } else{

        return true
    }

}

export default CheckOwner