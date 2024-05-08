import {FC, useEffect, useState} from "react";
import IPost from "../../models/IPost.ts";
import {Post} from "../Post/Post.tsx";
import {usersService} from "../../services/users.service.ts";

interface IProps {
    userId: number
}

type IPropsType = IProps;
const Posts: FC<IPropsType> = ({userId}) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    useEffect(() => {
        usersService.getPostsByUserId(userId).then(({data: {posts}}) => {
            setPosts(posts);
        })
    }, [userId]);
    return (
        <div>
            {posts.length > 0 && posts.map(post => <Post key={post.id} post={post}/>)}
        </div>
    );
};

export {Posts};