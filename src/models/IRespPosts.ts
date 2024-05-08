import IPost from "./IPost.ts";

interface IRespPosts {
    posts: IPost[],
    total: number,
    skip: number,
    limit: number
}

export default IRespPosts;