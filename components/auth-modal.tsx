"use client"

import type React from "react"
import {useState} from "react"
import {Eye, EyeOff, Leaf, Lock, Mail} from "lucide-react"
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Divider} from "@heroui/divider";
import {addToast, Button} from "@heroui/react";
import {Input} from "@heroui/input";
import {Checkbox} from "@heroui/checkbox";
import Link from "next/link";
import settings from "@/settings";
import {useAuthLoginCreate, useAuthRegistrationCreate} from "@/src/api/endpoints/auth/auth";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {Login, Register} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {ApiErrors} from "@/types/api";

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    defaultTab?: "login" | "register"
}

interface FormErrors {
    email?: string[]
    password?: string[]
    passwordConfirm?: string[]
}

interface NonFieldErrors {
    non_field_errors: string
}

export function AuthModal({isOpen, onClose, defaultTab = "login"}: AuthModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const router = useRouter();
    const login = useAuthLoginCreate({
        mutation: {
            onSuccess: ({data}) => {
                Cookies.set('auth_token', data.key, {expires: 7});
                router.push("/dashboard");
            },
            onError: (error: AxiosError) => {
                const data = error.response?.data as ApiErrors<Login> & {non_field_errors: string[]};
                if (data){
                    setErrors({
                        email: data.email,
                        password: data.password,
                    })
                    if (data.non_field_errors){
                        addToast({
                            description: data.non_field_errors.length ? data.non_field_errors[0] : "",
                            color: "danger",
                        })
                    }
                }
            }
        },
    });
    const register = useAuthRegistrationCreate({
        mutation:{
            onSuccess: ({data}) => {

            },
            onError: (error: AxiosError) => {
                const data = error.response?.data as ApiErrors<Register> & {non_field_errors: string[]};
                if (data){
                    setErrors({
                        email: data.email,
                        password: data.password1,
                        passwordConfirm: data.password2,
                    })
                    if (data.non_field_errors){
                        addToast({
                            description: data.non_field_errors.length ? data.non_field_errors[0] : "",
                            color: "danger",
                        })
                    }
                }
            }
        }
    })

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        activeTab == "login" ? login.mutate({data: {email, password}}): register.mutate({data: {username: email, email, password1: password, password2: passwordConfirm}})
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            backdrop="blur"
            classNames={{
                base: "bg-card border border-border",
                header: "border-b border-border",
                body: "py-6",
                footer: "border-t border-border",
            }}
        >
            <ModalContent>
                <form>
                    <ModalHeader className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 justify-center">
                            <Leaf className="w-6 h-6 text-primary"/>
                            <span className="font-bold text-xl text-card-foreground">{settings.projectName}</span>
                        </div>
                        <p className="text-center text-muted-foreground text-sm font-normal mt-2">
                            {activeTab === "login"
                                ? "Inicia sesión para continuar tu viaje saludable"
                                : "Crea tu cuenta y comienza a transformar tu vida"}
                        </p>
                    </ModalHeader>

                    <ModalBody>
                        {/* Tabs */}
                        <div className="flex gap-2 mb-4">
                            <Button
                                variant={activeTab === "login" ? "solid" : "bordered"}
                                className={
                                    activeTab === "login"
                                        ? "flex-1 bg-primary text-primary-foreground"
                                        : "flex-1 border-border text-muted-foreground"
                                }
                                radius="full"
                                onPress={() => setActiveTab("login")}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                variant={activeTab === "register" ? "solid" : "bordered"}
                                className={
                                    activeTab === "register"
                                        ? "flex-1 bg-primary text-primary-foreground"
                                        : "flex-1 border-border text-muted-foreground"
                                }
                                radius="full"
                                onPress={() => setActiveTab("register")}
                            >
                                Crear Cuenta
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="Correo electrónico"
                                placeholder="tu@email.com"
                                type="email"
                                startContent={<Mail className="w-4 h-4 text-muted-foreground"/>}
                                variant="bordered"
                                radius="lg"
                                isRequired
                                onValueChange={(value) => setEmail(value)}
                                isInvalid={!!errors.email}
                                errorMessage={errors.email}
                            />

                            <Input
                                label="Contraseña"
                                type={isPasswordVisible ? "text" : "password"}
                                startContent={<Lock className="w-4 h-4 text-muted-foreground"/>}
                                endContent={
                                    <button type="button" onClick={togglePasswordVisibility}
                                            className="focus:outline-none">
                                        {isPasswordVisible ? (
                                            <EyeOff className="w-4 h-4 text-muted-foreground"/>
                                        ) : (
                                            <Eye className="w-4 h-4 text-muted-foreground"/>
                                        )}
                                    </button>
                                }
                                variant="bordered"
                                radius="lg"
                                isRequired
                                onValueChange={(value) => setPassword(value)}
                                isInvalid={!!errors.password}
                                errorMessage={errors.password}
                            />
                            {activeTab === "register" && (
                                <Input
                                    label="Confirmar Contraseña"
                                    type={isPasswordVisible ? "text" : "password"}
                                    startContent={<Lock className="w-4 h-4 text-muted-foreground"/>}
                                    endContent={
                                        <button type="button" onClick={togglePasswordVisibility}
                                                className="focus:outline-none">
                                            {isPasswordVisible ? (
                                                <EyeOff className="w-4 h-4 text-muted-foreground"/>
                                            ) : (
                                                <Eye className="w-4 h-4 text-muted-foreground"/>
                                            )}
                                        </button>
                                    }
                                    variant="bordered"
                                    radius="lg"
                                    isRequired
                                    onValueChange={(value) => setPasswordConfirm(value)}
                                    isInvalid={!!errors.passwordConfirm}
                                    errorMessage={errors.passwordConfirm}
                                />
                            )}

                            {activeTab === "login" ? (
                                <div className="flex justify-between items-center">
                                    <Checkbox
                                        size="sm"
                                        classNames={{
                                            label: "text-sm text-muted-foreground",
                                        }}
                                    >
                                        Recordarme
                                    </Checkbox>
                                    <Link href="#" className="text-sm text-primary">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            ) : (
                                <Checkbox
                                    size="sm"
                                    classNames={{
                                        label: "text-sm text-muted-foreground",
                                    }}
                                    isRequired
                                >
                                    Acepto los{" "}
                                    <Link href="#" className="text-primary">
                                        términos y condiciones
                                    </Link>
                                </Checkbox>
                            )}
                        </div>

                        <Divider className="my-4 bg-border"/>

                        {/* Social Login */}
                        <div className="space-y-3">
                            <Button
                                variant="bordered"
                                className="w-full border-border text-card-foreground"
                                radius="lg"
                                startContent={
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                }
                            >
                                Continuar con Google
                            </Button>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={handleSubmit}
                            className="w-full bg-primary text-primary-foreground font-semibold"
                            radius="full"
                            size="lg"
                            isLoading={login.isPending || register.isPending}
                        >
                            {activeTab === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
