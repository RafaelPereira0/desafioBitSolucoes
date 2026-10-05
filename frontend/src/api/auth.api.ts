import type { Login } from "../types/login";
import { api } from "./axios";

export async function authLogin(creadentials: Login) {
    const response = await api.post('/login/auth',{
        email: creadentials.email,
        password: creadentials.password
    })

    return response.data
}