import {IRes} from "../types/resType.ts";
import {IUser} from "../models/IUser.ts";
import {apiService} from "./api.service.ts";
import {urls} from "../constants/urls.ts";

const userService = {
    getAll: (): IRes<IUser[]> => apiService.get(urls.users),
    getById: (_id: number): IRes<IUser> => apiService.get(urls.users + `/${_id}`)
};
export default userService;