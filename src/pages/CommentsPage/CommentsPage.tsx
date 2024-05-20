import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {IComment} from "../../models/IComment.ts";
import commentService from "../../services/comment.service.ts";
import {Comments} from "../../components/Comments/Comments.tsx";

const CommentsPage = () => {
    const {postId} = useParams<{ postId: string }>();
    const [comments, setComments] = useState<IComment[]>([]);
    useEffect(() => {
        if (postId) {
            commentService.getByPostId(postId).then(({data: comments}) => setComments(comments))
        }
    }, [postId])

    return (
        <div>
            {comments.length > 0 && <Comments comments={comments}/>}
        </div>
    );
};

export {CommentsPage};