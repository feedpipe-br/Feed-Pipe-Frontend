"use client"

import {useState} from "react"
import {Button, Card, CardBody, Input} from "@heroui/react"
import {Info} from "lucide-react"
import {ProfileUpdateDailyPlanPartialUpdateMutationBody} from "@/src/api/endpoints/profile/profile";
import {macroItems} from "@/constants";
import {StepDailyPlanFormProps} from "@/types/profile-forms";
import {DietRecommendations} from "@/src/api/endpoints/feedPipeAPI.schemas";


export function StepDailyPlan<T extends DietRecommendations>({
                                                                 initialDailyPlan,
                                                                 onBack,
                                                                 onComplete,
                                                                 btnText
                                                             }: StepDailyPlanFormProps<T>) {
    const [customValues, setCustomValues] = useState<ProfileUpdateDailyPlanPartialUpdateMutationBody>(initialDailyPlan)
    const [isEditing, setIsEditing] = useState(false)

    const handleReset = () => {
        setCustomValues(initialDailyPlan)
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"/>
                <div>
                    <p className="text-sm text-emerald-800 font-medium">
                        Basándonos en tu perfil, hemos calculado estas recomendaciones nutricionales.
                    </p>
                    <p className="text-sm text-emerald-700 mt-1">
                        Puedes ajustar estos valores según tus preferencias personales.
                    </p>
                </div>
            </div>

            <div className="grid gap-4">
                {macroItems.map((item) => {
                    const Icon = item.icon
                    const value = customValues[item.key as keyof ProfileUpdateDailyPlanPartialUpdateMutationBody]
                    const originalValue = initialDailyPlan[item.key as keyof DietRecommendations]
                    const hasChanged = value !== originalValue

                    return (
                        <Card key={item.key} shadow="sm">
                            <CardBody className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${item.color}`}>
                                        <Icon className="w-6 h-6"/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-800">{item.label}</h3>
                                            {hasChanged && (
                                                <span
                                                    className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Modificado</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {isEditing ? (
                                            <Input
                                                type="number"
                                                value={value ? value.toString() : ""}
                                                onValueChange={(val) =>
                                                    setCustomValues((prev) => ({
                                                        ...prev,
                                                        [item.key]: Number.parseInt(val) || 0,
                                                    }))
                                                }
                                                className="w-24"
                                                size="sm"
                                                variant="bordered"
                                                endContent={<span className="text-xs text-gray-400">{item.unit}</span>}
                                            />
                                        ) : (
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-gray-800">{value}</span>
                                                <span className="text-sm text-gray-500 ml-1">{item.unit}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>

            <div className="flex items-center justify-center gap-3">
                {isEditing ? (
                    <>
                        <Button variant="light" color="danger" onPress={handleReset} size="sm">
                            Restaurar valores
                        </Button>
                        <Button variant="flat" color="success" onPress={() => setIsEditing(false)} size="sm">
                            Guardar cambios
                        </Button>
                    </>
                ) : (
                    <Button variant="flat" color="default" onPress={() => setIsEditing(true)} size="sm">
                        Personalizar valores
                    </Button>
                )}
            </div>
            <div className="flex justify-between mt-4">
                {onBack && (
                    <Button variant="bordered" size="lg" onPress={onBack}>
                        Atrás
                    </Button>)}
                {onComplete && (
                    <Button color="success" size="lg" onPress={() => onComplete(customValues)}
                            className="font-semibold">
                        {btnText || "Completar Perfil"}
                    </Button>)}
            </div>
        </div>
    )
}
