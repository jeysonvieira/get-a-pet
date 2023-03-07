import User from "../models/users.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import CreateUserToken from "../helpers/create-user-token.js";
import GetToken from "../helpers/get-token.js";
import GetUserByToken from "../helpers/get-user-by-token.js";




const UserController = class {

    
    static async Signup(req, res){
        
        let {name, email, phone, password, confpassword} = req.body


        if(!name){
            res.status(422).json({
                message : "O nome é obrigatório!"
            })

            return
        }

        if(!email){
            res.status(422).json({
                message : "O email é obrigatório!"
            })

            return
        }


        if(!phone){
            res.status(422).json({
                message : "O telefone é obrigatório!"
            })

            return
        }


        if(!password){
            res.status(422).json({
                message : "A senha é obrigatória!"
            })

            return
        }

        if(!confpassword){
            res.status(422).json({
                message : "A confirmação de senha é obrigatória!"
            })

            return
        }


        if(password != confpassword){
            res.status(422).json({
                message : "A Senha e a Confirmação de senha precisa ser iguais!"
            })

            return
        }


        const checkUser = await User.findOne({email : email})

        if(checkUser){
            res.status(422).json({
                message : "O email já possui cadastro no sistema!"
            })

            return
        }

        const salt = bcrypt.genSaltSync(0, 10)

        const hash = bcrypt.hashSync(password, salt)

        password = hash


        try{

           const newuser = await new User({name, email, phone, password}).save()

           await CreateUserToken(newuser, req, res)
            

        } catch(error){

            res.status(500).json({
                message : "Erro no servidor ao tentar cadastrar o usuário"
            })

            console.log(error)

        }


    }

    static async Login(req, res){

        const {email, password} = req.body


        if(!email){
            res.status(422).json({
                message : "Digite o Email!"
            })
            return
        }

        if(!password){
            res.status(422).json({
                message : "Digite a Senha!"
            })

            return
        }
        

        const Checkuser = await User.findOne({email : email})

        if(!Checkuser){
            res.status(422).json({
                message : "Email não foi encontrado no sistema, crie uma conta!"
            })
            return
        }


        const PasswDesc = await bcrypt.compare(password, Checkuser.password)

        if(!PasswDesc){
            res.status(422).json({
                message : "Senha incorreta!"
            })
            return
        }

       await CreateUserToken(Checkuser, req, res)
    }



    static async Checkuser(req, res){

        let CurrentUser

        if(req.headers.authorization){

            const token = GetToken(req)

            const decoded = jwt.verify(token, 'nossosecret')
            
            CurrentUser = await User.findById(decoded.id)

            CurrentUser.password = undefined

        } else{
            CurrentUser = null
        }


        res.status(200).send(CurrentUser)


    }


    static async GetUserId(req, res){

        const id = req.params.id

        const UserGet = await User.findById(id).select("-password")

        if(!UserGet){
            res.status(400).json({
                message : "Usuário não encontrado"
            })

            return
        }


        res.status(200).json({
            message : "Usúario encontrado com sucesso!",
            Usu : UserGet
        })


    }

    static async Edit(req, res){

        const token = GetToken(req)

        const user = await GetUserByToken(token)

        let {name, email, password, confpassword, phone} = req.body

        if(!name){
            res.status(422).json({
                message : "O nome é obrigatório!"
            })

            return
        }

        if(!email){
            res.status(422).json({
                message : "O email é obrigatório!"
            })

            return
        }

        const checkEmail = await User.findOne({email : email})

        if(user.email !== email && checkEmail){

            res.status(401).json({message : "Email já utilizado por outro usuário!"})

            return

        }


        if(!phone){
            res.status(422).json({
                message : "O telefone é obrigatório!"
            })

            return
        }


        if(!password){
            res.status(422).json({
                message : "A senha é obrigatória!"
            })

            return
        }

        if(!confpassword){
            res.status(422).json({
                message : "A confirmação de senha é obrigatória!"
            })

            return
        }


        if(password != confpassword){
            res.status(422).json({
                message : "A Senha e a Confirmação de senha precisa ser iguais!"
            })

            return
        }


        const salt = bcrypt.genSaltSync(0, 10)

        const hash = bcrypt.hashSync(password, salt)

        password = hash

        try{
            await User.updateOne({_id : user.id}, {name, email, password, phone})
            res.status(200).json({
                message : "Update concluido com sucesso."
            })
        }catch(err){
            console.log(err)
        }

    }


}




export default UserController