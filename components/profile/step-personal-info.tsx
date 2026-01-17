"use client"

import { Button, Input } from "@heroui/react"
import type { ProfileData } from "@/app/onboarding/page"

interface StepPersonalInfoProps {
  data: ProfileData
  onUpdate: (data: Partial<ProfileData>) => void
  onNext: () => void
}

export function StepPersonalInfo({ data, onUpdate, onNext }: StepPersonalInfoProps) {
  const isValid = data.fullName.trim() !== "" && data.birthDate !== "" && data.gender !== ""

  const today = new Date()
  const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate()).toISOString().split("T")[0]

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Nombre Completo"
        placeholder="Ingresa tu nombre completo"
        value={data.fullName}
        onValueChange={(value) => onUpdate({ fullName: value })}
        variant="bordered"
        isRequired
      />

      <Input
        label="Fecha de Nacimiento"
        type="date"
        value={data.birthDate}
        max={maxDate}
        onChange={(e) => onUpdate({ birthDate: e.target.value })}
        variant="bordered"
        isRequired
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Género <span className="text-danger">*</span>
        </label>
        <div className="flex gap-3">
          {[
            { value: "male", label: "Masculino" },
            { value: "female", label: "Femenino" },
            { value: "other", label: "Otro" },
          ].map((option) => (
            <Button
              key={option.value}
              variant={data.gender === option.value ? "solid" : "bordered"}
              color={data.gender === option.value ? "success" : "default"}
              onPress={() => onUpdate({ gender: option.value })}
              className="flex-1"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">País (opcional)</label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "ES", label: "España" },
            { value: "MX", label: "México" },
            { value: "AR", label: "Argentina" },
            { value: "CO", label: "Colombia" },
            { value: "CL", label: "Chile" },
            { value: "PE", label: "Perú" },
            { value: "VE", label: "Venezuela" },
            { value: "EC", label: "Ecuador" },
            { value: "US", label: "EE.UU." },
            { value: "OTHER", label: "Otro" },
          ].map((country) => (
            <Button
              key={country.value}
              variant={data.country === country.value ? "solid" : "bordered"}
              color={data.country === country.value ? "success" : "default"}
              size="sm"
              onPress={() => onUpdate({ country: data.country === country.value ? "" : country.value })}
            >
              {country.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button color="success" size="lg" onPress={onNext} isDisabled={!isValid} className="font-semibold">
          Continuar
        </Button>
      </div>
    </div>
  )
}
