"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { Cta } from "@/components/cta"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authTab, setAuthTab] = useState<"login" | "register">("login")

  const handleOpenAuth = (tab: "login" | "register") => {
    setAuthTab(tab)
    setIsAuthOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar onOpenAuth={handleOpenAuth} />
      <Hero onOpenAuth={handleOpenAuth} />
      <Features />
      <HowItWorks />
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} defaultTab={authTab} />
    </main>
  )
}
