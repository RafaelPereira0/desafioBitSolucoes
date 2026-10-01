import { Request, Response } from "express";
import { userSchema } from "../schema/userSchema.js";
import userService from "../services/user.service.js";

class UserController{

    async createUser(req: Request, res: Response){
        try{
            const data = userSchema.parse(req.body)
            const newUser = await userService.createUser(data)

            return res.status(200).json({message: "Usuário criado com sucesso", result: [newUser.name, newUser.email]})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }
}

export default new UserController()