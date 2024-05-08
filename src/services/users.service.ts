import apiService, {IRes} from "./api.service.ts";
import IRespPosts from "../models/IRespPosts.ts";
import IRespUsers from "../models/IRespUsers.ts";

const usersService = {
    getAll: (): IRes<IRespUsers> => apiService.get('/users'),
    getPostsByUserId: (userId: number): IRes<IRespPosts> => apiService.get(`/posts/user/${userId}`)
};

export {usersService}