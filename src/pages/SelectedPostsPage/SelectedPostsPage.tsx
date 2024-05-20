import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Posts} from "../../components/Posts/Posts.tsx";
import {IPost} from "../../models/IPost.ts";
import postService from "../../services/post.service.ts";

const SelectedPostsPage: FC = () => {
    const {userId} = useParams<{ userId: string }>();
    // const location = useLocation(); // щоб відловитити state by location in User.tsx
    const [posts, setPosts] = useState<IPost[]>([]);
    useEffect(() => {
        if (userId) {
            postService.getPostsByUserId(userId).then(({data: posts}) => setPosts(posts))
        }
    }, [userId])
    return (
        <div>
            {posts.length > 0 && <Posts posts={posts}/>}
        </div>
    );
};

export {SelectedPostsPage};