"use client"

import {Button, RadioGroup, Radio, cn} from "@heroui/react"
import {TrendingDown, Minus, TrendingUp, Turtle, Gauge, Zap} from "lucide-react"
import {ProfileCreateMutationBody} from "@/src/api/endpoints/profile/profile";
import {GoalEnum, GoalIntensityEnum} from "@/src/api/endpoints/feedPipeAPI.schemas";

interface StepGoalsProps {
    data: ProfileCreateMutationBody
    onUpdate: (data: Partial<ProfileCreateMutationBody>) => void
    onNext: () => void
    onBack: () => void
}

const goalOptions = [
    {
        value: GoalEnum.weight_loss,
        label: "Perder Peso",
        description: "Reducir grasa corporal",
        icon: TrendingDown,
        color: "text-blue-500",
    },
    {
        value: GoalEnum.maintenance,
        label: "Mantener Peso",
        description: "Conservar mi peso actual",
        icon: Minus,
        color: "text-emerald-500",
    },
    {
        value: GoalEnum.weight_gain,
        label: "Ganar Peso",
        description: "Aumentar masa muscular",
        icon: TrendingUp,
        color: "text-orange-500",
    },
]

const intensityOptions = [
    {
        value: GoalIntensityEnum.conservative,
        label: "Conservador",
        description: "Cambios graduales y sostenibles",
        detail: "~0.25kg/semana",
        icon: Turtle,
        color: "text-emerald-500",
    },
    {
        value: GoalIntensityEnum.moderate,
        label: "Moderado",
        description: "Balance entre velocidad y sostenibilidad",
        detail: "~0.5kg/semana",
        icon: Gauge,
        color: "text-amber-500",
    },
    {
        value: GoalIntensityEnum.aggressive,
        label: "Agresivo",
        description: "Resultados más rápidos, mayor esfuerzo",
        detail: "~0.75kg/semana",
        icon: Zap,
        color: "text-red-500",
    },
]

export function StepGoals({data, onUpdate, onNext, onBack}: StepGoalsProps) {
    const showIntensity = data.goal === "weight_loss" || data.goal === "weight_gain"
    const isValid = !showIntensity || data.goal_intensity !== ""

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <span className="text-sm font-medium">Cual es tu objetivo?</span>
                <RadioGroup
                    value={data.goal}
                    onValueChange={(value) => onUpdate({goal: value as ProfileCreateMutationBody["goal"]})}
                    className="gap-3"
                >
                    {goalOptions.map((option) => {
                        const Icon = option.icon
                        return (
                            <Radio
                                key={option.value}
                                value={option.value}
                                classNames={{
                                    base: cn(
                                        "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                        "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2",
                                        "data-[selected=true]:border-success",
                                    ),
                                    label: "w-full",
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-lg bg-gray-100", option.color)}>
                                        <Icon className="w-5 h-5"/>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{option.label}</p>
                                        <p className="text-sm text-gray-500">{option.description}</p>
                                    </div>
                                </div>
                            </Radio>
                        )
                    })}
                </RadioGroup>
            </div>

            {showIntensity && (
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-medium">Nivel de intensidad</span>
                    <RadioGroup
                        value={data.goal_intensity}
                        onValueChange={(value) => onUpdate({goal_intensity: value as ProfileCreateMutationBody["goal_intensity"]})}
                        className="gap-3"
                    >
                        {intensityOptions.map((option) => {
                            const Icon = option.icon
                            return (
                                <Radio
                                    key={option.value}
                                    value={option.value}
                                    classNames={{
                                        base: cn(
                                            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                            "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2",
                                            "data-[selected=true]:border-success",
                                        ),
                                        label: "w-full",
                                    }}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className={cn("p-2 rounded-lg bg-gray-100", option.color)}>
                                            <Icon className="w-5 h-5"/>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">{option.label}</p>
                                            <p className="text-sm text-gray-500">{option.description}</p>
                                        </div>
                                        <span className="text-xs font-medium text-gray-400">{option.detail}</span>
                                    </div>
                                </Radio>
                            )
                        })}
                    </RadioGroup>
                </div>
            )}

            <div className="flex justify-between mt-4">
                <Button variant="bordered" size="lg" onPress={onBack}>
                    Atrás
                </Button>
                <Button color="success" size="lg" onPress={onNext} isDisabled={!isValid} className="font-semibold">
                    Ver Recomendaciones
                </Button>
            </div>
        </div>
    )
}
