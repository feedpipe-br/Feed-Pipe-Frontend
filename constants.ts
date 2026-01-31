import {Beef, Droplets, Flame, Gauge, Minus, TrendingDown, TrendingUp, Turtle, Wheat, Zap} from "lucide-react";
import {GoalEnum, GoalIntensityEnum} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {ProfileCreateMutationBody} from "@/src/api/endpoints/profile/profile";

type MacroItem = {
    key: string,
    label: string,
    icon: any,
    color: string,
    unit: "kcal" | "g",
    description: string,
}

export const macroItems: Array<MacroItem> = [
    {
        key: "calories",
        label: "Calorías Diarias",
        icon: Flame,
        color: "bg-orange-100 text-orange-600",
        unit: "kcal",
        description: "Tu gasto energético total ajustado a tu objetivo",
    },
    {
        key: "protein",
        label: "Proteínas",
        icon: Beef,
        color: "bg-red-100 text-red-600",
        unit: "g",
        description: "Esencial para mantener y construir masa muscular",
    },
    {
        key: "carbs",
        label: "Carbohidratos",
        icon: Wheat,
        color: "bg-amber-100 text-amber-600",
        unit: "g",
        description: "Tu principal fuente de energía",
    },
    {
        key: "fats",
        label: "Grasas",
        icon: Droplets,
        color: "bg-blue-100 text-blue-600",
        unit: "g",
        description: "Importantes para hormonas y absorción de vitaminas",
    },
]

export const activityLabels: Record<number, string> = {
    1: "Sedentario",
    2: "Muy poco activo",
    3: "Poco activo",
    4: "Ligeramente activo",
    5: "Moderadamente activo",
    6: "Activo",
    7: "Muy activo",
    8: "Bastante activo",
    9: "Extremadamente activo",
    10: "Atleta profesional",
}

export const goalOptions = [
    {
        value: GoalEnum.weight_loss,
        label: "Perder Peso",
        description: "Reducir grasa corporal",
        icon: TrendingDown,
        color: "text-blue-500",
    },
    {
        value: GoalEnum.maintenance,
        label: "Mantener Peso",
        description: "Conservar mi peso actual",
        icon: Minus,
        color: "text-emerald-500",
    },
    {
        value: GoalEnum.weight_gain,
        label: "Ganar Peso",
        description: "Aumentar masa muscular",
        icon: TrendingUp,
        color: "text-orange-500",
    },
]

export const intensityOptions = [
    {
        value: GoalIntensityEnum.conservative,
        label: "Conservador",
        description: "Cambios graduales y sostenibles",
        detail: "~0.25kg/semana",
        icon: Turtle,
        color: "text-emerald-500",
    },
    {
        value: GoalIntensityEnum.moderate,
        label: "Moderado",
        description: "Balance entre velocidad y sostenibilidad",
        detail: "~0.5kg/semana",
        icon: Gauge,
        color: "text-amber-500",
    },
    {
        value: GoalIntensityEnum.aggressive,
        label: "Agresivo",
        description: "Resultados más rápidos, mayor esfuerzo",
        detail: "~0.75kg/semana",
        icon: Zap,
        color: "text-red-500",
    },
]

export const initialProfileData: ProfileCreateMutationBody = {
    name: "",
    birth_date: "",
    gender: "male",
    country: "",
    height: 170,
    weight_value: 70,
    weight_unit: "kg",
    activity_degree: 5,
    goal: "maintenance",
    goal_intensity: "moderate",
}