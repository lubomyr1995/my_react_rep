import {Posts} from "../../components/Posts/Posts.tsx";
import {useEffect, useState} from "react";
import {IPost} from "../../models/IPost.ts";
import postService from "../../services/post.service.ts";

const PostPage = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    useEffect(() => {
        postService.getAll().then(({data}) => setPosts(data))
    }, [])
    return (
        <div>
            {posts.length > 0 && <Posts posts={posts}/>}
        </div>
    );
};

export {PostPage};