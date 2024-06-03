import {IAuth} from "../interfaces/IAuth.ts";
import {apiService} from "./api.service.ts";
import {urls} from "../constants/urls.ts";
import {IUser} from "../interfaces/IUser.ts";
import {IRes} from "../types/responseType.ts";
import {ITokens} from "../interfaces/ITokens.ts";

const accessTokenKey = 'access';
const refreshTokenKey = 'refresh';

const authService = {
    register: (user: IAuth): IRes<IUser> => apiService.post(urls.auth.register, user),
    login: async (user: IAuth): Promise<void> => {
        const {data} = await apiService.post(urls.auth.login, user);
        authService.setTokens(data);
        // const {data: me} = await authService.me();
        // return me
    },
    async refresh(): Promise<void> {
        const refresh = this.getRefreshToken();
        if (!refresh) {
            throw new Error('No refresh token found');
        }
        const {data} = await apiService.post(urls.auth.refresh, {refresh});
        this.setTokens(data);
    },
    setTokens({access, refresh}: ITokens): void {
        localStorage.setItem(accessTokenKey, access);
        localStorage.setItem(refreshTokenKey, refresh);
    },
    me(): IRes<IUser> {
        return apiService.get(urls.auth.me);
    },
    getAccessToken(): string | null {
        return localStorage.getItem(accessTokenKey);
    },
    getRefreshToken(): string | null {
        return localStorage.getItem(refreshTokenKey);
    },
    deleteTokens(): void {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }
};

export {
    authService
};