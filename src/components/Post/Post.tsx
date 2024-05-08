import IPost from "../../models/IPost.ts";
import {FC} from "react";

interface IProps {
    post: IPost
}
const Post:FC<IProps> = ({post}) => {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
};

export {Post};