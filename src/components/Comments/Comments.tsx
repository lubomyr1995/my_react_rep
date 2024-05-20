import {FC} from "react";

import {IComment} from "../../models/IComment.ts";
import {Comment} from "../Comment/Comment.tsx";

interface IProps {
    comments: IComment[]
}
const Comments:FC<IProps> = ({comments}) => {
    return (
        <div>
            {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </div>
    );
};

export {Comments};