import apiService, {IRes} from "./api.service.ts";
import {IPost} from "../models/IPost.ts";

const postsService = {
    create: (post: IPost): IRes<IPost> => apiService.post('/posts', post)
};

export default postsService;