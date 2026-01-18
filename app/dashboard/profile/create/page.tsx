"use client"

import {useState} from "react"
import {Card, CardBody, CardHeader} from "@heroui/card";
import {Progress} from "@heroui/progress";
import {StepPersonalInfo} from "@/components/profile/step-personal-info"
import {StepBodyMetrics} from "@/components/profile/step-body-metrics"
import {StepGoals} from "@/components/profile/step-goals"
import {StepRecommendations} from "@/components/profile/step-recommendations"

export interface ProfileData {
    // Step 1
    fullName: string
    birthDate: string
    gender: string
    country: string
    // Step 2
    height: number
    weight: number
    weightUnit: "kg" | "lb"
    activityLevel: number
    // Step 3
    goal: "maintain" | "lose" | "gain"
    intensity: "conservative" | "moderate" | "aggressive"
}

export interface NutritionRecommendations {
    calories: number
    protein: number
    carbs: number
    fat: number
}

const initialProfileData: ProfileData = {
    fullName: "",
    birthDate: "",
    gender: "",
    country: "",
    height: 170,
    weight: 70,
    weightUnit: "kg",
    activityLevel: 5,
    goal: "maintain",
    intensity: "moderate",
}

const stepTitles = ["Información Personal", "Métricas Corporales", "Objetivos", "Recomendaciones"]

export default function CreateProfilePage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [profileData, setProfileData] = useState<ProfileData>(initialProfileData)
    const [recommendations, setRecommendations] = useState<NutritionRecommendations | null>(null)

    const totalSteps = 4
    const progress = (currentStep / totalSteps) * 100

    const updateProfileData = (data: Partial<ProfileData>) => {
        setProfileData((prev) => ({...prev, ...data}))
    }

    const calculateRecommendations = (): NutritionRecommendations => {
        // Convert weight to kg if needed
        const weightKg = profileData.weightUnit === "lb" ? profileData.weight * 0.453592 : profileData.weight

        // Calculate age from birthDate
        const birthDate = new Date(profileData.birthDate)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }

        // BMR using Mifflin-St Jeor Equation
        let bmr: number
        if (profileData.gender === "male") {
            bmr = 10 * weightKg + 6.25 * profileData.height - 5 * age + 5
        } else {
            bmr = 10 * weightKg + 6.25 * profileData.height - 5 * age - 161
        }

        // Activity multiplier (1-10 scale mapped to 1.2-2.0)
        const activityMultiplier = 1.2 + (profileData.activityLevel - 1) * 0.089

        // TDEE (Total Daily Energy Expenditure)
        let tdee = bmr * activityMultiplier

        // Adjust based on goal and intensity
        if (profileData.goal === "lose") {
            const deficitMap = {conservative: 0.15, moderate: 0.2, aggressive: 0.25}
            tdee = tdee * (1 - deficitMap[profileData.intensity])
        } else if (profileData.goal === "gain") {
            const surplusMap = {conservative: 0.1, moderate: 0.15, aggressive: 0.2}
            tdee = tdee * (1 + surplusMap[profileData.intensity])
        }

        const calories = Math.round(tdee)

        // Macros distribution
        const protein = Math.round(weightKg * 2) // 2g per kg
        const fat = Math.round((calories * 0.25) / 9) // 25% of calories
        const carbs = Math.round((calories - protein * 4 - fat * 9) / 4)

        return {calories, protein, carbs, fat}
    }

    const handleNext = () => {
        if (currentStep === 3) {
            const recs = calculateRecommendations()
            setRecommendations(recs)
        }
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const handleComplete = (finalRecommendations: NutritionRecommendations) => {
        // Here you would save the profile and recommendations to your database
        console.log("Profile completed:", profileData)
        console.log("Final recommendations:", finalRecommendations)
        // Redirect to dashboard
        window.location.href = "/dashboard"
    }

    return (
        <main className="flex justify-center items-center lg:pt-[70px] pt-3 px-3 lg:pt-0">
            <Card className="w-full max-w-2xl py-3 px-3">
                <CardHeader className="flex flex-col gap-4 pb-0">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-2xl font-bold text-emerald-700">Crear tu Perfil</h1>
                        <span className="text-sm text-gray-500">
              Paso {currentStep} de {totalSteps}
            </span>
                    </div>
                    <Progress
                        aria-label="Progreso del formulario"
                        value={progress}
                        className="w-full"
                        color="success"
                        size="sm"
                    />
                    <h2 className="text-lg font-semibold text-gray-700">{stepTitles[currentStep - 1]}</h2>
                </CardHeader>
                <CardBody className="pt-6">
                    {currentStep === 1 && (
                        <StepPersonalInfo data={profileData} onUpdate={updateProfileData} onNext={handleNext}/>
                    )}
                    {currentStep === 2 && (
                        <StepBodyMetrics data={profileData} onUpdate={updateProfileData} onNext={handleNext}
                                         onBack={handleBack}/>
                    )}
                    {currentStep === 3 && (
                        <StepGoals data={profileData} onUpdate={updateProfileData} onNext={handleNext}
                                   onBack={handleBack}/>
                    )}
                    {currentStep === 4 && recommendations && (
                        <StepRecommendations recommendations={recommendations} onBack={handleBack}
                                             onComplete={handleComplete}/>
                    )}
                </CardBody>
            </Card>
        </main>
    )
}
