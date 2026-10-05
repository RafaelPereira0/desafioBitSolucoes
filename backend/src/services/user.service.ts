import prisma from "../../lib/prisma.js";
import { createUser } from "../types/user.type.js";
import bcrypt from 'bcrypt'

class UserService{

    async createUser(data: createUser){
        const existsUser = await this.findByEmail(data.email)

        if(existsUser) throw new Error("Usuário existente")

        const hashedPassword = await bcrypt.hash(data.password, 10)

        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
                
            }
        })
    }

    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return user
    }

    async findById(id: number){
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user
    }
}

export default new UserService()