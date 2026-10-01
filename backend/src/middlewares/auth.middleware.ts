import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { UserRole } from "../../generated/prisma/enums.js"

const JWT = process.env.JWT_SECRET

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            error: "Acesso negado"
        })
    }

    const token = authHeader.split(" ")[1]

    if(!token) return res.status(401).json({error: "Acesso negado"})

    try{
        const decoded = jwt.verify(token, JWT!) as unknown as {id: number, role: UserRole}

        req.user ={
            id: decoded.id,
            role: decoded.role
        }

        return next()
    }catch(err: any){
        return res.status(401).json({error: err.message})
    }
}

export default authMiddleware