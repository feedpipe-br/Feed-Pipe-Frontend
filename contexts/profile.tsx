import {Profile} from "@/src/api/endpoints/feedPipeAPI.schemas";
import React, {useContext, useEffect, useMemo} from "react";
import {useRouter} from "next/navigation";
import {AuthenticationContext} from "@/contexts/auth";
import {IAuthenticationContext} from "@/types/auth";
import {useProfileList} from "@/src/api/endpoints/profile/profile";
import {usePersistentState} from "@/hooks/use-persistent-state";

export interface IProfileContext {
    profiles: Profile[] | undefined
    currentProfileId: number | null
    currentProfile: Profile | null | undefined
    setCurrentProfileId: (profileId: number) => void
    isPending: boolean
}
export const ProfileContext = React.createContext<IProfileContext | null>(null)


export const ProfileProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const {isAuthenticated, handleOpenAuth} = useContext(AuthenticationContext) as IAuthenticationContext;
    const router = useRouter();
    const {data, isPending} = useProfileList();
    const [currentProfileId, setCurrentProfileId] = usePersistentState<number| null>("currentProfileId", null);

    useEffect(() => {
        if (!isAuthenticated) {
            handleOpenAuth("login");
            router.push("/");
        }
    }, []);

    useEffect(() => {
        const firstProfileId = data?.data?.at(0)?.id
        if (firstProfileId && !currentProfileId) {
            setCurrentProfileId(firstProfileId);
        }
    }, [data])

    const currentProfile = useMemo(() => {
        return currentProfileId && data?.data ? data.data.find(p => p.id === currentProfileId) : null
    }, [currentProfileId, data])

    return (
        <ProfileContext.Provider value={{profiles: data?.data, currentProfile, currentProfileId, setCurrentProfileId, isPending}}>
            {children}
        </ProfileContext.Provider>
    )
}