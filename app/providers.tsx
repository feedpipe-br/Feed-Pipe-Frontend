"use client"

import React from "react"

import {HeroUIProvider} from "@heroui/react"
import {ToastProvider} from "@heroui/toast";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthenticationProvider} from "@/contexts/auth";

const queryClient = new QueryClient()

export function Providers({children}: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <ToastProvider placement={"top-center"}/>
                <AuthenticationProvider>
                    {children}
                </AuthenticationProvider>
            </HeroUIProvider>
        </QueryClientProvider>
    )
}
