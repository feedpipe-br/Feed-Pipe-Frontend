"use client"

import React, {useState} from "react"

import {HeroUIProvider} from "@heroui/react"
import {ToastProvider} from "@heroui/toast";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthModal} from "@/components/auth-modal";
import {AuthTabs} from "@/types/auth";
import {AuthenticationContext} from "@/contexts/auth";

const queryClient = new QueryClient()

export function Providers({children}: { children: React.ReactNode }) {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [authTab, setAuthTab] = useState<AuthTabs>("login")

    const handleOpenAuth = (tab: AuthTabs) => {
        setAuthTab(tab)
        setIsAuthOpen(true)
    }

    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <ToastProvider placement={"top-center"}/>
                <AuthenticationContext.Provider value={{authTab, setAuthTab, handleOpenAuth}}>
                    {children}
                    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultTab={authTab}/>
                </AuthenticationContext.Provider>
            </HeroUIProvider>
        </QueryClientProvider>
    )
}
