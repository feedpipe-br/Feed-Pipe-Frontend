"use client"

import {Button, cn, Radio, RadioGroup} from "@heroui/react"
import {goalOptions, intensityOptions} from "@/constants";
import {StepProfileFormProps} from "@/types/profile-forms";
import {GoalIntensityEnum, Profile} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {ProfilePartialUpdateMutationBody} from "@/src/api/endpoints/profile/profile";


export function StepGoals<T extends ProfilePartialUpdateMutationBody>({data, onUpdate, onNext, onBack}: StepProfileFormProps<T>) {
    const showIntensity = data.goal === "weight_loss" || data.goal === "weight_gain"
    const isValid = !showIntensity || data.goal_intensity !== ""

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <span className="text-sm font-medium">Cual es tu objetivo?</span>
                <RadioGroup
                    value={data.goal}
                    onValueChange={(value) => onUpdate({goal: value as Profile["goal"]})}
                    className="gap-3"
                >
                    {goalOptions.map((option) => {
                        const Icon = option.icon
                        return (
                            <Radio
                                key={option.value}
                                value={option.value}
                                classNames={{
                                    base: cn(
                                        "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                        "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2",
                                        "data-[selected=true]:border-success",
                                    ),
                                    label: "w-full",
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-lg bg-gray-100", option.color)}>
                                        <Icon className="w-5 h-5"/>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{option.label}</p>
                                        <p className="text-sm text-gray-500">{option.description}</p>
                                    </div>
                                </div>
                            </Radio>
                        )
                    })}
                </RadioGroup>
            </div>

            {showIntensity && (
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-medium">Nivel de intensidad</span>
                    <RadioGroup
                        value={data.goal_intensity}
                        onValueChange={(value) => onUpdate({goal_intensity: value as GoalIntensityEnum})}
                        className="gap-3"
                    >
                        {intensityOptions.map((option) => {
                            const Icon = option.icon
                            return (
                                <Radio
                                    key={option.value}
                                    value={option.value}
                                    classNames={{
                                        base: cn(
                                            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                            "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2",
                                            "data-[selected=true]:border-success",
                                        ),
                                        label: "w-full",
                                    }}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className={cn("p-2 rounded-lg bg-gray-100", option.color)}>
                                            <Icon className="w-5 h-5"/>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">{option.label}</p>
                                            <p className="text-sm text-gray-500">{option.description}</p>
                                        </div>
                                        <span className="text-xs font-medium text-gray-400">{option.detail}</span>
                                    </div>
                                </Radio>
                            )
                        })}
                    </RadioGroup>
                </div>
            )}

            {onNext && onBack && (
                <div className="flex justify-between mt-4">
                    <Button variant="bordered" size="lg" onPress={onBack}>
                        Atrás
                    </Button>
                    <Button color="success" size="lg" onPress={onNext} isDisabled={!isValid} className="font-semibold">
                        Ver Recomendaciones
                    </Button>
                </div>
            )}
        </div>
    )
}
