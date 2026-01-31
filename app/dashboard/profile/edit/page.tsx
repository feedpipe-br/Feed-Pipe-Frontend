"use client";

import {Tab, Tabs} from "@heroui/tabs";
import {addToast, Button} from "@heroui/react";
import {
    ProfilePartialUpdateMutationBody,
    ProfileUpdateDailyPlanPartialUpdateMutationBody,
    useProfilePartialUpdate,
    useProfileUpdateDailyPlanPartialUpdate
} from "@/src/api/endpoints/profile/profile";
import {useContext, useState} from "react";
import {IProfileContext, ProfileContext} from "@/contexts/profile";
import {StepBodyMetrics} from "@/components/profile/step-body-metrics";
import {StepGoals} from "@/components/profile/step-goals";
import {StepPersonalInfo} from "@/components/profile/step-personal-info";
import {StepDailyPlan} from "@/components/profile/step-daily-plan";


export default function ProfileEditPage() {
    const {currentProfile, refetchProfiles} = useContext(ProfileContext) as IProfileContext;
    if (!currentProfile) return <></>;
    const initialCurrentProfile = {
        ...currentProfile,
        activity_degree: (currentProfile.activity_degree - 1.2) * 9 / 0.7 + 1,
    };
    const [profileData, setProfileData] = useState<ProfilePartialUpdateMutationBody>(initialCurrentProfile);
    const [activeTab, setActiveTab] = useState("personal-info");
    const mutationOnSuccess = () => {
        refetchProfiles();
        addToast({
            description: "Perfil editado exitosamente.",
            color: "success"
        })
    }
    const mutationOnError = () => {
        addToast({
            description: "Fallo editar el perfil, verifique que los datos estan correctos.",
            color: "danger"
        })
    }
    const updateProfilePartial = useProfilePartialUpdate({
        mutation: {
            onSuccess: mutationOnSuccess,
            onError: mutationOnError,
        }
    })
    const updateDailyPlan = useProfileUpdateDailyPlanPartialUpdate({
        mutation: {
            onSuccess: mutationOnSuccess,
            onError: mutationOnError,
        }
    })

    const updateProfileData = (data: Partial<ProfilePartialUpdateMutationBody>) => {
        setProfileData((prev) => ({...prev, ...data}))
    }

    const handleSubmit = () => {
        const payload = {
            ...profileData,
            activity_degree: ((profileData.activity_degree || 0) - 1) * 0.7 / 9 + 1.2,
        }
        updateProfilePartial.mutate({id: currentProfile.id.toString(), data: payload})
    }

    const handleSubmitDailyPlan = (dailyPlan: Partial<ProfileUpdateDailyPlanPartialUpdateMutationBody>) => {
        updateDailyPlan.mutate({id: currentProfile.id.toString(), data: dailyPlan})
    }

    return (
        <main
            className="container-fluid d-flex justify-center items-center lg:py-10 lg:px-40 md:py-10 md:px-8 px-3 py-5">
            <div className="flex w-full flex-col">
                <Tabs selectedKey={activeTab} onSelectionChange={(key) => {setActiveTab(String(key))}} className="lg:px-32 md:px-3" aria-label={"Edit Profile"} color={"success"} variant={"bordered"}>
                    <Tab key="personal-info" title="Informacion Personal">
                        <StepPersonalInfo data={profileData} onUpdate={updateProfileData}/>
                    </Tab>
                    <Tab key="body-metrics" title="Body Metrics">
                        <StepBodyMetrics<ProfilePartialUpdateMutationBody> data={profileData} onUpdate={updateProfileData}/>
                    </Tab>
                    <Tab key="goals" title="Objetivos">
                        <StepGoals<ProfilePartialUpdateMutationBody> data={profileData} onUpdate={updateProfileData}/>
                    </Tab>
                    <Tab key="daily-plan" title="Plan de objetivos diarios">
                        <StepDailyPlan initialDailyPlan={currentProfile.daily_plan} onComplete={handleSubmitDailyPlan} btnText={"Editar"}/>
                    </Tab>
                </Tabs>
                {activeTab !== "daily-plan" && (
                    <div className="flex justify-start mt-4">
                        <Button color="success" size="lg" className="font-semibold" onPress={handleSubmit}>
                            Editar
                        </Button>
                    </div>
                )}
            </div>
        </main>
    )
}