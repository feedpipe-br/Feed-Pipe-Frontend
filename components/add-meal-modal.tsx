"use client"

import React, {useContext, useMemo} from "react"

import {useState, useEffect, useCallback} from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Autocomplete,
    AutocompleteItem,
    Divider, DatePicker,
} from "@heroui/react"
import {Search, Utensils, Flame, Beef, Wheat, Droplets, Plus, Camera} from "lucide-react";
import {useFoodList} from "@/src/api/endpoints/food/food";
import {Food, FoodTimeEnum} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {useFoodLogCreate} from "@/src/api/endpoints/food-log/food-log";
import {IProfileContext, ProfileContext} from "@/contexts/profile";
import {DateValue, getLocalTimeZone, now} from "@internationalized/date";
import {Tooltip} from "@heroui/tooltip";
import AddFoodModal from "@/components/add-food-modal";

interface AddMealModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd?: (meal: MealEntry) => void
}

interface MealEntry {
    foodName: string
    quantity: number
    mealType: string
    time: string
    calories: number
    protein: number
    carbs: number
    fat: number
}

const mealTypes: {id: FoodTimeEnum, name: string}[] = [
    {id: FoodTimeEnum.breakfast, name: "Desayuno"},
    {id: FoodTimeEnum.lunch, name: "Almuerzo"},
    {id: FoodTimeEnum.dinner, name: "Cena"},
    {id: FoodTimeEnum.snack, name: "Snack"},
    {id: FoodTimeEnum.extra, name: "Extra"},
]

