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
    DropdownSection,
    Button,
} from "@heroui/react"
import {Leaf, LogOut, Settings, UserPlus, Pencil, ChevronDown, Plus} from "lucide-react"
import Link from "next/link"
import {useContext, useMemo} from "react";
import {IProfileContext, ProfileContext} from "@/contexts/profile";

const goalLabels = {
    weight_loss: "Perder peso",
    maintenance: "Mantener peso",
    weight_gain: "Ganar peso",
}

function getInitial(name: string): string {
    return name.charAt(0).toUpperCase()
}

export function DashboardNavbar() {
    const {currentProfileId, setCurrentProfileId, profiles, isPending, currentProfile} = useContext(ProfileContext) as IProfileContext

    return (
        <Navbar maxWidth="xl" className="border-b border-border bg-card">
            <NavbarBrand>
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                        <Leaf className="h-5 w-5 text-primary-foreground"/>
                    </div>
                    <span className="font-bold text-xl text-foreground">NutriFit</span>
                </Link>
            </NavbarBrand>

            {!isPending && <NavbarContent justify="end" className="gap-2">
                {/* Selector de perfiles */}
                {profiles && profiles.length > 0 && (
                    <NavbarItem>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button
                                    variant="light"
                                    className="flex items-center gap-2 px-3 h-10 bg-transparent"
                                >
                                    <div
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                                        {currentProfile ? getInitial(currentProfile.name) : "?"}
                                    </div>
                                    <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground leading-tight">
                      {currentProfile?.name || "Sin perfil"}
                    </span>
                                        <span className="text-xs text-muted-foreground leading-tight">
                      {currentProfile?.goal ? goalLabels[currentProfile.goal] : "Selecciona un perfil"}
                    </span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground"/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Seleccionar perfil"
                                className="w-64"
                                selectionMode="single"
                                selectedKeys={currentProfileId ? [currentProfileId] : []}
                                onSelectionChange={(keys) => {
                                    const selected = Array.from(keys)[0] as string
                                    if (selected && selected !== "new-profile") {
                                        setCurrentProfileId(parseInt(selected))
                                    }
                                }}
                            >
                                <DropdownSection title="Mis perfiles" showDivider>
                                    {profiles.map((profile) => (
                                        <DropdownItem
                                            key={profile.id}
                                            textValue={profile.name}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                                                    {getInitial(profile.name)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span
                                                        className="text-sm font-medium text-foreground">{profile.name}</span>
                                                    {profile.goal && <span
                                                        className="text-xs text-muted-foreground">{goalLabels[profile.goal]}</span>}
                                                </div>
                                            </div>
                                        </DropdownItem>
                                    ))}
                                </DropdownSection>
                                <DropdownSection>
                                    <DropdownItem
                                        key="new-profile"
                                        as={Link}
                                        href="/onboarding"
                                        startContent={<Plus className="h-4 w-4"/>}
                                        className="text-primary"
                                    >
                                        Crear nuevo perfil
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                )}

                {profiles && profiles.length === 0 && (
                    <NavbarItem>
                        <Button
                            as={Link}
                            href="dashboard/profile/create"
                            className="bg-primary text-primary-foreground font-medium"
                            radius="full"
                            size="sm"
                            startContent={<UserPlus className="h-4 w-4"/>}
                        >
                            Crear perfil
                        </Button>
                    </NavbarItem>
                )}

                <NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform cursor-pointer"
                                color={"secondary"}
                                name={currentProfile?.name || "Usuario"}
                                size="sm"
                                showFallback
                                fallback={
                                    <div
                                        className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
                                        <Settings className="h-4 w-4"/>
                                    </div>
                                }
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Opciones de cuenta"
                            className="w-56"
                        >
                            {currentProfile ? (
                                <DropdownSection title="Perfil" showDivider>
                                    <DropdownItem
                                        key="edit-profile"
                                        as={Link}
                                        href={`/profile/${currentProfile.id}/edit`}
                                        startContent={<Pencil className="h-4 w-4"/>}
                                        description="Nombre, peso, objetivo..."
                                    >
                                        Editar perfil
                                    </DropdownItem>
                                </DropdownSection>
                            ) : null}

                            <DropdownSection title="Cuenta" showDivider>
                                <DropdownItem
                                    key="settings"
                                    as={Link}
                                    href="/settings"
                                    startContent={<Settings className="h-4 w-4"/>}
                                    description="Email, contraseña..."
                                >
                                    Configuración
                                </DropdownItem>
                            </DropdownSection>

                            <DropdownSection>
                                <DropdownItem
                                    key="logout"
                                    color="danger"
                                    className="text-danger"
                                    startContent={<LogOut className="h-4 w-4"/>}
                                >
                                    Cerrar sesión
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>}
        </Navbar>
    )
}
