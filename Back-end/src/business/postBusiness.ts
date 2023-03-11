


import { PostDatabase } from "../database/postDataBase";
import { UserDatabase } from "../database/UserDatabase";
import { CreateCommentDTO, CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostInputDTO, GetPostOutputDTO, PostDTO } from "../dtos/postsDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post } from "../models/post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import {  UserDB, USER_ROLES } from "../types";




export class PostBusiness {
    constructor(
        private postDatabase : PostDatabase,
        private userDatabase : UserDatabase,
        private postDTO : PostDTO,
        private idGenerator : IdGenerator,
        private tokenManager: TokenManager
    ){}

    public async getPosts(input: GetPostInputDTO) : Promise<GetPostOutputDTO[]>{
        const { token } = input;

        const payload = this.tokenManager.getPayload(token);
        if (payload === null){
            console.log("testeando", payload)

            throw new BadRequestError("Token inválido");
            
        }

        const postsDB = await this.postDatabase.findPosts();
        const usersDB = await this.userDatabase.findUsers();

        const output = postsDB.map(postDB => {
            const post = new Post (
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                getCreator(postDB.creator_id)
            );

            return this.postDTO.getPostOutput(post);
        })             

        function getCreator(userId : string){
            const user = usersDB.find(userDB => userDB.id === userId) as UserDB;

            return {
                id: user.id,
                name: user.name
            }
        }

        return output;
    }
        // function getCreator(userId : string){
        //     const user = usersDB.find(userDB => userDB.id === userId) as UserDB;

        //     return{
        //         id: user.id,
        //         name: user.name
        //     }
        // }}
    
    //     function getCreator(creatorId: string){
    //         const creator = creatorsDB.find((creatorDB)=>{
    //             return creatorDB.id === creatorId
    //         })

    //         return{
    //             id: creator.id,
    //             name: creator.name
    //         }
    //     }

