"use client"

import {useContext, useState} from "react"
import {DailyOverview} from "@/components/dashboard/daily-overview"
import {MacrosBreakdown} from "@/components/dashboard/macros-breakdown"
import {HistoricalChart} from "@/components/dashboard/historical-chart"
import {DateSelector} from "@/components/dashboard/date-selector"
import {MealsList} from "@/components/dashboard/meals-list"
import {EmptyProfileState} from "@/components/dashboard/empty-profiles-state";
import {IProfileContext, ProfileContext} from "@/contexts/profile";
import {Spinner} from "@heroui/react";
import {useFoodLogDaySummaryRetrieve} from "@/src/api/endpoints/food-log/food-log";
import {AxiosError} from "axios";

export default function DashboardPage() {
    const { profiles, isPending } = useContext(ProfileContext) as IProfileContext
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [chartPeriod, setChartPeriod] = useState<7 | 15 | 30>(7)
    const {currentProfile} = useContext(ProfileContext) as IProfileContext;
    const daySummaryRetrieve = useFoodLogDaySummaryRetrieve(
        {
            profile: currentProfile?.id ?? -1,
            date: selectedDate.toISOString().split("T")[0],
        },
        {
            query: {
                enabled: !!currentProfile,
                retry: (failureCount, error) => {
                    if (error instanceof AxiosError) {
                        if (error.response?.status === 404){
                            return false
                        }
                    }
                    return true
                }
            }
        }
    );

    if (isPending){
        return (
            <main className="mx-auto px-4 py-8 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex justify-center items-center">
                    <Spinner size={"lg"}/>
                </div>
            </main>
        )
    }

    if (profiles?.length) return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Seguimiento de tu alimentación diaria</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <DailyOverview data={daySummaryRetrieve.data?.data} isLoading={daySummaryRetrieve.isLoading} selectedDate={selectedDate}/>
                </div>
                <div>
                    <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate}/>
                </div>
            </div>

            <div className="mb-8">
                <MacrosBreakdown data={daySummaryRetrieve.data?.data} isLoading={daySummaryRetrieve.isLoading}/>
            </div>

            <div className="mb-8">
                <HistoricalChart period={chartPeriod} onPeriodChange={setChartPeriod}/>
            </div>

            {/* Lista de comidas del día */}
            <MealsList selectedDate={selectedDate} refecthDaySummary={daySummaryRetrieve.refetch}/>
        </main>
    )
    return (
        <main className="container mx-auto px-4 py-8">
            <EmptyProfileState/>
        </main>
    )
}
