import axios, {AxiosError} from "axios";
import router from "../router.tsx";

import {baseURL, urls} from "../constants";
import {authService} from "./auth.service.ts";


let isRefreshing = false;
type IWaitList = () => void;
const waitList: IWaitList[] = [];
const apiService = axios.create({baseURL});

apiService.interceptors.request.use(request => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
        request.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return request
});

apiService.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && authService.getRefreshToken()) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await authService.refresh();
                    isRefreshing = false;
                    runAfterRefresh();
                    return apiService(originalRequest)
                } catch (err) {
                    authService.deleteTokens();
                    isRefreshing = false;
                    setTimeout(() => {
                        router.navigate(`/login?SessionExpired=true`)
                    }, 1);
                    return Promise.reject(error)
                }
            }
            if (originalRequest.url === urls.auth.refresh) {
                return Promise.reject(error)
            }
            return new Promise(resolve => {
                subscribeToWaitList(() => {
                    resolve(apiService(originalRequest))
                })
            })
        }
        return Promise.reject(error)
    }
);

const subscribeToWaitList = (cb: IWaitList): void => {
    waitList.push(cb)
}

const runAfterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb()
    }
}

export {
    apiService
}
