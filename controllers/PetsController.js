import GetToken from "../helpers/get-token.js";
import GetUserByToken from "../helpers/get-user-by-token.js";
import Pet from "../models/pets.js";
import CheckOwner from "../helpers/check-owner-pet.js";
import CheckToken from "../helpers/check-token.js";




const PetController = class {


    static async AddPet(req, res){

        const {name, age, type} = req.body

        const token = GetToken(req)

        const user = await GetUserByToken(token)

        const owner = user.id

        if(!name){
            res.status(422).json({
                message : "O nome do pet é obrigatorio."
            })

            return
        }

        if(!age){
            res.status(422).json({
                message : "A idade do pet é obrigatorio."
            })

            return
        }

        if(!type){
            res.status(422).json({
                message : "O tipo do pet é obrigatorio."
            })

            return
        }

        const adopted = false

        try{

            await Pet({name, age, type, owner, adopted}).save()

            res.status(201).json({
                message : "Pet adicionado com sucesso!"
            })

        }catch(err){

            console.log(err)

        }


    }

    static async EditPet(req, res){
        const {name, age, type} = req.body

        const validitUser = await CheckOwner(req, res)

        if(validitUser){
            res.status(401).json({
                message : "Você não pode alterar o post de outro usuário!"
            })

            return
        }

        if(!name){
            res.status(422).json({
                message : "O nome do pet é obrigatorio."
            })

            return
        }

        if(!age){
            res.status(422).json({
                message : "A idade do pet é obrigatorio."
            })

            return
        }

        if(!type){
            res.status(422).json({
                message : "O tipo do pet é obrigatorio."
            })

            return
        }



        try{

            await Pet.updateOne({_id : req.params.id}, {name, age, type})

            res.status(200).json({
                message : "Pet atualizado com sucesso!"
            })

        } catch(err){

            console.log(err)

        }



    }


    static async RemovePet(req, res){

        const validitUser = await CheckOwner(req, res)

        if(!validitUser){
            res.status(400).json({
                message : "Não é possivel remover o post de outro usuário!"
            })

            return
        }

        await Pet.deleteOne({_id : req.params.id})

        res.status(200).json({
            message : "Pet removido com sucesso!"
        })

    }

    static async Adoted(req, res){
        const validitUser = await CheckOwner(req, res)

        if(!validitUser){
            res.status(400).json({
                message : "Não é possivel mudar o estado de adoção de outro usuário!"
            })

            return
        }

        await Pet.updateOne({_id : req.params.id}, {adopted : true})

        res.status(200).json({
            message : "parabéns por encontrar um adotador!"
        })


    }

    static async Dashboard(req, res){

        const token = GetToken(req)
        const user = await GetUserByToken(token)

        const MyPets = await Pet.find({owner : user.id})


        res.status(200).json({MyPets})




    }

}


export default PetController