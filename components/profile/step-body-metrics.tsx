"use client"

import { Button, Input, Slider, ButtonGroup } from "@heroui/react"
import type { ProfileData } from "@/app/onboarding/page"

interface StepBodyMetricsProps {
  data: ProfileData
  onUpdate: (data: Partial<ProfileData>) => void
  onNext: () => void
  onBack: () => void
}

const activityLabels: Record<number, string> = {
  1: "Sedentario",
  2: "Muy poco activo",
  3: "Poco activo",
  4: "Ligeramente activo",
  5: "Moderadamente activo",
  6: "Activo",
  7: "Muy activo",
  8: "Bastante activo",
  9: "Extremadamente activo",
  10: "Atleta profesional",
}

export function StepBodyMetrics({ data, onUpdate, onNext, onBack }: StepBodyMetricsProps) {
  const isValid = data.height > 0 && data.weight > 0

  const handleWeightUnitChange = (unit: "kg" | "lb") => {
    if (unit === data.weightUnit) return

    // Convert weight when changing units
    const newWeight = unit === "lb" ? Math.round(data.weight * 2.20462) : Math.round(data.weight / 2.20462)

    onUpdate({ weightUnit: unit, weight: newWeight })
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Altura (cm)"
        type="number"
        placeholder="170"
        value={data.height.toString()}
        onValueChange={(value) => onUpdate({ height: Number.parseInt(value) || 0 })}
        variant="bordered"
        min={100}
        max={250}
        endContent={<span className="text-gray-400 text-sm">cm</span>}
        isRequired
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Peso</span>
          <ButtonGroup size="sm">
            <Button
              color={data.weightUnit === "kg" ? "success" : "default"}
              variant={data.weightUnit === "kg" ? "solid" : "bordered"}
              onPress={() => handleWeightUnitChange("kg")}
            >
              kg
            </Button>
            <Button
              color={data.weightUnit === "lb" ? "success" : "default"}
              variant={data.weightUnit === "lb" ? "solid" : "bordered"}
              onPress={() => handleWeightUnitChange("lb")}
            >
              lb
            </Button>
          </ButtonGroup>
        </div>
        <Input
          type="number"
          placeholder={data.weightUnit === "kg" ? "70" : "154"}
          value={data.weight.toString()}
          onValueChange={(value) => onUpdate({ weight: Number.parseFloat(value) || 0 })}
          variant="bordered"
          min={data.weightUnit === "kg" ? 30 : 66}
          max={data.weightUnit === "kg" ? 300 : 660}
          endContent={<span className="text-gray-400 text-sm">{data.weightUnit}</span>}
          isRequired
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Nivel de Actividad</span>
          <span className="text-sm text-emerald-600 font-semibold">{activityLabels[data.activityLevel]}</span>
        </div>
        <Slider
          aria-label="Nivel de actividad"
          step={1}
          minValue={1}
          maxValue={10}
          value={data.activityLevel}
          onChange={(value) => onUpdate({ activityLevel: value as number })}
          color="success"
          showSteps
          marks={[
            { value: 1, label: "1" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
          ]}
          className="max-w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          1 = Sedentario (trabajo de oficina, sin ejercicio) | 10 = Atleta profesional (entrenamientos intensos diarios)
        </p>
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="bordered" size="lg" onPress={onBack}>
          Atrás
        </Button>
        <Button color="success" size="lg" onPress={onNext} isDisabled={!isValid} className="font-semibold">
          Continuar
        </Button>
      </div>
    </div>
  )
}
