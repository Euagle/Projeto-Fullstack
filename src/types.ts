export enum USER_ROLES {
    NORMAL = "Normal",
    ADMIN = "Admin"
}

export interface TokenPayload {
    id: string,
    nick_name: string,
    role: USER_ROLES
}
export type TUser = {
    id: string,
    nick_name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export type TPosts = {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string,
}

export type TPostsLike = {
    likes: number,
    dislikes: number,
}

export interface GetPostDB {
    id:string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string
    updatedAt: string,
    creator: {
        id: string,
        name: string
}
}

export interface LikeorDislikeDB {
    user_id: string,
    post_id: string,
    like: number
}


export interface CommentDB  {
    id: string,
    user_id: string,
    post_id: string,
    likes: number,
    dislikes: number,
    comment: string,
}

export interface LikeorDislikeCommentDB {
    comment_id: string
    user_id: string,
    post_id: string,
    like: number
}

export interface CommentWithCreatorDB extends CommentDB {
    creator_nick_name: string
}


