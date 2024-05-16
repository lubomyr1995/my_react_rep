import axios, {AxiosResponse} from "axios"

const baseURL: string = "https://jsonplaceholder.typicode.com";

export type IRes<T> = Promise<AxiosResponse<T>>

const apiService = axios.create({
    baseURL,
    headers: {'content-type': 'application/json; charset=UTF-8'}
});

// just for example
apiService.interceptors.request.use(request => {
    request.headers.set({xxx: 'foobar'});
    return request;
});

export default apiService;