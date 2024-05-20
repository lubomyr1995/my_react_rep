import {FC} from "react";

import {IPost} from "../../models/IPost.ts";
import {Post} from "../Post/Post.tsx";

interface IProps {
    posts: IPost[];
}

const Posts: FC<IProps> = ({posts}) => {
    return (
        <>
            {posts.map(post => <Post key={post.id} post={post}/>)}
        </>
    );
};

export {Posts};