    //     return posts  
    // }


    
    public async createPost(input : CreatePostInputDTO) : Promise<void>{
        const { content , token } = input;

        const payload = this.tokenManager.getPayload(token);
        if (payload === null){
            throw new BadRequestError("Token inválido");
        }

        const id = this.idGenerator.generate();
        const createdAt = (new Date()).toISOString();
        const likes = 0;
        const dislikes = 0;

        const newPost = new Post (
            id,
            content,
            likes,
            dislikes,
            createdAt,
            createdAt,
            {
                id: payload.id, 
                name: payload.name
            }
        )

        
        const newPostDB = newPost.toDBModelBusiness()
        await this.postDatabase.createPost(newPostDB)

    //     }



    // public createComment = async(input:CreateCommentDTO)=>{

    //     const {id_post, content, token} = input

    //     if(typeof token !== "string"){
    //         throw new BadRequestError("'Token' deve ser string!")
    //     }

    //     const payload = this.tokenManager.getPayload(token)

    //     if (payload === null){
    //         throw new BadRequestError("'Token' inválido!")
    //     }

    //     const filterPost = await this.postDatabase.findPostId(id_post)

    //     if(!filterPost){
    //         throw new BadRequestError("'Post' não encontrado")
    //     }

    //     const id = this.idGenerator.generate()
    //     const created_at = (new Date()).toISOString()
    //     const updated_at = (new Date()).toISOString()
    //     const comments = 0
    //     const likes = 0
    //     const dislikes = 0
    //     const creator_id = payload.id

    //     if (content !== undefined){
    //         if(typeof content !== "string"){
    //             throw new BadRequestError("'content' precisa ser uma string")
    //         }
    //     }
    //     const newComment = new Post (
    //         id,
    //         content,
    //         comments,
    //         likes,
    //         dislikes,
    //         created_at,
    //         updated_at,
    //         {id:creator_id,
    //         name: payload.name,},
    //         {id: '',
    //         content: '',
    //         likes: 0,
    //         dislikes: 0,
    //         created_at: '',
    //         updated_at: '',
    //         post_id: filterPost.id,
    //         creator:{
    //             creator_id: '',
    //             name: '',
    //         }
    //         }
    //         )
        
    //     const postToUpdate = new Post(
    //         filterPost.id,
    //         filterPost.content,
    //         filterPost.comments+1,
    //         filterPost.likes,
    //         filterPost.dislikes,
    //         filterPost.created_at,
    //         filterPost.updated_at,
    //         {
    //             id:filterPost.creator_id,
    //             name: ''
    //         },
    //         {id: '',
    //         content: '',
    //         likes: 0,
    //         dislikes: 0,
    //         created_at: '',
    //         updated_at: '',
    //         post_id: '',
    //         creator:{
    //             creator_id: '',
    //             name: '',
    //         }
    //         }
    //     )

    //     const newCommentDB = newComment.toDBCommentBusiness()
    //     await this.postDatabase.CreateComment(newCommentDB)
    //     const editPostDB = postToUpdate.toDBModelBusiness()
    //     await this.postDatabase.edittePost(editPostDB,filterPost.id)

    //     const output = {
    //         message: "Publicação realizada com sucesso",
    //     }

    //     return output
    // }

    // public async editPost(input : EditPostInputDTO) : Promise<void>{
        
    //     const { content , id , token } = input;


    //     const postDB = await this.postDatabase.findPostId(id);
    //     if (!postDB){
    //         throw new NotFoundError("Não foi encontrado um post com esse id");
    //     }
    //     const payload = this.tokenManager.getPayload(token);
    //     if (payload === null){
    //         throw new BadRequestError("Token inválido");
    //     }

    //     if (payload.id !== postDB.creator_id){
    //         throw new ForbiddenError("Somente quem criou o post pode editá-lo");
    //     }

    //     const updatedAt = (new Date()).toISOString();

    //     const editPost = new Post(
    //         id,
    //         content,
    //         filterPost.comments,
    //         filterPost.likes,
    //         filterPost.dislikes,
    //         filterPost.created_at,
    //         updateAt,
    //         {
    //             id:filterPost.creator_id,
    //             name: payload.name
    //         },
    //         {id: '',
    //         content: '',
    //         likes: 0,
    //         dislikes: 0,
    //         created_at: '',
    //         updated_at: '',
    //         post_id: '',
    //         creator:{
    //             creator_id: '',
    //             name: '',
    //         }

    //     const updatedPosts = editPost.toDBModelBusiness()
    //     await this.postDatabase.edittePost(updatedPosts, id)
    // }
   
        }
    public async editPost(input : EditPostInputDTO) : Promise<void>{
        
        const { content , id , token } = input;


        const postDB = await this.postDatabase.findPostId(id);
        if (!postDB){
            throw new NotFoundError("Não foi encontrado um post com esse id");
        }
        const payload = this.tokenManager.getPayload(token);
        if (payload === null){
            throw new BadRequestError("Token inválido");
        }

        if (payload.id !== postDB.creator_id){
            throw new ForbiddenError("Somente quem criou o post pode editá-lo");
        }

        const updatedAt = (new Date()).toISOString();

        const updatedPost = new Post(
            id,
            content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            updatedAt,
            {
                id: postDB.creator_id,
                name: ""
            }
        )

        const updatedPosts = updatedPost.toDBModelBusiness();
        await this.postDatabase.edittePost(updatedPosts, id);
    }

    public deletPost = async (
        input: DeletePostInputDTO
    ): Promise<void> => {
        const { id, token } = input

        if (token === undefined) {
            throw new BadRequestError("token ausent")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const postsDB = await this.postDatabase.findPostId(id)

        if (postsDB === null) {
            throw new NotFoundError("'id' não encontrado")
        }

        const creatorId = payload.id

        if(  postsDB.creator_id !==creatorId ){
            throw new BadRequestError("somente quem criou o post pode deletá-lo")

        }

        if (
            payload.role !== USER_ROLES.ADMIN
        ) {
            throw new BadRequestError("somente admin pode delete o post")
        }

        await this.postDatabase.deletePost(id)
    }

    


}
