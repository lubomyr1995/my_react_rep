import {FC, useEffect, useState} from "react";

import commentService from "../../services/comment.service.ts";
import {IComment} from "../../models/IComment.ts";
import {Comments} from "../../components/Comments/Comments.tsx";

const AllCommentPage: FC = () => {
    const [comments, setComments] = useState<IComment[]>([]);
    useEffect(() => {
        commentService.getAll().then(({data: comments}) => setComments(comments))
    }, [])
    return (
        <div>
            {comments.length > 0 && <Comments comments={comments}/>}
        </div>
    );
};

export {AllCommentPage};