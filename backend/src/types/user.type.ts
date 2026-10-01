import { UserRole } from "../../generated/prisma/enums.js";

export interface createUser{
    name: string,
    email: string,
    password: string,
    role? : UserRole
}