export function AddMealModal({isOpen, onClose}: AddMealModalProps) {
    const { currentProfile } = useContext(ProfileContext) as IProfileContext;
    const [isCreateFoodOpen, setIsCreateFoodOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFood, setSelectedFood] = useState<Food | null>(null)

    const {data, isLoading: isSearching} = useFoodList(
        {
            search: searchQuery,
        }
    )
    const foods = useMemo(() => {
        return data?.data?.results || []
    }, [data])

    const [customFoodName, setCustomFoodName] = useState("")
    const [quantity, setQuantity] = useState<number>(100)
    const [selectedMealType, setSelectedMealType] = useState<FoodTimeEnum>(FoodTimeEnum.breakfast);
    const [timestamp, setTimestamp] = useState<DateValue>(now(getLocalTimeZone()))
    const [manualCalories, setManualCalories] = useState<number>(0)
    const [manualProtein, setManualProtein] = useState<number>(0)
    const [manualCarbs, setManualCarbs] = useState<number>(0)
    const [manualFat, setManualFat] = useState<number>(0)

    const calculatedMacros = useCallback(() => {
        if (!selectedFood) return null
        const multiplier = (quantity || 0) / 100
        return {
            calories: selectedFood?.calories && Math.round(parseFloat(selectedFood.calories) * multiplier),
            protein: selectedFood?.protein && Math.round(parseFloat(selectedFood.protein) * multiplier * 10) / 10,
            carbs: selectedFood?.carbs && Math.round(parseFloat(selectedFood.carbs) * multiplier * 10) / 10,
            fat: selectedFood?.fats && Math.round(parseFloat(selectedFood.fats) * multiplier * 10) / 10,
        }
    }, [selectedFood, quantity])

    const macros = calculatedMacros()

    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("")
            setSelectedFood(null)
            setCustomFoodName("")
            setQuantity(100)
            setSelectedMealType(FoodTimeEnum.breakfast)
            setManualCalories(0)
            setManualProtein(0)
            setManualCarbs(0)
            setManualFat(0)
            setTimestamp(now(getLocalTimeZone()))
        }
    }, [isOpen])

    const handleFoodSelect = (key: React.Key | null) => {
        if (key) {
            const food = foods.find((f) => String(f.id) === String(key))
            if (food) {
                setSelectedFood(food)
                setCustomFoodName("")
            }
        }
    }

    const createFoodLog = useFoodLogCreate({
        mutation:{
            onSuccess: ()=> {
                onClose();
            },
            onError: () => {

            }
        },

    })

    const handleSubmit = async () => {
        if (!currentProfile || !(selectedFood || customFoodName)) return
        createFoodLog.mutate({
            data: {
                food: selectedFood && selectedFood.id,
                food_name: selectedFood ? selectedFood.name : customFoodName,
                amount: quantity.toFixed(2),
                calories: selectedFood ? selectedFood.calories : manualCalories.toFixed(2),
                protein: selectedFood ? selectedFood.protein : manualProtein.toFixed(2),
                carbs: selectedFood ? selectedFood.carbs : manualCarbs.toFixed(2),
                fats: selectedFood ? selectedFood.fats : manualFat.toFixed(2),
                timestamp: timestamp.toDate(getLocalTimeZone()).toISOString(),
                profile: currentProfile.id,
                food_time: selectedMealType,
            }
        })
    }

    const isManualEntry = !selectedFood && customFoodName.length > 0
    const canSubmit = (selectedFood || customFoodName) && quantity && (macros || (manualCalories && manualProtein && manualCarbs && manualFat))

    if (isCreateFoodOpen) return <AddFoodModal onClose={() => setIsCreateFoodOpen(false)} onCreate={(food: Food) => setSelectedFood(food)}/>

    return (
        <Modal placement={"center"} isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-primary"/>
                        <span className="text-foreground">Agregar Comida</span>
                    </div>
                </ModalHeader>

                <ModalBody className="gap-4">
                    <div className="flex items-center gap-2">
                        <Autocomplete
                            label="Buscar alimento"
                            placeholder="Escribe para buscar..."
                            startContent={<Search className="w-4 h-4 text-muted-foreground"/>}
                            isLoading={isSearching}
                            items={foods}
                            inputValue={searchQuery}
                            onInputChange={setSearchQuery}
                            onSelectionChange={handleFoodSelect}
                            variant="bordered"
                            radius="lg"
                            classNames={{
                                base: "w-full flex-1",
                                listboxWrapper: "max-h-[300px]",
                            }}
                        >
                            {(food) => (
                                <AutocompleteItem key={food.id} textValue={food.name}>
                                    <div className="flex flex-col">
                                        <span className="text-foreground">{food.name}</span>
                                        <span className="text-xs text-muted-foreground">
                        {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | G: {food.fats}g (por 100g)
                      </span>
                                    </div>
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
                        <Tooltip content={"Crear alimento"}>
                            <Button
                                isIconOnly
                                variant="solid"
                                radius="lg"
                                color="success"
                                className="text-foreground h-10 w-10 min-w-10"
                                onPress={() => setIsCreateFoodOpen(true)}
                            >
                                <Plus className="w-5 h-5" />
                            </Button>
                        </Tooltip>
                    </div>

                    {selectedFood && (
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-foreground">{selectedFood.name}</span>
                                <Button
                                    size="sm"
                                    variant="light"
                                    className="text-muted-foreground bg-transparent"
                                    onPress={() => setSelectedFood(null)}
                                >
                                    Cambiar
                                </Button>
                            </div>
                        </div>
                    )}

                    {!selectedFood && (
                        <div className="flex items-center gap-2">
                            <Input
                                label="O ingresa el nombre manualmente"
                                placeholder="Nombre del alimento"
                                value={customFoodName}
                                onValueChange={setCustomFoodName}
                                variant="bordered"
                                radius="lg"
                                classNames={{
                                    input: "text-foreground",
                                    inputWrapper: "border-border",
                                    label: "text-muted-foreground",
                                    mainWrapper: "flex-1"
                                }}
                            />
                            <Tooltip content={"Usar AI"}>
                                <Button
                                    isIconOnly
                                    isDisabled
                                    variant="solid"
                                    radius="lg"
                                    color="success"
                                    className="text-foreground h-10 w-10 min-w-10"
                                    onPress={() => setIsCreateFoodOpen(true)}
                                >
                                    <Camera className="w-5 h-5" />
                                </Button>
                            </Tooltip>
                        </div>
                    )}

                    <Divider/>

                    <div className="grid lg:grid-cols-2 gap-4">
                        <Input
                            label="Cantidad (gramos)"
                            placeholder="100"
                            type="number"
                            value={String(quantity)}
                            onValueChange={value => setQuantity(Number.parseFloat(value))}
                            variant="bordered"
                            radius="lg"
                            min={1}
                            classNames={{
                                input: "text-foreground",
                                inputWrapper: "border-border",
                                label: "text-muted-foreground",
                            }}
                        />

                        <DatePicker
                            hideTimeZone
                            showMonthAndYearPickers
                            defaultValue={timestamp}
                            onChange={value => !!value && setTimestamp(value)}
                            label="Fecha y Hora"
                            variant="bordered"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Tipo de comida</label>
                        <div className="flex flex-wrap gap-2">
                            {mealTypes.map((type) => (
                                <Button
                                    key={type.id}
                                    size="sm"
                                    radius="full"
                                    variant={selectedMealType === type.id ? "solid" : "bordered"}
                                    className={
                                        selectedMealType === type.id
                                            ? "bg-primary text-primary-foreground"
                                            : "border-border text-foreground bg-transparent"
                                    }
                                    onPress={() => setSelectedMealType(type.id)}
                                >
                                    {type.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Divider/>

                    <div>
                        <label className="text-sm text-muted-foreground mb-3 block">
                            {selectedFood ? "Valores nutricionales (calculados)" : "Valores nutricionales"}
                        </label>

                        {selectedFood && macros ? (
                            <div className="grid grid-cols-4 gap-3">
                                <div className="p-3 rounded-lg bg-orange-500/10 text-center">
                                    <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1"/>
                                    <p className="text-lg font-bold text-foreground">{macros.calories}</p>
                                    <p className="text-xs text-muted-foreground">kcal</p>
                                </div>
                                <div className="p-3 rounded-lg bg-red-500/10 text-center">
                                    <Beef className="w-4 h-4 text-red-500 mx-auto mb-1"/>
                                    <p className="text-lg font-bold text-foreground">{macros.protein}g</p>
                                    <p className="text-xs text-muted-foreground">Proteína</p>
                                </div>
                                <div className="p-3 rounded-lg bg-amber-500/10 text-center">
                                    <Wheat className="w-4 h-4 text-amber-500 mx-auto mb-1"/>
                                    <p className="text-lg font-bold text-foreground">{macros.carbs}g</p>
                                    <p className="text-xs text-muted-foreground">Carbos</p>
                                </div>
                                <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                                    <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1"/>
                                    <p className="text-lg font-bold text-foreground">{macros.fat}g</p>
                                    <p className="text-xs text-muted-foreground">Grasa</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Calorías (kcal)"
                                    placeholder="0"
                                    type="number"
                                    value={String(manualCalories)}
                                    onValueChange={value => setManualCalories(Number.parseFloat(value))}
                                    variant="bordered"
                                    radius="lg"
                                    isRequired={isManualEntry}
                                    startContent={<Flame className="w-4 h-4 text-orange-500"/>}
                                    classNames={{
                                        input: "text-foreground",
                                        inputWrapper: "border-border",
                                        label: "text-muted-foreground",
                                    }}
                                />
                                <Input
                                    label="Proteína (g)"
                                    placeholder="0"
                                    type="number"
                                    value={String(manualProtein)}
                                    onValueChange={value => setManualProtein(Number.parseFloat(value))}
                                    variant="bordered"
                                    radius="lg"
                                    isRequired={isManualEntry}
                                    startContent={<Beef className="w-4 h-4 text-red-500"/>}
                                    classNames={{
                                        input: "text-foreground",
                                        inputWrapper: "border-border",
                                        label: "text-muted-foreground",
                                    }}
                                />
                                <Input
                                    label="Carbohidratos (g)"
                                    placeholder="0"
                                    type="number"
                                    value={String(manualCarbs)}
                                    onValueChange={value => setManualCarbs(Number.parseFloat(value))}
                                    variant="bordered"
                                    radius="lg"
                                    isRequired={isManualEntry}
                                    startContent={<Wheat className="w-4 h-4 text-amber-500"/>}
                                    classNames={{
                                        input: "text-foreground",
                                        inputWrapper: "border-border",
                                        label: "text-muted-foreground",
                                    }}
                                />
                                <Input
                                    label="Grasa (g)"
                                    placeholder="0"
                                    type="number"
                                    value={String(manualFat)}
                                    onValueChange={value => setManualFat(Number.parseFloat(value))}
                                    variant="bordered"
                                    radius="lg"
                                    isRequired={isManualEntry}
                                    startContent={<Droplets className="w-4 h-4 text-blue-500"/>}
                                    classNames={{
                                        input: "text-foreground",
                                        inputWrapper: "border-border",
                                        label: "text-muted-foreground",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={onClose}
                        className="text-muted-foreground bg-transparent"
                    >
                        Cancelar
                    </Button>
                    <Button
                        className="bg-primary text-primary-foreground font-semibold"
                        onPress={handleSubmit}
                        isLoading={createFoodLog.isPending}
                        isDisabled={!canSubmit}
                    >
                        Agregar Comida
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
