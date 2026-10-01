import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums.js";

export const roleMiddleware = (...allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const hasPermition = allowedRoles.includes(req.user!.role)

        if(!hasPermition){
            return res.status(403).json({message: "Acesso negado"})
        }

        return next()
    }
}