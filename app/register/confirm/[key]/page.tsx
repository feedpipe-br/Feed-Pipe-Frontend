"use client"

import {useContext, useEffect, useState} from "react"
import {useParams} from "next/navigation"
import {addToast, Button, Card, CardBody, Spinner} from "@heroui/react"
import {ArrowRight, CheckCircle2, Leaf, Mail, MailCheck, XCircle} from "lucide-react"
import Link from "next/link"
import {
    useAuthRegistrationResendEmailCreate,
    useAuthRegistrationVerifyEmailCreate
} from "@/src/api/endpoints/auth/auth";
import {Input} from "@heroui/input";
import {AuthenticationContext} from "@/contexts/auth";
import {IAuthenticationContext} from "@/types/auth";

type ConfirmationStatus = "loading" | "success" | "error" | "resend" | "resent"

export default function ConfirmEmailPage() {
    const {key} = useParams<{key: string}>()
    const [status, setStatus] = useState<ConfirmationStatus>("loading")
    const [email, setEmail] = useState("")
    const confirmEmail = useAuthRegistrationVerifyEmailCreate({
        mutation: {
            onSuccess: () => {
                setStatus("success")
            },
            onError: () => {
                setStatus("error")
            }
        }
    })
    const resendEmail = useAuthRegistrationResendEmailCreate({
        mutation: {
            onSuccess: () => {
                setStatus("resent")
                addToast({
                    description: "Email ha sido reenviado con exito.",
                    color: "success",
                })
            },
            onError: () =>{
                addToast({
                    description: "No se pudo enviar el email de confirmacion.",
                    color: "danger",
                })
            }
        }
    })
    const { handleOpenAuth } = useContext(AuthenticationContext) as IAuthenticationContext

    useEffect(() => {
        confirmEmail.mutate({
            data: {key: decodeURIComponent(key)}
        })
    }, [])

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-card border border-border">
                <CardBody className="p-8">
                    <div className="flex flex-col items-center text-center space-y-6">

                        <div className="flex items-center gap-2">
                            <Leaf className="w-8 h-8 text-primary"/>
                            <span className="font-bold text-2xl text-card-foreground">NutriFit</span>
                        </div>

                        {status === "loading" && (
                            <>
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Spinner size="lg" color="success"/>
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-card-foreground mb-2">
                                        Verificando tu correo
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Por favor espera mientras confirmamos tu dirección de correo electrónico...
                                    </p>
                                </div>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-primary"/>
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-card-foreground mb-2">
                                        Correo verificado
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Tu cuenta ha sido verificada exitosamente. Ya puedes comenzar a usar NutriFit y
                                        alcanzar tus metas de salud.
                                    </p>
                                </div>
                                <div className="w-full space-y-3 pt-4">
                                    <Button
                                        onPress={() => {handleOpenAuth("login")}}
                                        className="w-full bg-primary text-primary-foreground font-semibold"
                                        radius="full"
                                        size="lg"
                                        endContent={<ArrowRight className="w-4 h-4"/>}
                                    >
                                        Iniciar Sesión
                                    </Button>
                                    <Button
                                        as={Link}
                                        href="/"
                                        variant="light"
                                        className="w-full text-muted-foreground"
                                        radius="full"
                                    >
                                        Ir al inicio
                                    </Button>
                                </div>
                            </>
                        )}

                        {status === "error" && (
                            <>
                                <div
                                    className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
                                    <XCircle className="w-10 h-10 text-destructive"/>
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-card-foreground mb-2">
                                        Error de verificación
                                    </h1>
                                    <p className="text-muted-foreground">
                                        El enlace de verificación no es válido. Por favor, intenta registrarte de nuevo
                                        o solicita un nuevo enlace de confirmación.
                                    </p>
                                </div>
                                <div className="w-full space-y-3 pt-4">
                                    <Button
                                        className="w-full bg-primary text-primary-foreground font-semibold"
                                        radius="full"
                                        size="lg"
                                        onPress={() => {setStatus("resend")}}
                                    >
                                        Solicitar nuevo enlace
                                    </Button>
                                    <Button
                                        as={Link}
                                        href="/"
                                        variant="light"
                                        className="w-full text-muted-foreground bg-transparent"
                                        radius="full"
                                    >
                                        Volver al inicio
                                    </Button>
                                </div>
                            </>
                        )}

                        {status === "resend" && (
                            <>
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Mail className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-card-foreground mb-2">
                                        Reenviar correo de verificación
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Ingresa tu correo electrónico para recibir un nuevo enlace de verificación.
                                    </p>
                                </div>
                                <div className="w-full space-y-4 pt-4">
                                    <Input
                                        type="email"
                                        label="Correo electrónico"
                                        placeholder="tu@email.com"
                                        value={email}
                                        onValueChange={setEmail}
                                        startContent={<Mail className="w-4 h-4 text-muted-foreground" />}
                                        variant="bordered"
                                        radius="lg"
                                        classNames={{
                                            input: "text-card-foreground",
                                            inputWrapper: "border-border",
                                            label: "text-muted-foreground",
                                        }}
                                        isRequired
                                    />
                                    <Button
                                        className="w-full bg-primary text-primary-foreground font-semibold"
                                        radius="full"
                                        size="lg"
                                        isLoading={resendEmail.isPending}
                                        isDisabled={!email}
                                        onPress={() => {resendEmail.mutate({data: {email}})}}
                                    >
                                        Enviar enlace
                                    </Button>
                                    <Button
                                        as={Link}
                                        href="/"
                                        variant="light"
                                        className="w-full text-muted-foreground bg-transparent"
                                        radius="full"
                                    >
                                        Volver al inicio
                                    </Button>
                                </div>
                            </>
                        )}

                        {status === "resent" && (
                            <>
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <MailCheck className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-card-foreground mb-2">
                                        Correo enviado
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Hemos enviado un nuevo enlace de verificación a:
                                    </p>
                                    <p className="font-medium text-card-foreground bg-muted px-4 py-2 rounded-lg mt-3">
                                        {email}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-3">
                                        Revisa tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta.
                                    </p>
                                </div>
                                <div className="w-full space-y-3 pt-4">
                                    <Button
                                        className="w-full bg-primary text-primary-foreground font-semibold"
                                        radius="full"
                                        size="lg"
                                        isLoading={resendEmail.isPending}
                                        onPress={() => {resendEmail.mutate({data: {email}})}}
                                    >
                                        Reenviar de nuevo
                                    </Button>
                                    <Button
                                        as={Link}
                                        href="/"
                                        variant="light"
                                        className="w-full text-muted-foreground bg-transparent"
                                        radius="full"
                                    >
                                        Volver al inicio
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}