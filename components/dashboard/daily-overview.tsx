"use client"

import { Card, CardBody, Progress } from "@heroui/react"
import { Flame, Target, TrendingUp, Utensils } from "lucide-react"
import { useMemo } from "react"

interface DailyOverviewProps {
  selectedDate: Date
}

// Datos de ejemplo - en producción vendrían de la base de datos
const generateDailyData = (date: Date) => {
  const seed = date.getDate() + date.getMonth() * 31
  const random = (min: number, max: number) => {
    const x = Math.sin(seed) * 10000
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min
  }

  const isToday = new Date().toDateString() === date.toDateString()

  return {
    caloriesConsumed: isToday ? random(1200, 1800) : random(1400, 2200),
    caloriesGoal: 2000,
    mealsLogged: isToday ? random(2, 4) : random(3, 5),
    waterGlasses: isToday ? random(4, 6) : random(6, 10),
    streak: 12,
  }
}

export function DailyOverview({ selectedDate }: DailyOverviewProps) {
  const data = useMemo(() => generateDailyData(selectedDate), [selectedDate])
  const isToday = new Date().toDateString() === selectedDate.toDateString()
  const caloriesPercentage = Math.min((data.caloriesConsumed / data.caloriesGoal) * 100, 100)
  const remaining = data.caloriesGoal - data.caloriesConsumed

  return (
    <Card className="bg-card border border-border">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {isToday
                ? "Resumen de Hoy"
                : `Resumen del ${selectedDate.toLocaleDateString("es-ES", { day: "numeric", month: "long" })}`}
            </h2>
            <p className="text-sm text-muted-foreground">{isToday ? "Sigue así, vas muy bien" : "Datos históricos"}</p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            <span className="font-medium">{data.streak} días de racha</span>
          </div>
        </div>

        {/* Calorías principales */}
        <div className="mb-6">
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calorías consumidas</p>
                <p className="text-3xl font-bold text-foreground">
                  {data.caloriesConsumed.toLocaleString()}
                  <span className="text-lg font-normal text-muted-foreground">
                    {" "}
                    / {data.caloriesGoal.toLocaleString()} kcal
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
              <Utensils className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Comidas registradas</p>
              <p className="text-xl font-bold text-foreground">{data.mealsLogged}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
              <Target className="h-5 w-5 text-chart-3" />
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
