import { ReactNode, createContext, useContext } from "react";

interface AuthPropviderProps {
    children: ReactNode
}

interface User {
    id: string
    name: string
    email: string
    photo?: string
}

interface AuthContextData {
    user: User  
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthPropviderProps) {
    const user = {
        id: '1',
        name: 'Silas Junior',
        email: 'silaskbcajr@gmail.com',
    }
    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}       

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }