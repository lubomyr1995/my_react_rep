import {FC} from "react";
import {IPost} from "../../models/IPost.ts";

interface IProps {
    post: IPost
}

const Post: FC<IProps> = ({post}) => {
    return (
        <div>
            <h4>{post.id}. {post.title}</h4>
            <p>{post.body}</p>
            <h6>The post belongs to user with id: {post.userId}</h6>
            <hr/>
        </div>
    );
};

export {Post};