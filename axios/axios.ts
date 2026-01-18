import axios, {AxiosError, AxiosResponse} from "axios";
import Cookies from "js-cookie";

export const AXIOS = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const axiosInstance = (
    url: string,
    options?: RequestInit,
): Promise<AxiosResponse> => {
    let data = options?.body
    if (data && typeof data === "string") {
        try {
            data = JSON.parse(data)
        } catch (e) {
            throw new AxiosError("Invalid data")
        }
    }
    const token = Cookies.get("auth_token")
    const promise = AXIOS({
        url,
        method: options?.method || "GET",
        headers: {
            ...options?.headers as any,
            "Authorization": token ? `Token ${token}`: "",
        },
        data: data,
        signal: options?.signal as any,
    }).then(response => response)
        .catch((error: AxiosError) => {
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    Cookies.remove("auth_token");
                }
            }
            return Promise.reject(error);
        });

    return promise;
};
