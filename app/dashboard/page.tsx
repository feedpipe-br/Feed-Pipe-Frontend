"use client"

import {useState} from "react"
import {DailyOverview} from "@/components/dashboard/daily-overview"
import {MacrosBreakdown} from "@/components/dashboard/macros-breakdown"
import {HistoricalChart} from "@/components/dashboard/historical-chart"
import {DateSelector} from "@/components/dashboard/date-selector"
import {MealsList} from "@/components/dashboard/meals-list"
import {EmptyProfileState} from "@/components/dashboard/empty-profiles-state";

export default function DashboardPage() {
    const profiles = [{}]
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [chartPeriod, setChartPeriod] = useState<7 | 15 | 30>(7)

    if (profiles.length) return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Seguimiento de tu alimentación diaria</p>
            </div>

            {/* Selector de fecha y resumen del día */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <DailyOverview selectedDate={selectedDate}/>
                </div>
                <div>
                    <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate}/>
                </div>
            </div>

            {/* Desglose de macronutrientes */}
            <div className="mb-8">
                <MacrosBreakdown selectedDate={selectedDate}/>
            </div>

            {/* Gráfica histórica */}
            <div className="mb-8">
                <HistoricalChart period={chartPeriod} onPeriodChange={setChartPeriod}/>
            </div>

            {/* Lista de comidas del día */}
            <MealsList selectedDate={selectedDate}/>
        </main>
    )
    return (
        <main className="container mx-auto px-4 py-8">
            <EmptyProfileState/>
        </main>
    )
}
