import {FC, useEffect, useState} from "react";

import {IPost} from "../../models/IPost.ts";
import postService from "../../services/post.service.ts";
import {Post} from "../Post/Post.tsx";

const Posts: FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    useEffect(() => {
        postService.getAll().then(({data: posts}) => setPosts(posts))
    }, [])
    return (
        <>
            {posts.length > 0 && posts.map(post => <Post key={post.id} post={post}/>)}
        </>
    );
};

export {Posts};