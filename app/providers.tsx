"use client"

import type React from "react"

import { HeroUIProvider } from "@heroui/react"
import {ToastProvider} from "@heroui/toast";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
            <ToastProvider placement={"top-center"} />
            {children}
        </HeroUIProvider>
      </QueryClientProvider>
  )
}
