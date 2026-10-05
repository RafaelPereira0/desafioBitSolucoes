import { createContext, useEffect, useState } from "react";
import type { User, AuthContextData } from "../types/auth";
import type { Login } from "../types/login";
import { authLogin } from "../api/auth.api";
import { setAccessToken } from "../api/token";
import { api } from "../api/axios";

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }){
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoding] = useState<boolean>(true)

    const isAuthenticated = !!token

    const login = async (credentials: Login) => {
        const response = await authLogin(credentials)

        const { accessToken, user } = response

        setUser(user)
        setToken(accessToken)
        setAccessToken(accessToken)

        return user
    }

    const logout = async () => {
        setUser(null)
        setToken(null)
        setAccessToken(null)
    }

    async function restore() {
        try {
            const response = await api.post('/login/refresh')

            const { accessToken, user } = response.data

            setUser(user)
            setToken(accessToken)
            setAccessToken(accessToken)
        } catch {
            setUser(null)
            setToken(null)
            setAccessToken(null)
        }finally{
            setLoding(false)
        }
    }

    useEffect(() => {
        restore()
    },[])

    return(
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}