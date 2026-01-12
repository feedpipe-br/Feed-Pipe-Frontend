"use client"

import { Card, CardBody, Chip, Button } from "@heroui/react"
import { Coffee, Sun, Moon, Cookie, Plus } from "lucide-react"
import { useMemo } from "react"

interface MealsListProps {
  selectedDate: Date
}

const mealTypes = [
  { id: "breakfast", name: "Desayuno", icon: Coffee, time: "7:00 - 9:00" },
  { id: "lunch", name: "Almuerzo", icon: Sun, time: "12:00 - 14:00" },
  { id: "dinner", name: "Cena", icon: Moon, time: "19:00 - 21:00" },
  { id: "snacks", name: "Snacks", icon: Cookie, time: "Durante el día" },
]

const sampleFoods: Record<string, { name: string; calories: number; protein: number; carbs: number; fat: number }[]> = {
  breakfast: [
    { name: "Huevos revueltos (2)", calories: 180, protein: 12, carbs: 2, fat: 14 },
    { name: "Tostada integral", calories: 80, protein: 3, carbs: 15, fat: 1 },
    { name: "Café con leche", calories: 50, protein: 2, carbs: 5, fat: 2 },
  ],
  lunch: [
    { name: "Pechuga de pollo (150g)", calories: 248, protein: 46, carbs: 0, fat: 5 },
    { name: "Arroz integral (100g)", calories: 111, protein: 3, carbs: 23, fat: 1 },
    { name: "Ensalada mixta", calories: 45, protein: 2, carbs: 8, fat: 0 },
  ],
  dinner: [
    { name: "Salmón a la plancha (150g)", calories: 280, protein: 35, carbs: 0, fat: 15 },
    { name: "Verduras al vapor", calories: 65, protein: 3, carbs: 12, fat: 0 },
  ],
  snacks: [
    { name: "Manzana", calories: 95, protein: 0, carbs: 25, fat: 0 },
    { name: "Almendras (30g)", calories: 170, protein: 6, carbs: 6, fat: 15 },
  ],
}

const generateMealsData = (date: Date) => {
  const seed = date.getDate() + date.getMonth() * 31
  const isToday = new Date().toDateString() === date.toDateString()

  // Simular que algunos días tienen más o menos comidas registradas
  const mealsLogged = isToday ? 3 : 4

  return mealTypes.slice(0, mealsLogged).map((meal) => ({
    ...meal,
    foods: sampleFoods[meal.id] || [],
    totalCalories: (sampleFoods[meal.id] || []).reduce((sum, food) => sum + food.calories, 0),
  }))
}

export function MealsList({ selectedDate }: MealsListProps) {
  const meals = useMemo(() => generateMealsData(selectedDate), [selectedDate])
  const isToday = new Date().toDateString() === selectedDate.toDateString()

  return (
    <Card className="bg-card border border-border">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Comidas del Día</h3>
            <p className="text-sm text-muted-foreground">
              {isToday ? "Registra lo que has comido hoy" : "Historial de comidas"}
            </p>
          </div>
          {isToday && (
            <Button color="primary" size="sm" startContent={<Plus className="h-4 w-4" />}>
              Agregar Comida
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {meals.map((meal) => {
            const Icon = meal.icon
            return (
              <div key={meal.id} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{meal.name}</h4>
                      <p className="text-xs text-muted-foreground">{meal.time}</p>
                    </div>
                  </div>
                  <Chip size="sm" color="primary" variant="flat">
                    {meal.totalCalories} kcal
                  </Chip>
                </div>

                {meal.foods.length > 0 ? (
                  <div className="space-y-2 mt-3">
                    {meal.foods.map((food, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-background/50"
                      >
                        <span className="text-sm text-foreground">{food.name}</span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{food.calories} kcal</span>
                          <span className="hidden sm:inline">P: {food.protein}g</span>
                          <span className="hidden sm:inline">C: {food.carbs}g</span>
                          <span className="hidden sm:inline">G: {food.fat}g</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic mt-2">No hay alimentos registrados</p>
                )}
              </div>
            )
          })}

          {/* Comidas no registradas */}
          {mealTypes.slice(meals.length).map((meal) => {
            const Icon = meal.icon
            return (
              <div key={meal.id} className="p-4 rounded-xl border-2 border-dashed border-border/50 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">{meal.name}</h4>
                    <p className="text-xs text-muted-foreground">Sin registrar</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
