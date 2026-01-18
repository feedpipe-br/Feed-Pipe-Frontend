import {createContext} from "react";
import {IAuthenticationContext} from "@/types/auth";

export const AuthenticationContext = createContext<IAuthenticationContext | null>(null)
