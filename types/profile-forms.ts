import {
    ProfilePartialUpdateMutationBody,
    ProfileUpdateDailyPlanPartialUpdateMutationBody
} from "@/src/api/endpoints/profile/profile";
import {DietRecommendations} from "@/src/api/endpoints/feedPipeAPI.schemas";

export interface StepProfileFormProps<T extends ProfilePartialUpdateMutationBody> {
    data: T;
    onBack?: () => void
    onNext?: () => void
    onUpdate: (data: Partial<ProfilePartialUpdateMutationBody>) => void
}

export interface StepDailyPlanFormProps<T extends DietRecommendations> {
    initialDailyPlan: T;
    onBack?: () => void
    onComplete?: (dailyPlan: Partial<ProfileUpdateDailyPlanPartialUpdateMutationBody>) => void
    btnText?: string;
}