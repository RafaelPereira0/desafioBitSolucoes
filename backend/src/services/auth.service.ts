import { LoginDTO, refreshUser } from "../types/auth.type.js";
import prisma from '../../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userService from "./user.service.js";

const JWT = process.env.JWT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_JWT_SECRET


class AuthService {

    async login(credentials: LoginDTO) {
        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email
            }
        })

        if (!user) throw new Error("Usuário ou senha incorretos")

        const password = await bcrypt.compare(credentials.password, user.password)

        if (!password) throw new Error("Usuário ou senha inválidos")

        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            JWT!,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            REFRESH_TOKEN!,
            { expiresIn: '1d' }
        )

        return {
            user: {
                id: user.id,
                role: user.role,
                email: user.email,
                name: user.name
            },
            accessToken,
            refreshToken
        }
    }

    async refresh(refreshToken: string): Promise<{newAccessToken: string, user: refreshUser}>{
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, REFRESH_TOKEN!, async (err: any, decoded: any) => {
                if(err) return reject("Sessão inválida")
                
                const user = await userService.findById(decoded.id)
                if(!user) return reject("Usuário não encontrado")
                
                const newAccessToken = jwt.sign({
                    id: user.id, name: user.name, email: user.email, role: user.role
                }, JWT!, {expiresIn: '5m'})

                resolve({newAccessToken, user})
            })
        })
    }
}

export default new AuthService()