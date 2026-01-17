import axios, {AxiosRequestConfig} from "axios";

export const AXIOS = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const axiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const promise = AXIOS({
        ...config,
        ...options,
    }).then(({ data }) => data);

    return promise;
};
