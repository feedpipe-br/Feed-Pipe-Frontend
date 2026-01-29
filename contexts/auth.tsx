import React, {createContext, useEffect, useState} from "react";
import {AuthTabs, IAuthenticationContext} from "@/types/auth";
import Cookies from "js-cookie";
import {useAuthUserRetrieve} from "@/src/api/endpoints/auth/auth";
import {AuthModal} from "@/components/auth-modal";
import {AxiosError} from "axios";

export const AuthenticationContext = createContext<IAuthenticationContext | null>(null)

export function AuthenticationProvider({children}: { children: React.ReactNode }) {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [authTab, setAuthTab] = useState<AuthTabs>("login")
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get("auth_token"))
    const {isSuccess, isPending} = useAuthUserRetrieve({
        query: {
            retry: (failureCount, error) => {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 401){
                        return false
                    }
                }
                return true
            }
        }
    })

    useEffect(() => {
        !isPending && setIsAuthenticated(isSuccess)
    }, [isSuccess])

    const handleOpenAuth = (tab: AuthTabs) => {
        setAuthTab(tab)
        setIsAuthOpen(true)
    }
    return (
        <AuthenticationContext.Provider value={{authTab, setAuthTab, handleOpenAuth, isAuthenticated, setIsAuthenticated}}>
            {children}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultTab={authTab}/>
        </AuthenticationContext.Provider>
    )
}
