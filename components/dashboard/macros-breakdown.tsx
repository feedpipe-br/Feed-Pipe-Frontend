"use client"

import {Card, CardBody, Progress, Spinner} from "@heroui/react"
import {useContext} from "react"
import {IProfileContext, ProfileContext} from "@/contexts/profile";
import {useFoodLogDaySummaryRetrieve} from "@/src/api/endpoints/food-log/food-log";
import {Skeleton} from "@heroui/skeleton";

export function MacrosBreakdown({selectedDate}: {selectedDate: Date}) {
    const {currentProfile} = useContext(ProfileContext) as IProfileContext;
    const {data , isLoading} = useFoodLogDaySummaryRetrieve(
        {
            profile: currentProfile?.id ?? -1,
            date: selectedDate.toISOString().split("T")[0],
        },
        {
            query: {
                enabled: !!currentProfile
            }
        }
    );

    if (isLoading){
        return <Skeleton className="bg-card p-6 rounded-lg h-56"/>
    }

    const macros = [
        {
            name: "Proteínas",
            consumed: data?.data.protein || 0,
            goal: data?.data.daily_plan.protein || 0,
            unit: "g",
            color: "bg-chart-1",
            progressColor: "success" as const,
        },
        {
            name: "Carbohidratos",
            consumed: data?.data.carbs || 0,
            goal: data?.data.daily_plan.carbs || 0,
            unit: "g",
            color: "bg-chart-2",
            progressColor: "warning" as const,
        },
        {
            name: "Grasas",
            consumed: data?.data.fats || 0,
            goal: data?.data.daily_plan.fats || 0,
            unit: "g",
            color: "bg-chart-4",
            progressColor: "secondary" as const,
        },
    ]

    return (
        <Card className="bg-card border border-border">
            <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Desglose de Macronutrientes</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {macros.map((macro) => {
                        const percentage = Math.min((macro.consumed / macro.goal) * 100, 100)
                        const remaining = macro.goal - macro.consumed

                        return (
                            <div key={macro.name} className="p-4 rounded-xl bg-secondary/30">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${macro.color}`}/>
                                        <span className="font-medium text-foreground">{macro.name}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                    {remaining > 0 ? `${remaining}${macro.unit} restantes` : "Meta alcanzada"}
                  </span>
                                </div>

                                <div className="flex items-end gap-1 mb-3">
                                    <span className="text-3xl font-bold text-foreground">{macro.consumed}</span>
                                    <span className="text-muted-foreground mb-1">
                    / {macro.goal}
                                        {macro.unit}
                  </span>
                                </div>

                                <Progress
                                    value={percentage}
                                    color={percentage >= 100 ? "danger" : macro.progressColor}
                                    className="h-2"
                                    aria-label={`Progreso de ${macro.name}`}
                                />

                                <p className="text-xs text-muted-foreground mt-2 text-right">{percentage.toFixed(0)}%
                                    completado</p>
                            </div>
                        )
                    })}
                </div>
            </CardBody>
        </Card>
    )
}

