import {IAuth, ITokens, IUser} from "../models";
import {apiService} from "./api.service.ts";
import {urls} from "../constants";
import {IRes} from "../types";


const accessTokenKey = 'access';
const refreshTokenKey = 'refresh';
const authService = {
    register: (user: IAuth): IRes<IUser> => apiService.post(urls.auth.register, user),
    login: async (user: IAuth): Promise<IUser> => {
        try {
            const {data} = await apiService.post<ITokens>(urls.auth.login, user);
            authService.setTokens(data);
            const {data: me} = await authService.me();
            return me
        } catch (e) {
            authService.deleteTokens() // видаляю токени якщо перший авейт пройшов а другий ні.
            throw e
        }
    },
    refresh: async (): Promise<void> => {
        const refresh = authService.getRefreshToken();
        if (!refresh) {
            throw new Error("Not found refresh token");
        }
        const {data} = await apiService.post<ITokens>(urls.auth.refresh, {refresh});
        authService.setTokens(data);
    },
    me: (): IRes<IUser> => apiService.get<IUser>(urls.auth.me),
    setTokens: ({access, refresh}: ITokens): void => {
        localStorage.setItem(accessTokenKey, access);
        localStorage.setItem(refreshTokenKey, refresh);
    },
    getAccessToken: (): string | null => localStorage.getItem(accessTokenKey),
    getRefreshToken: (): string | null => localStorage.getItem(refreshTokenKey),
    deleteTokens: (): void => {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }
}

export {
    authService
}