import User from "../models/users.js";
import jwt from "jsonwebtoken"




const GetUserByToken = async (token) => {

    if(!token){
       return res.status(401).json({message : "Acesso negado!"})
    }

    const decoded = jwt.verify(token, "nossosecret")

    const id = decoded.id

    const user = await User.findOne({_id : id}).select("-password")

    return user
}

export default GetUserByToken