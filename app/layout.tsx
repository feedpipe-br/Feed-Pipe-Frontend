import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
//import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NutriFit - Tu Plan de Dieta Personalizado",
  description:
    "Transforma tu alimentación con planes personalizados, seguimiento de comidas y recetas saludables. Alcanza tus objetivos de salud con NutriFit.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        {/*<Analytics />*/}
      </body>
    </html>
  )
}
