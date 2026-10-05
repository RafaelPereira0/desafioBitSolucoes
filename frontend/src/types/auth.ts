import type { Login } from "./login"

export interface User{
    id: number,
    name: string,
    email: string,
    role: "EMPLOYEE" | "ADMIN"
}

export interface AuthContextData{
    user: User | null,
    token: string | null,
    isAuthenticated: boolean,
    loading: boolean,

    login(creadentials: Login): Promise<User>
    logout():void
}