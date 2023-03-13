import { Post } from "../models/Post";
import { CommentDB, CommentWithCreatorDB, LikeorDislikeCommentDB, LikeorDislikeDB, TPosts } from "../models/types";
import { BaseDatabase } from "./BaseDataBase";


export class CommentDataBase extends BaseDatabase{

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"
     
    public async findGetCommentId(id: string){
        const [idExists]: CommentDB[] | undefined[] = await BaseDatabase
        .conection(CommentDataBase.TABLE_COMMENTS)
        .where({ id });

        return idExists
    }


    public async insertComment(newProduct: CommentDB){
        await BaseDatabase
        .conection(CommentDataBase.TABLE_COMMENTS)
        .insert(newProduct)
    }


    public async findGetComment(){
        const result: CommentDB[] = await BaseDatabase
        .conection(CommentDataBase.TABLE_COMMENTS)

        return result
    }


    public async findCommentId(idParams: string):Promise<CommentDB | undefined>{
        const comment: CommentDB[] = await BaseDatabase
       .conection(CommentDataBase.TABLE_COMMENTS).select()
       .where({ id: idParams })


    return comment[0]
    }


    public async findUpdateComment(updateComment: CommentDB, id: string):Promise<void>{
        await BaseDatabase
        .conection(CommentDataBase.TABLE_COMMENTS)
        .update(updateComment)
        .where({id: id})
    }
    


    public async deleteCommentId( deleteComment: string):Promise<void>{
        await BaseDatabase.conection(CommentDataBase.TABLE_COMMENTS)
        .delete()
        .where({id: deleteComment})
    }


    public likeOrDislikeComment = async (likeDislike: LikeorDislikeCommentDB): Promise<void> => {
        await BaseDatabase.conection(CommentDataBase.TABLE_LIKES_DISLIKES_COMMENTS)
        .insert(likeDislike)
    }

    public findCommentLikeOrDislike = async (commentId: string): Promise<CommentWithCreatorDB | undefined> => {
        const result: CommentWithCreatorDB[] = 
        await BaseDatabase.conection(CommentDataBase.TABLE_COMMENTS)
        .select(
            "comments.id",
            "comments.user_id",
            "comments.post_id",
            "comments.likes",
            "comments.dislikes",
            "comments.comment",
        )
        .join("users", "comments.user_id", "=", "users.id")
        .where("comments.id", commentId)

        
        return result[0]
    }

    public findLikeDislike = async (likeDislike: LikeorDislikeCommentDB): Promise<"já foi curtido" 
    | "já foi descurtido" | null> => {
        const [likesDislikeFind] : LikeorDislikeCommentDB[] = await BaseDatabase
        .conection(CommentDataBase.TABLE_LIKES_DISLIKES_COMMENTS)
        .select()
        .where({
            comment_id: likeDislike.comment_id,
            user_id: likeDislike.user_id,
            post_id: likeDislike.post_id
        })

        if(likesDislikeFind){
            return likesDislikeFind.like === 1 ? "já foi curtido" : "já foi descurtido"
        }else{
            return null
        }
    }

     public removeLikeDislike = async (likeDislike: LikeorDislikeCommentDB): Promise<void> => {
        await BaseDatabase.conection(CommentDataBase.TABLE_LIKES_DISLIKES_COMMENTS)
        .delete()
        .where({
            comment_id: likeDislike.comment_id,
            user_id: likeDislike.user_id,
            post_id: likeDislike.post_id
        })
    }

    public updateLikeDislike = async (likeDislike: LikeorDislikeCommentDB): Promise<void> => {
        await BaseDatabase.conection(CommentDataBase.TABLE_LIKES_DISLIKES_COMMENTS)
        .update(likeDislike)
        .where({
            comment_id: likeDislike.comment_id,
            user_id: likeDislike.user_id,
            post_id: likeDislike.post_id
        })
    }

        
    }