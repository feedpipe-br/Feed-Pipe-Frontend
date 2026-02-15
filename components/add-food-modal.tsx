"use client";

import {useState} from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Input} from "@heroui/input";
import {Beef, CookingPot, Droplets, Flame, Wheat} from "lucide-react";
import {Button, Divider} from "@heroui/react";
import {Food} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {FoodCreateMutationBody, useFoodCreate} from "@/src/api/endpoints/food/food";
import {Checkbox} from "@heroui/checkbox";
import {useFormState} from "@/hooks/use-form-state";

interface CreateFoodModalProps {
    onClose: () => void
    onCreate: (food: Food) => void
}

export default function AddFoodModal({ onClose, onCreate }: CreateFoodModalProps) {
    const [formData, handleChange, handleChangeBoolean, getInputValue] = useFormState<FoodCreateMutationBody>({});

    const createFood = useFoodCreate({
        mutation: {
            onSuccess:({data}) => {
                onCreate(data)
                onClose()
            }
        }
    })

    const canSave = formData.name && formData.calories && formData.protein && formData.carbs && formData.fats

    const handleCreate = async () => {
        if (!canSave) return;
        createFood.mutate({data: formData as FoodCreateMutationBody})
    }

    return (
        <Modal isOpen={true} onClose={onClose} size="lg" placement={"center"}>
            <ModalContent>
                <ModalHeader>
                    <div className="flex items-center gap-2">
                        <CookingPot className="w-5 h-5 text-primary" />
                        <span className="text-foreground">Crear alimento</span>
                    </div>
                </ModalHeader>
                <ModalBody className="gap-4">
                    <Input
                        label="Nombre del alimento"
                        placeholder="Ej: Pechuga de pavo"
                        value={getInputValue("name")}
                        onValueChange={handleChange("name")}
                        variant="bordered"
                        radius="lg"
                        isRequired
                        classNames={{
                            input: "text-foreground",
                            inputWrapper: "border-border",
                            label: "text-muted-foreground",
                        }}
                    />
                    <Input
                        label="Porcion (g)"
                        placeholder="Ej: 100, 30, etc"
                        value={getInputValue("serving")}
                        onValueChange={handleChange("serving", "int")}
                        variant="bordered"
                        radius="lg"
                        isRequired
                        classNames={{
                            input: "text-foreground",
                            inputWrapper: "border-border",
                            label: "text-muted-foreground",
                        }}
                    />
                    <p className="text-sm text-muted-foreground">
                        Valores nutricionales por cada {formData.serving}g
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <Input
                            label="Calorías (kcal)"
                            placeholder="0"
                            type="number"
                            value={getInputValue("calories")}
                            onValueChange={handleChange("calories", "decimal")}
                            variant="bordered"
                            radius="lg"
                            isRequired
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
                            value={getInputValue("protein")}
                            onValueChange={handleChange("protein", "decimal")}
                            variant="bordered"
                            radius="lg"
                            isRequired
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
                            value={getInputValue("carbs")}
                            onValueChange={handleChange("carbs", "decimal")}
                            variant="bordered"
                            radius="lg"
                            isRequired
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
                            value={getInputValue("fats")}
                            onValueChange={handleChange("fats", "decimal")}
                            variant="bordered"
                            radius="lg"
                            isRequired
                            startContent={<Droplets className="w-4 h-4 text-blue-500"/>}
                            classNames={{
                                input: "text-foreground",
                                inputWrapper: "border-border",
                                label: "text-muted-foreground",
                            }}
                        />
                    </div>
                    <Divider/>
                    <p className="text-sm text-muted-foreground">
                        Informacion adicional
                    </p>
                    <Input
                        label="Empresa"
                        placeholder="Ej: Nestle, Oreo"
                        value={getInputValue("brand")}
                        onValueChange={handleChange("brand")}
                        variant="bordered"
                        radius="lg"
                        classNames={{
                            input: "text-foreground",
                            inputWrapper: "border-border",
                            label: "text-muted-foreground",
                        }}
                    />
                    <Input
                        label="Codigo de Barras"
                        placeholder="Ej: 23435467"
                        value={getInputValue("bar_code")}
                        onValueChange={handleChange("bar_code")}
                        variant="bordered"
                        radius="lg"
                        classNames={{
                            input: "text-foreground",
                            inputWrapper: "border-border",
                            label: "text-muted-foreground",
                        }}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <Checkbox size="md" isSelected={formData.is_vegan} onValueChange={handleChangeBoolean("is_vegan")}>
                            Vegan
                        </Checkbox>
                        <Checkbox size="md" isSelected={formData.is_vegetarian} onValueChange={handleChangeBoolean("is_vegetarian")}>
                            Vegetarian
                        </Checkbox>
                        <Checkbox size="md" isSelected={formData.is_gluten_free} onValueChange={handleChangeBoolean("is_gluten_free")}>
                            Gluten Free
                        </Checkbox>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose} className="text-muted-foreground bg-transparent">
                        Cancelar
                    </Button>
                    <Button
                        className="bg-primary text-primary-foreground font-semibold"
                        onPress={handleCreate}
                        isLoading={createFood.isPending}
                        isDisabled={!canSave}
                    >
                        Crear alimento
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}