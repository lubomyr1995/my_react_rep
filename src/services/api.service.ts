import axios, {AxiosResponse} from "axios"

const baseURL: string = "https://dummyjson.com";

export type IRes<T> = Promise<AxiosResponse<T>>

const apiService = axios.create({
    baseURL,
    headers: {'content-type': 'application/json; charset=UTF-8'}
});

export default apiService;