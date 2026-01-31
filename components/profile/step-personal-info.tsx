"use client"

import {Autocomplete, AutocompleteItem, Button, Input} from "@heroui/react"
import {CountryEnum, GenderEnum} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {useMemo} from "react";
import {countries} from "countries-list";
import {StepProfileFormProps} from "@/types/profile-forms";
import {ProfilePartialUpdateMutationBody} from "@/src/api/endpoints/profile/profile";

export function StepPersonalInfo<T extends ProfilePartialUpdateMutationBody>({data, onUpdate, onNext}: StepProfileFormProps<T>) {
    const isValid = (data.name && data.name.trim() !== "") && (data.birth_date && data.birth_date !== "")
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate()).toISOString().split("T")[0]
    const countryList = useMemo(() => {
        return Object.entries(countries).map(([code, data]) => ({
            code: code,
            name: data.name,
        }));
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <Input
                label="Nombre Completo"
                placeholder="Ingresa tu nombre completo"
                value={data.name}
                onValueChange={(value) => onUpdate({name: value})}
                variant="bordered"
                isRequired
            />

            <Input
                label="Fecha de Nacimiento"
                type="date"
                value={data.birth_date}
                max={maxDate}
                onValueChange={(value) => onUpdate({birth_date: value})}
                variant="bordered"
                isRequired
            />

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                    Género <span className="text-danger">*</span>
                </label>
                <div className="flex gap-3">
                    {[
                        {value: "male", label: "Masculino"},
                        {value: "female", label: "Femenino"},
                    ].map((option) => (
                        <Button
                            key={option.value}
                            variant={data.gender === option.value ? "solid" : "bordered"}
                            color={data.gender === option.value ? "success" : "default"}
                            onPress={() => onUpdate({gender: option.value as GenderEnum})}
                            className="flex-1"
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">País (opcional)</label>
                <div className="flex flex-wrap gap-2">
                    <Autocomplete
                        label="Selecciona un país"
                        placeholder="Escribe para buscar..."
                        defaultItems={countryList}
                        selectedKey={data.country}
                        className="max-w-xs"
                        onSelectionChange={(value) => onUpdate({country: value as CountryEnum})}
                    >
                        {(item) => (
                            <AutocompleteItem key={item.code}>
                                {item.name}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                </div>
            </div>

            {onNext && (
                <div className="flex justify-end mt-4">
                    <Button color="success" size="lg" onPress={onNext} isDisabled={!isValid} className="font-semibold">
                        Continuar
                    </Button>
                </div>
            )}
        </div>
    )
}
