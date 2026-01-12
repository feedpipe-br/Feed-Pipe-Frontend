"use client"

import { Card, CardBody, Progress } from "@heroui/react"
import { useMemo } from "react"

interface MacrosBreakdownProps {
  selectedDate: Date
}

const generateMacrosData = (date: Date) => {
  const seed = date.getDate() + date.getMonth() * 31
  const random = (min: number, max: number) => {
    const x = Math.sin(seed * 1.5) * 10000
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min
  }

  return {
    protein: { consumed: random(80, 140), goal: 150 },
    carbs: { consumed: random(150, 250), goal: 250 },
    fat: { consumed: random(40, 70), goal: 65 },
  }
}

export function MacrosBreakdown({ selectedDate }: MacrosBreakdownProps) {
  const data = useMemo(() => generateMacrosData(selectedDate), [selectedDate])

  const macros = [
    {
      name: "Proteínas",
      consumed: data.protein.consumed,
      goal: data.protein.goal,
      unit: "g",
      color: "bg-chart-1",
      progressColor: "success" as const,
    },
    {
      name: "Carbohidratos",
      consumed: data.carbs.consumed,
      goal: data.carbs.goal,
      unit: "g",
      color: "bg-chart-2",
      progressColor: "warning" as const,
    },
    {
      name: "Grasas",
      consumed: data.fat.consumed,
      goal: data.fat.goal,
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
                    <div className={`w-3 h-3 rounded-full ${macro.color}`} />
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

                <p className="text-xs text-muted-foreground mt-2 text-right">{percentage.toFixed(0)}% completado</p>
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
