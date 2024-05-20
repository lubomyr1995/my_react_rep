import {IRes} from "../types/resType.ts";
import {IPost} from "../models/IPost.ts";
import {apiService} from "./api.service.ts";
import {urls} from "../constants/urls.ts";

const postService = {
    getAll: (): IRes<IPost[]> => apiService.get(urls.posts),
    getPostsByUserId: (userId: string): IRes<IPost[]> => apiService.get(`${urls.users}/${userId}${urls.posts}`)
};

export default postService;