"use client"

import {Button, Card, CardBody} from "@heroui/react"
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {useFoodLogDaySummaryRangeList} from "@/src/api/endpoints/food-log/food-log";
import {Skeleton} from "@heroui/skeleton";

interface HistoricalChartProps {
    period: 7 | 15 | 30
    onPeriodChange: (period: 7 | 15 | 30) => void
}

export function HistoricalChart({period, onPeriodChange}: HistoricalChartProps) {
    const {data, isPending} = useFoodLogDaySummaryRangeList(
        {
            last_days: period,
        }
    );

    const periods: { value: 7 | 15 | 30; label: string }[] = [
        {value: 7, label: "7 días"},
        {value: 15, label: "15 días"},
        {value: 30, label: "30 días"},
    ]

    const colors = {
        calories: "#22c55e",
        protein: "#3b82f6",
        carbs: "#f59e0b",
        fats: "#ef4444",
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

                {isPending ? <Skeleton className="h-[350px] w-full"/> : data?.data ? (
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.data} margin={{top: 10, right: 10, left: -10, bottom: 0}} >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5}/>
                                <XAxis
                                    dataKey="date"
                                    tick={{fontSize: 11, fill: "#6b7280"}}
                                    tickLine={false}
                                    axisLine={{stroke: "#e5e7eb"}}
                                />
                                <YAxis
                                    yAxisId="left"
                                    orientation="left"
                                    stroke={colors.calories}
                                    tick={{fontSize: 11, fill: colors.calories}}
                                    tickLine={false}
                                    axisLine={{stroke: "#e5e7eb"}}
                                    label={{ value: 'Calorías (kcal)', angle: -90, position: 'insideLeft', fill: colors.calories, fontSize: 10 }}
                                />

                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    stroke={colors.protein}
                                    tick={{fontSize: 11, fill: "#6b7280"}}
                                    tickLine={false}
                                    axisLine={{stroke: "#e5e7eb"}}
                                    label={{ value: 'Gramos (g)', angle: 90, position: 'insideRight', fill: "#6b7280", fontSize: 10 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    }}
                                    labelStyle={{fontWeight: "bold", marginBottom: "4px"}}
                                />
                                <Legend
                                    wrapperStyle={{paddingTop: "20px"}}
                                    formatter={(value) => <span className="text-sm capitalize">{value}</span>}
                                />
                                <Bar dataKey="calories" name="Calorías" fill={colors.calories} radius={[4, 4, 0, 0]} yAxisId={"left"}/>
                                <Bar dataKey="protein" name="Proteínas (g)" fill={colors.protein}
                                     radius={[4, 4, 0, 0]} yAxisId={"right"}/>
                                <Bar dataKey="carbs" name="Carbohidratos (g)" fill={colors.carbs}
                                     radius={[4, 4, 0, 0]} yAxisId={"right"}/>
                                <Bar dataKey="fats" name="Grasas (g)" fill={colors.fats} radius={[4, 4, 0, 0]} yAxisId={"right"}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : <></>}
            </CardBody>
        </Card>
    )
}
