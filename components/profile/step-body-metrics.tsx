"use client"

import {Button, ButtonGroup, Input, Slider} from "@heroui/react"
import {activityLabels} from "@/constants";
import {StepProfileFormProps} from "@/types/profile-forms";
import {ProfilePartialUpdateMutationBody} from "@/src/api/endpoints/profile/profile";

export function StepBodyMetrics<T extends ProfilePartialUpdateMutationBody>({data, onUpdate, onNext, onBack}: StepProfileFormProps<T>) {
    const isValid = data.height && data.height > 0 && data.weight_value && data.weight_value > 0

    const handleWeightUnitChange = (unit: "kg" | "lb") => {
        if (unit === data.weight_unit) return

        const newWeight = data.weight_value ? (unit === "lb" ? Math.round(data.weight_value * 2.20462) : Math.round(data.weight_value / 2.20462)): 0

        onUpdate({weight_unit: unit, weight_value: newWeight})
    }

    return (
        <div className="flex flex-col gap-6">
            <Input
                label="Altura (cm)"
                type="number"
                placeholder="170"
                value={data.height ? data.height.toString(): ""}
                onValueChange={(value) => onUpdate({height: Number.parseInt(value) || 0})}
                variant="bordered"
                min={100}
                max={250}
                endContent={<span className="text-gray-400 text-sm">cm</span>}
                isRequired
            />

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Peso</span>
                    <ButtonGroup size="sm">
                        <Button
                            color={data.weight_unit === "kg" ? "success" : "default"}
                            variant={data.weight_unit === "kg" ? "solid" : "bordered"}
                            onPress={() => handleWeightUnitChange("kg")}
                        >
                            kg
                        </Button>
                        <Button
                            color={data.weight_unit === "lb" ? "success" : "default"}
                            variant={data.weight_unit === "lb" ? "solid" : "bordered"}
                            onPress={() => handleWeightUnitChange("lb")}
                        >
                            lb
                        </Button>
                    </ButtonGroup>
                </div>
                <Input
                    type="number"
                    placeholder={data.weight_unit === "kg" ? "70" : "154"}
                    value={data.weight_value ? data.weight_value.toString(): ""}
                    onValueChange={(value) => onUpdate({weight_value: Number.parseFloat(value) || 0})}
                    variant="bordered"
                    min={data.weight_unit === "kg" ? 30 : 66}
                    max={data.weight_unit === "kg" ? 300 : 660}
                    endContent={<span className="text-gray-400 text-sm">{data.weight_unit}</span>}
                    isRequired
                />
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Nivel de Actividad</span>
                    <span
                        className="text-sm text-emerald-600 font-semibold">{data.activity_degree ? activityLabels[data.activity_degree]: 3}</span>
                </div>
                <Slider
                    aria-label="Nivel de actividad"
                    step={1}
                    minValue={1}
                    maxValue={10}
                    value={data.activity_degree}
                    onChange={(value) => onUpdate({activity_degree: value as number})}
                    color="success"
                    showSteps
                    marks={[
                        {value: 1, label: "1"},
                        {value: 5, label: "5"},
                        {value: 10, label: "10"},
                    ]}
                    className="max-w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                    1 = Sedentario (trabajo de oficina, sin ejercicio) | 10 = Atleta profesional (entrenamientos
                    intensos diarios)
                </p>
            </div>

            {onNext && onBack && (
                <div className="flex justify-between mt-4">
                    <Button variant="bordered" size="lg" onPress={onBack}>
                        Atrás
                    </Button>
                    <Button color="success" size="lg" onPress={onNext} isDisabled={!isValid} className="font-semibold">
                        Continuar
                    </Button>
                </div>
                )
            }
        </div>
    )
}
