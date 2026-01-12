"use client"

import { Card, CardBody, Button } from "@heroui/react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useMemo } from "react"

interface DateSelectorProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []

    // Días vacíos al inicio
    const startDay = firstDay.getDay()
    for (let i = 0; i < startDay; i++) {
      days.push(null)
    }

    // Días del mes
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }, [currentMonth])

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    if (nextMonth <= today) {
      setCurrentMonth(nextMonth)
    }
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const isDisabled = (date: Date | null) => {
    if (!date) return true
    return date > today
  }

  const canGoNext = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1) <= today

  return (
    <Card className="bg-card border border-border">
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Seleccionar Fecha</h3>
          </div>
        </div>

        {/* Navegación del mes */}
        <div className="flex items-center justify-between mb-4">
          <Button isIconOnly size="sm" variant="light" onPress={goToPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium text-foreground capitalize">
            {currentMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </span>
          <Button isIconOnly size="sm" variant="light" onPress={goToNextMonth} isDisabled={!canGoNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((date, index) => (
            <button
              key={index}
              onClick={() => date && !isDisabled(date) && onDateChange(date)}
              disabled={isDisabled(date)}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                ${!date ? "invisible" : ""}
                ${isSelected(date) ? "bg-primary text-primary-foreground font-bold" : ""}
                ${!isSelected(date) && !isDisabled(date) ? "hover:bg-secondary text-foreground" : ""}
                ${isDisabled(date) && date ? "text-muted-foreground/40 cursor-not-allowed" : ""}
                ${date?.toDateString() === today.toDateString() && !isSelected(date) ? "ring-1 ring-primary" : ""}
              `}
            >
              {date?.getDate()}
            </button>
          ))}
        </div>

        {/* Botón ir a hoy */}
        <Button
          size="sm"
          variant="flat"
          color="primary"
          className="w-full mt-4"
          onPress={() => {
            onDateChange(today)
            setCurrentMonth(today)
          }}
        >
          Ir a Hoy
        </Button>
      </CardBody>
    </Card>
  )
}
