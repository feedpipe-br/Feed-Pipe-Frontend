import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

export const AXIOS = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const axiosInstance = (
    url: string,
    options?: RequestInit,
): Promise<AxiosResponse> => {
    let data = options?.body
    if (data && typeof data === "string"){
        try {
            data = JSON.parse(data)
        } catch (e) {
            throw new AxiosError("Invalid data")
        }
    }
    const promise = AXIOS({
        url,
        method: options?.method || "GET",
        headers: options?.headers as any,
        data: data,
        signal: options?.signal as any,
    }).then(response => response);

    return promise;
};
