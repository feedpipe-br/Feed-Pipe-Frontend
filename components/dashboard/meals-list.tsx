"use client"

import {Card, CardBody, Chip, Button} from "@heroui/react"
import {Coffee, Sun, Moon, Cookie, Plus, Salad} from "lucide-react"
import {useContext, useMemo, useState} from "react"
import {FoodLog, FoodTimeEnum} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {useFoodLogList} from "@/src/api/endpoints/food-log/food-log";
import {IProfileContext, ProfileContext} from "@/contexts/profile";
import {Skeleton} from "@heroui/skeleton";
import {AddMealModal} from "@/components/add-meal-modal";

interface MealsListProps {
    selectedDate: Date
    refecthDaySummary: () => void
}

const mealTypes = [
    {id: FoodTimeEnum.breakfast, name: "Desayuno", icon: Coffee, time: "7:00 - 9:00"},
    {id: FoodTimeEnum.lunch, name: "Almuerzo", icon: Sun, time: "12:00 - 14:00"},
    {id: FoodTimeEnum.dinner, name: "Cena", icon: Moon, time: "19:00 - 21:00"},
    {id: FoodTimeEnum.snack, name: "Snacks", icon: Cookie, time: "Durante el día"},
    {id: FoodTimeEnum.extra, name: "Extra", icon: Salad, time: "Durante el día"},
]

export function MealsList({selectedDate, refecthDaySummary}: MealsListProps) {
    const {currentProfile} = useContext(ProfileContext) as IProfileContext;
    const {data, isPending, refetch: refetchMeals} = useFoodLogList(
        {
            profile: currentProfile?.id || -1,
            date: selectedDate.toISOString().split("T")[0],
        },
        {
            query: {
                enabled: !!currentProfile,
            }
        }
    )
    const [modalIsOpen, setModalIsOpen] = useState(false);

    if (isPending) return <Skeleton className="bg-card border border-border h-56"/>

    if (!data?.data) return;
    const meals: Map<FoodTimeEnum | "extra", FoodLog[]> = new Map();
    data.data.forEach((item) => {
        if (!!item.food_time) {
            if (meals.has(item.food_time)) {
                meals.get(item.food_time)?.push(item);
            } else {
                meals.set(item.food_time, [item]);
            }
        } else {
            if (meals.has("extra")) {
                meals.get("extra")?.push(item);
            } else {
                meals.set("extra", [item]);
            }
        }
    })
    const isToday = new Date().toDateString() === selectedDate.toDateString()

    return (
        <>
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
                            <Button color="primary" size="sm" startContent={<Plus className="h-4 w-4"/>} onPress={() => setModalIsOpen(true)}>
                                Agregar Comida
                            </Button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {mealTypes.map((mealType) => {
                            const Icon = mealType.icon
                            return (
                                <div key={mealType.id} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                <Icon className="h-5 w-5 text-primary"/>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-foreground">{mealType.name}</h4>
                                                <p className="text-xs text-muted-foreground">{mealType.time}</p>
                                            </div>
                                        </div>
                                        <Chip size="sm" color="primary" variant="flat">
                                            {(meals.get(mealType.id) || []).reduce((a, b) => a + Number.parseFloat(b.calories || "0"), 0)} kcal
                                        </Chip>
                                    </div>

                                    {(meals.get(mealType.id) || []).length ? (
                                        <div className="space-y-2 mt-3">
                                            {meals.get(mealType.id)?.map((food) => (
                                                <div
                                                    key={food.id}
                                                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-background/50"
                                                >
                                                    <span className="text-sm text-foreground">{food.food_name}</span>
                                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                        <span>{food.calories} kcal</span>
                                                        <span className="hidden sm:inline">P: {food.protein}g</span>
                                                        <span className="hidden sm:inline">C: {food.carbs}g</span>
                                                        <span className="hidden sm:inline">G: {food.fats}g</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic mt-2">No hay alimentos
                                            registrados</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </CardBody>
            </Card>
            <AddMealModal isOpen={modalIsOpen} onClose={() => {
                setModalIsOpen(false);
                refetchMeals();
                refecthDaySummary();
            }}/>
        </>
    )
}
