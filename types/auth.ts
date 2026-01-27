export type AuthTabs = "login" | "register" | "email-sent"

export interface IAuthenticationContext {
    authTab: AuthTabs
    setAuthTab: (authTab: AuthTabs) => void
    handleOpenAuth: (authTab: AuthTabs) => void
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
}