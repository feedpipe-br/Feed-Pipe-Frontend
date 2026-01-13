"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react"
import { Leaf, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import settings from "@/settings";

export function DashboardNavbar() {
  return (
    <Navbar maxWidth="xl" className="border-b border-border bg-card">
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">{settings.projectName}</span>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="primary"
                name="Usuario"
                size="sm"
                src="/diverse-user-avatars.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Acciones de usuario">
              <DropdownItem key="profile" startContent={<User className="h-4 w-4" />}>
                Mi Perfil
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Settings className="h-4 w-4" />}>
                Configuración
              </DropdownItem>
              <DropdownItem key="logout" color="danger" startContent={<LogOut className="h-4 w-4" />}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
