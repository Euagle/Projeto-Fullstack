import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { CreateCommentDTO, DeleteCommentInputDTO, EditCommentInputDTO, GetCommentInputDTO, LikeOrDislikeCommentDTO} from "../dto/userDTO";
import { BaseError } from "../errors/BaseErrors";


export class CommentController {
    constructor(
        private commentBusiness : CommentBusiness
    ){}
    public createComment =  async (req: Request, res: Response) => {
        try {
            
            const input : CreateCommentDTO =  {
                token: req.headers.authorization,
                comment: req.body.comment,
                idPost: req.params.id
            }

            
            await this.commentBusiness.createComment(input)
          
            res.status(201).end()
    
        } catch (error: any) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public getComment = async (req: Request, res: Response) => {
        try {
            const input : GetCommentInputDTO = {
                token: req.headers.authorization
            }
    
            const output   = await this.commentBusiness.getComment(input)
    
            res.status(200).send(output)
        }
        catch (error: any) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public updateComment = async (req: Request, res: Response) => {
        try {
            
            
            const input : EditCommentInputDTO =  {
                idParams: req.params.id,
                comment: req.body.comment,
                token: req.headers.authorization
            }

          
            await this.commentBusiness.updateComment(input)
          

            res.status(200).end()
            } 
            catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public deleteComment = async (req: Request, res: Response) => {
        try {

            const input : DeleteCommentInputDTO = {
                id: req.params.id,
                token: req.headers.authorization
            }
            
            await this.commentBusiness.deleteComment(input)
           
            res.status(200).end()
    
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public updateCommentId = async (req: Request, res: Response) => {
        try {
            

            const input : LikeOrDislikeCommentDTO = {
                idLikeOrDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }

          
            await this.commentBusiness.updateCommentId(input)
    
            res.status(200).end()
            
            }catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }
}