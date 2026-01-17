"use client"

import { Button, RadioGroup, Radio, cn } from "@heroui/react"
import { TrendingDown, Minus, TrendingUp, Turtle, Gauge, Zap } from "lucide-react"
import type { ProfileData } from "@/app/onboarding/page"

interface StepGoalsProps {
  data: ProfileData
  onUpdate: (data: Partial<ProfileData>) => void
  onNext: () => void
  onBack: () => void
}

const goalOptions = [
  {
    value: "lose",
    label: "Perder Peso",
    description: "Reducir grasa corporal",
    icon: TrendingDown,
    color: "text-blue-500",
  },
  {
    value: "maintain",
    label: "Mantener Peso",
    description: "Conservar mi peso actual",
    icon: Minus,
    color: "text-emerald-500",
  },
  {
    value: "gain",
    label: "Ganar Peso",
    description: "Aumentar masa muscular",
    icon: TrendingUp,
    color: "text-orange-500",
  },
]

const intensityOptions = [
  {
    value: "conservative",
    label: "Conservador",
    description: "Cambios graduales y sostenibles",
    detail: "~0.25kg/semana",
    icon: Turtle,
    color: "text-emerald-500",
  },
  {
    value: "moderate",
    label: "Moderado",
    description: "Balance entre velocidad y sostenibilidad",
    detail: "~0.5kg/semana",
    icon: Gauge,
    color: "text-amber-500",
  },
  {
    value: "aggressive",
    label: "Agresivo",
    description: "Resultados más rápidos, mayor esfuerzo",
    detail: "~0.75kg/semana",
    icon: Zap,
    color: "text-red-500",
  },
]

export function StepGoals({ data, onUpdate, onNext, onBack }: StepGoalsProps) {
  const showIntensity = data.goal === "lose" || data.goal === "gain"
  const isValid = data.goal !== "" && (!showIntensity || data.intensity !== "")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Cual es tu objetivo?</span>
        <RadioGroup
          value={data.goal}
          onValueChange={(value) => onUpdate({ goal: value as ProfileData["goal"] })}
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
                    <Icon className="w-5 h-5" />
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
            value={data.intensity}
            onValueChange={(value) => onUpdate({ intensity: value as ProfileData["intensity"] })}
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
                      <Icon className="w-5 h-5" />
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
