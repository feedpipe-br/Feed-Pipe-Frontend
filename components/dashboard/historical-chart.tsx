"use client"

import { Card, CardBody, Button } from "@heroui/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useMemo } from "react"

interface HistoricalChartProps {
  period: 7 | 15 | 30
  onPeriodChange: (period: 7 | 15 | 30) => void
}

const generateHistoricalData = (days: number) => {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const seed = date.getDate() + date.getMonth() * 31 + i
    const random = (min: number, max: number) => {
      const x = Math.sin(seed * 2) * 10000
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min
    }

    data.push({
      date: date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }),
      calorias: random(1400, 2200),
      proteinas: random(80, 150),
      carbohidratos: random(150, 280),
      grasas: random(40, 80),
    })
  }

  return data
}

export function HistoricalChart({ period, onPeriodChange }: HistoricalChartProps) {
  const data = useMemo(() => generateHistoricalData(period), [period])

  const periods: { value: 7 | 15 | 30; label: string }[] = [
    { value: 7, label: "7 días" },
    { value: 15, label: "15 días" },
    { value: 30, label: "30 días" },
  ]

  // Colores computados para Recharts
  const colors = {
    calorias: "#22c55e",
    proteinas: "#3b82f6",
    carbohidratos: "#f59e0b",
    grasas: "#ef4444",
  }

  return (
    <Card className="bg-card border border-border">
      <CardBody className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Historial de Ingesta</h3>
            <p className="text-sm text-muted-foreground">Evolución de tus macronutrientes</p>
          </div>

          <div className="flex gap-2">
            {periods.map((p) => (
              <Button
                key={p.value}
                size="sm"
                variant={period === p.value ? "solid" : "flat"}
                color={period === p.value ? "primary" : "default"}
                onPress={() => onPeriodChange(p.value)}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span className="text-sm capitalize">{value}</span>}
              />
              <Bar dataKey="calorias" name="Calorías" fill={colors.calorias} radius={[4, 4, 0, 0]} />
              <Bar dataKey="proteinas" name="Proteínas (g)" fill={colors.proteinas} radius={[4, 4, 0, 0]} />
              <Bar dataKey="carbohidratos" name="Carbos (g)" fill={colors.carbohidratos} radius={[4, 4, 0, 0]} />
              <Bar dataKey="grasas" name="Grasas (g)" fill={colors.grasas} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}
