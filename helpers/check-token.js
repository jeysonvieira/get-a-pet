import jwt from 'jsonwebtoken'
import GetToken from './get-token.js'



const CheckToken = (req, res, next) => {


    if(!req.headers.authorization){
        return res.status(400).json({
            message : "Acesso negado!"
        }) 
    }


    const token = GetToken(req)

    if(!token){
        return res.status(400).json({
            message : "Acesso negado!"
        })

    }


    try{

        const verified = jwt.verify(token, "nossosecret")

        req.user = verified

        next()

    } catch(err){

        //res.status(400).json({
        //    message : "Token invalido!"
       // })

       console.log(err)

    }


}

export default CheckToken