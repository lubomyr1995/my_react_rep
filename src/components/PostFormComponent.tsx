import {useForm} from "react-hook-form";
import {FC, useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";

import {postValidator} from "../validators/post.validator.ts";
import {IPost} from "../models/IPost.ts";
import postsService from "../services/posts.service.ts";


const PostFormComponent: FC = () => {
    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<IPost>({
        mode: "all",
        resolver: joiResolver(postValidator)
    });

    const [post, setPost] = useState<IPost | null>(null);

    function savePost(post: IPost) {
        postsService.create(post).then(({data}) => {
            setPost(data)
            reset()
        }).catch((error) => {
            console.error('While saving post occurred some error :', error);
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(savePost)}>
                {/*userId input*/}
                <div>
                    <label htmlFor="userId">User ID:
                        <input type="text" id="userId" {...register("userId")}/>
                    </label>
                </div>
                {errors.userId && <span>{errors.userId.message}</span>}

                {/*title input*/}
                <div>
                    <label htmlFor="title">Title:
                        <input type="text" id="title" {...register("title")}/>
                    </label>
                </div>
                {errors.title && <span>{errors.title.message}</span>}

                {/*body input*/}
                <div>
                    <label htmlFor="title">Body:
                        <input type="text" id="body" {...register("body")}/>
                    </label>
                </div>
                {errors.body && <span>{errors.body.message}</span>}

                <div>
                    <button type="submit" disabled={!isValid}>Add Post</button>
                </div>
            </form>
            {post && <h5>created post {post.id}</h5>}
        </div>
    );
};

export {PostFormComponent};