import {FC} from "react";
import {useNavigate} from "react-router-dom";

import {IPost} from "../../models/IPost.ts";

interface IProps {
    post: IPost
}

const Post: FC<IProps> = ({post}) => {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/comments/${post.id}`)
    }

    return (
        <div>
            <h4>{post.id}. {post.title}</h4>
            <p>{post.body}</p>
            <h6>The post belongs to user with id: {post.userId}</h6>
            <button onClick={handleClick}>show comments</button>
            <hr/>
        </div>
    );
};

export {Post};