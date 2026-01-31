"use client"

import {useContext, useState} from "react"
import {Card, CardBody, CardHeader} from "@heroui/card";
import {Progress} from "@heroui/progress";
import {StepPersonalInfo} from "@/components/profile/step-personal-info"
import {StepBodyMetrics} from "@/components/profile/step-body-metrics"
import {StepGoals} from "@/components/profile/step-goals"
import {StepDailyPlan} from "@/components/profile/step-daily-plan"
import {
    ProfileCreateMutationBody,
    ProfileUpdateDailyPlanPartialUpdateMutationBody,
    useProfileCreate,
    useProfileGetDailyPlanRecommendationsRetrieve,
    useProfilePartialUpdate,
    useProfileUpdateDailyPlanPartialUpdate,
} from "@/src/api/endpoints/profile/profile";
import {Profile} from "@/src/api/endpoints/feedPipeAPI.schemas";
import {addToast} from "@heroui/react";
import {useRouter} from "next/navigation";
import {IProfileContext, ProfileContext} from "@/contexts/profile";
import {initialProfileData} from "@/constants";


const stepTitles = ["Información Personal", "Métricas Corporales", "Objetivos", "Recomendaciones"]

export default function CreateProfilePage() {
    const {refetchProfiles, setCurrentProfileId} = useContext(ProfileContext) as IProfileContext;
    const [currentStep, setCurrentStep] = useState(1)
    const [profileData, setProfileData] = useState<ProfileCreateMutationBody>(initialProfileData)
    const [profileComplete, setProfileComplete] = useState<Profile | null>(null)
    const initialDailyPlan = useProfileGetDailyPlanRecommendationsRetrieve(profileComplete?.id.toString() || "-1", {
        query: {
            enabled: !!profileComplete
        }
    })
    const router = useRouter();
    const createProfile = useProfileCreate({
        mutation: {
            onSuccess: ({data}) => {
                setProfileComplete(data);
            },
            onError: (error) => {
                console.error(error);
                addToast({
                    description: "Fallo crear el perfil, verifique que los datos estan correctos.",
                    color: "danger"
                })
            },
        }
    })
    const updateProfilePartial = useProfilePartialUpdate({
        mutation: {
            onSuccess: ({data}) => {
                setProfileComplete(data);
            },
            onError: () => {
                addToast({
                    description: "Fallo crear el perfil, verifique que los datos estan correctos.",
                    color: "danger"
                })
            },
        }
    })
    const updateDailyPlan = useProfileUpdateDailyPlanPartialUpdate({
        mutation: {
            onSuccess: () => {
                addToast({
                    description: `Se completo la creacion del perfil ${profileComplete?.name}.`,
                    color: "success",
                })
                refetchProfiles();
                profileComplete && setCurrentProfileId((profileComplete.id))
                router.push("/dashboard")
            },
            onError: () => {
                addToast({
                    description: "Fallo crear el perfil, verifique que los datos estan correctos.",
                    color: "danger"
                })
            },
        }
    })

    const totalSteps = 4
    const progress = (currentStep / totalSteps) * 100

    const updateProfileData = (data: Partial<ProfileCreateMutationBody>) => {
        setProfileData((prev) => ({...prev, ...data}))
    }

    const handleNext = () => {
        if (currentStep === 3) {
            const requestData = {
                ...profileData,
                activity_degree: (profileData.activity_degree - 1) * 0.7 / 9 + 1.2
            }
            if (profileComplete) {
                updateProfilePartial.mutate({id: profileComplete.id.toString(), data: requestData})
            } else {
                createProfile.mutate({data: requestData})
            }
        }
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const handleCompleteDailyPlan = (dailyPlan: ProfileUpdateDailyPlanPartialUpdateMutationBody) => {
        if (!profileComplete) return
        updateDailyPlan.mutate({id: profileComplete.id.toString(), data: dailyPlan})
    }

    return (
        <main className="flex justify-center items-center lg:pt-[70px] pt-3 px-3">
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
                    {currentStep === 4 && initialDailyPlan.data?.data && (
                        <StepDailyPlan initialDailyPlan={initialDailyPlan.data.data} onBack={handleBack}
                                       onComplete={handleCompleteDailyPlan}/>
                    )}
                </CardBody>
            </Card>
        </main>
    )
}
