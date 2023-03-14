import { CommentDataBase } from "../database/CommentDataBase";
import { PostDataBase } from "../database/PostDataBase";
import { UserDataBase } from "../database/UserDataBase";
import { CreateCommentDTO, DeleteCommentInputDTO, EditCommentInputDTO, GetPostInputDTO, LikeOrDislikeCommentDTO } from "../dto/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { TPosts,  LikeorDislikeDB, CommentDB, LikeorDislikeCommentDB } from "../models/types";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentBusiness{
    constructor(
        private commentDataBase: CommentDataBase,
        private postDataBase: PostDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}
    public createComment = async (input: CreateCommentDTO): Promise<void>=>{
        const { token, comment, idPost } = input;
            
        if(token === undefined){
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)
        

        if(payload === null){
            throw new BadRequestError("token inválido")
        }

        if (comment !== undefined) {

            if (typeof comment !== "string") {
    
                throw new BadRequestError("'comment' deve ser string")
                }
            }

        const postId = await this.postDataBase.findPostId(idPost)
        

        if(postId === null){
            throw new BadRequestError("id inválido")
        }

        const comentario = comment as string 

        const commentInstance = new Comment(
            this.idGenerator.generate(),
            payload.id,
            idPost,
            0,
            0,
            comentario     
        )

        
        const newProduct: CommentDB = {
            id: commentInstance.getId(),
            user_id: commentInstance.getUserId(),
            post_id: commentInstance.getPostId(),
            likes: commentInstance.getLikes(),
            dislikes: commentInstance.getDislikes(),
            comment: commentInstance.getComment(),
        }

       await this.commentDataBase.insertComment(newProduct)

       
    }

    public getComment = async (input: GetPostInputDTO) =>{

        const { token } = input

        if(token === undefined){
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token inválido")
        }

    
        const resultComment = await this.commentDataBase.findGetComment()

        const userDataBase = new UserDataBase()

        const resultUsers = await userDataBase.findGetUsers()


        const resultPost = resultComment.map((item)=>{
            return {
                id: item.id,
                user_id: item.user_id,
                post_id: item.post_id,
                likes: item.likes,
                dislikes: item.dislikes,
                comment: item.comment  

            }
        })

       
        return ({Comment: resultPost})
    }

    public updateComment = async (input: EditCommentInputDTO ):Promise<void>=>{
       
    
        const { idParams, comment, token } = input 


        if(token === undefined){
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token inválido")
        }
       

        if (comment !== undefined) {

            if (typeof comment !== "string") {
                throw new BadRequestError("'content' deve ser string")
            }

            if (comment.length < 1) {
                throw new BadRequestError("'description' deve possuir no mínimo 1 caractere")
            }
        }

       
        const comentario = await this.commentDataBase.findCommentId(idParams)
       

        if (!comentario) {
        throw new BadRequestError("'id' não encontrada")
        }
        
        if(comentario.user_id !== payload.id){
        throw new BadRequestError("somente quem criou o comentário, pode editar")

    
        
        }else {
       

            const commentInstance = new Comment(
               comentario.id,
               comentario.user_id,
               comentario.post_id,
               comentario.likes,
               comentario.dislikes,
               comentario.comment,
            )



            const updatePosts: CommentDB  = {
                id: commentInstance.getId(),
                user_id:  commentInstance.getUserId(),
                post_id: commentInstance.getPostId(),
                likes:  commentInstance.getLikes(),
                dislikes: commentInstance.getDislikes(),
                comment: comment || commentInstance.getComment(),
            }
        
        

        await this.commentDataBase.findUpdateComment(updatePosts, idParams)


    }}

    public deleteComment = async (input: DeleteCommentInputDTO): Promise<void>=>{

        const { id, token } = input
     

        if(token === undefined){
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token inválido")
        }
       
        const comentario = await this.commentDataBase.findCommentId(id)


        if (!comentario) {
            throw new BadRequestError("id não encontrada")
        }

        const deleteComment = new Comment(
            comentario.id,
            comentario.user_id,
            comentario.post_id,
            comentario.likes,
            comentario.dislikes,
            comentario.comment
        )

        await this.commentDataBase.deleteCommentId(deleteComment.getId())

    }

    public updateCommentId = async (input: LikeOrDislikeCommentDTO):Promise<void>=>{
        
        const { idLikeOrDislike, token, like } = input

        
        if(token === undefined){
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token inválido")
        }
           
    
        if (like !== undefined) {

            if (typeof like !== "boolean") {
                throw new BadRequestError("'like' deve ser boolean")
            }
        }
        
        const comment = await this.commentDataBase.findCommentLikeOrDislike(idLikeOrDislike)

        if(!comment){
            throw new NotFoundError("id não encontrada")
        }

      
        const creatorId = payload.id
        const likeSQL = like ? 1 : 0


        const likeOrDislike : LikeorDislikeCommentDB = {
            comment_id: comment.id,
            user_id: creatorId,
            post_id: comment.post_id,
            like: likeSQL
        }

        const commentLikeDis = new Comment(
            comment.id,
            comment.user_id,
            comment.post_id,
            comment.likes,
            comment.dislikes,
            comment.comment
        ) 

        

        const likeDislikeExist = await this.commentDataBase.findLikeDislike(likeOrDislike)

        if(likeDislikeExist === "já foi curtido"){
            if(like) {
                await this.postDataBase.removeLikeDislike(likeOrDislike)
                commentLikeDis.removeLikes()
            }else{
                await this.commentDataBase.updateLikeDislike(likeOrDislike)
                commentLikeDis.removeLikes()
                commentLikeDis.addDislikes()
            }

        }else if(likeDislikeExist === "já foi descurtido"){
            if(like) {
                await this.commentDataBase.removeLikeDislike(likeOrDislike)
                commentLikeDis.removeDislikes()
                commentLikeDis.addLikes()
            }else{
                await this.commentDataBase.updateLikeDislike(likeOrDislike)
                commentLikeDis.removeDislikes()
            }
        }else{

        await this.commentDataBase.likeOrDislikeComment(likeOrDislike)   

        if(like){
            commentLikeDis.addLikes()
        }else if(!like ){
            commentLikeDis.addDislikes()
        }
        // like ? commentLikeDis.addLikes() : commentLikeDis.addDislikes()
        }
        
        const updatecomments  = {
            id: commentLikeDis.getId(),
            user_id:  commentLikeDis.getUserId(),
            post_id:  commentLikeDis.getPostId(),
            likes: commentLikeDis.getLikes(),
            dislikes: commentLikeDis.getDislikes(),
            comment: commentLikeDis.getComment(),
        }
        
        
        await this.commentDataBase.findUpdateComment(updatecomments, idLikeOrDislike)
    }
    }
