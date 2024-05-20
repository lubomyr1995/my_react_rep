import {FC} from "react";

import {IComment} from "../../models/IComment.ts";

interface IProps {
    comment: IComment
}
const Comment:FC<IProps> = ({comment}) => {
    return (
        <div>
            <h3>{comment.id}. {comment.name}</h3>
            <h4>Email: {comment.email}</h4>
            <p>{comment.body}</p>
            <h6>postId: {comment.postId}</h6>
            <hr/>
        </div>
    );
};

export {Comment};