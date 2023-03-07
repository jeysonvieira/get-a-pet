

const GetToken = (req) => {

    const AuthHeader = req.headers.authorization

    const token = AuthHeader.split(" ")[1]

    return token

}


export default GetToken