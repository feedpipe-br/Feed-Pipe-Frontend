"use client"

import { Button, Card, CardBody } from "@heroui/react"
import { UserPlus, Target, Utensils, TrendingUp } from "lucide-react"
import Link from "next/link"

export function EmptyProfileState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <Card className="w-full max-w-2xl bg-card border border-border">
                <CardBody className="p-8 md:p-12">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                            <UserPlus className="w-10 h-10 text-primary" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                Crea tu primer perfil
                            </h2>
                            <p className="text-muted-foreground max-w-md">
                                Para comenzar a registrar tus comidas y hacer seguimiento de tus calorías,
                                necesitas crear un perfil con tus datos y objetivos.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
                            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50">
                                <Target className="w-8 h-8 text-primary mb-2" />
                                <span className="text-sm font-medium text-foreground">Define tus objetivos</span>
                                <span className="text-xs text-muted-foreground">Perder, mantener o ganar</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50">
                                <Utensils className="w-8 h-8 text-primary mb-2" />
                                <span className="text-sm font-medium text-foreground">Plan personalizado</span>
                                <span className="text-xs text-muted-foreground">Calorías y macros</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50">
                                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                                <span className="text-sm font-medium text-foreground">Sigue tu progreso</span>
                                <span className="text-xs text-muted-foreground">Métricas y gráficas</span>
                            </div>
                        </div>

                        <Button
                            as={Link}
                            href="/onboarding"
                            className="bg-primary text-primary-foreground font-semibold mt-4"
                            radius="full"
                            size="lg"
                            startContent={<UserPlus className="w-5 h-5" />}
                        >
                            Crear mi primer perfil
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
