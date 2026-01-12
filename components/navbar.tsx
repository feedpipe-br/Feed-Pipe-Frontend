"use client"

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from "@heroui/react"
import { useState } from "react"
import { Leaf } from "lucide-react"

interface NavbarProps {
  onOpenAuth: (tab: "login" | "register") => void
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "Características", href: "#features" },
    { label: "Cómo Funciona", href: "#how-it-works" },
    { label: "Testimonios", href: "#testimonials" },
    { label: "Precios", href: "#pricing" },
  ]

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/80 backdrop-blur-md border-b border-border"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden text-foreground"
        />
        <NavbarBrand className="gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-foreground">NutriFit</span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            variant="light"
            className="text-muted-foreground hover:text-foreground"
            onPress={() => onOpenAuth("login")}
          >
            Iniciar Sesión
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="bg-primary text-primary-foreground font-semibold"
            radius="full"
            onPress={() => onOpenAuth("register")}
          >
            Empezar Gratis
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-background pt-6">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link href={item.href} className="w-full text-foreground text-lg py-2" onPress={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Button
            variant="light"
            className="w-full justify-start text-muted-foreground text-lg py-2"
            onPress={() => {
              setIsMenuOpen(false)
              onOpenAuth("login")
            }}
          >
            Iniciar Sesión
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  )
}
