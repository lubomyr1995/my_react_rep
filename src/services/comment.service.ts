import {IRes} from "../types/resType.ts";
import {IComment} from "../models/IComment.ts";
import {apiService} from "./api.service.ts";
import {urls} from "../constants/urls.ts";

const commentService = {
    getAll: (): IRes<IComment[]> => apiService.get(urls.comments),
    getByPostId: (postId: string): IRes<IComment[]> => apiService.get(`${urls.posts}/${postId}/${urls.comments}`)
}

export default commentService;