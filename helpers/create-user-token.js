import jwt from 'jsonwebtoken'



const CreateUserToken = async (user, req, res) => {

    const token = jwt.sign({
        name : user.name,
        id : user._id

    }, "nossosecret")

    res.status(201).json({
        "message" : "Você está Autenticado",
        token : token,
        userId : user._id
    })
}


export default CreateUserToken