import { GetPostDB } from "../models/types"

export interface SignupInputDTO {
    name: string,
    email: string,
    password: string
}


export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}

export interface GetPostInputDTO {
    token: string | undefined
}

export type GetPostOutputDTO = GetPostDB[]

export interface CreatePostDTO {
    token: string | undefined
    content: unknown
}

export interface EditPostInputDTO {
    idParams: string,
    token: string | undefined,
    content: string
}

export interface DeletePostInputDTO {
    id: string,
    token: string | undefined
}

export interface LikeOrDislikeDTO {
    idLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}


export interface GetCommentInputDTO {
    token: string | undefined
}

export type GetCommentOutputDTO = GetPostDB[]

export interface CreateCommentDTO {
    token: string | undefined
    comment: unknown
    idPost: string
}

export interface EditCommentInputDTO {
    idParams: string,
    token: string | undefined,
    comment: string
}

export interface DeleteCommentInputDTO {
    id: string,
    token: string | undefined
}

export interface LikeOrDislikeCommentDTO {
    idLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}


export interface GetPostCommentInputDTO {
    token: string | undefined
    idPost: string
}

      
