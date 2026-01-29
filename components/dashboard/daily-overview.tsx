"use client"

import {Button, Card, CardBody, Progress} from "@heroui/react"
import {Flame, Target, TrendingUp, UserPlus, Utensils} from "lucide-react"
import {DaySummary} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {Skeleton} from "@heroui/skeleton";
import Link from "next/link";

interface Props {
    data: DaySummary | undefined
    isLoading: boolean
    selectedDate: Date,
}

export function DailyOverview({data, isLoading, selectedDate}: Props) {
    const isToday = new Date().toDateString() === selectedDate.toDateString()
    if (isLoading) {
        return <Skeleton className="bg-card p-6 rounded-lg h-56"/>
    }
    if (!data) {
        return (
            <Card className="bg-card border border-border">
                <CardBody className="p-6">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                            <UserPlus className="w-10 h-10 text-primary"/>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                Establecer tus objectivos diarios
                            </h2>
                            <p className="text-muted-foreground max-w-md">
                                Para comenzar a hacer un analisis de tus requirimientos y hacer seguimiento de tus
                                comidas diarias.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
                            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50">
                                <Target className="w-8 h-8 text-primary mb-2"/>
                                <span className="text-sm font-medium text-foreground">Define tus objetivos</span>
                                <span className="text-xs text-muted-foreground">Perder, mantener o ganar</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50">
                                <Utensils className="w-8 h-8 text-primary mb-2"/>
                                <span className="text-sm font-medium text-foreground">Plan personalizado</span>
                                <span className="text-xs text-muted-foreground">Calorías y macros</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/50">
                                <TrendingUp className="w-8 h-8 text-primary mb-2"/>
                                <span className="text-sm font-medium text-foreground">Sigue tu progreso</span>
                                <span className="text-xs text-muted-foreground">Métricas y gráficas</span>
                            </div>
                        </div>

                        <Button
                            as={Link}
                            href="/dashboard/profile/create"
                            className="bg-primary text-primary-foreground font-semibold mt-4"
                            radius="full"
                            size="lg"
                            startContent={<Target className="w-5 h-5"/>}
                        >
                            Define los objetivos diarios
                        </Button>
                    </div>
                </CardBody>
            </Card>
        )
    }
    const caloriesPercentage = Math.min((data.calories / data.daily_plan.calories) * 100, 100)
    const remaining = data.daily_plan.calories - data.calories

    return (
        <Card className="bg-card border border-border">
            <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">
                            {isToday
                                ? "Resumen de Hoy"
                                : `Resumen del ${selectedDate.toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "long"
                                })}`}
                        </h2>
                        <p className="text-sm text-muted-foreground">{isToday ? "Sigue así, vas muy bien" : "Datos históricos"}</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                        <TrendingUp className="h-5 w-5"/>
                        {/*<span className="font-medium">{data.streak} días de racha</span>*/}
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-end justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <Flame className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Calorías consumidas</p>
                                <p className="text-3xl font-bold text-foreground">
                                    {data.calories.toLocaleString()}
                                    <span className="text-lg font-normal text-muted-foreground">
                    {" "}
                                        / {data.daily_plan.calories.toLocaleString()} kcal
                  </span>
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Restantes</p>
                            <p className={`text-2xl font-bold ${remaining > 0 ? "text-primary" : "text-destructive"}`}>
                                {remaining > 0 ? remaining : 0} kcal
                            </p>
                        </div>
                    </div>
                    <Progress
                        value={caloriesPercentage}
                        color={caloriesPercentage >= 100 ? "danger" : "success"}
                        className="h-3"
                        aria-label="Progreso de calorías"
                    />
                </div>

                {/* Stats secundarios */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                            <Utensils className="h-5 w-5 text-accent"/>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Comidas registradas</p>
                            <p className="text-xl font-bold text-foreground">{data.mealsLogged}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
                            <Target className="h-5 w-5 text-chart-3"/>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Vasos de agua</p>
                            <p className="text-xl font-bold text-foreground">{data.waterGlasses} / 8</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
