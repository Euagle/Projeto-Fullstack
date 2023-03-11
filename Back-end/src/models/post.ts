import { Comment, CommentCreator, postModel, TPostsDB, UserModel } from "../types"

export class Post {
    constructor(
        private id: string,
        private content: string,
        // private comments: number,
        private likes: number,
        private dislikes: number,
        private created_at: string,
        private updated_at: string,
        private creator: {
            id: string,
            name: string,
        },
        // private comments_post: CommentCreator,
    ){}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }
    // public getComments(): number {
    //     return this.comments
    // }

    // public setComments(value: number): void {
    //     this.comments = value
    // }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }
    public addLike() {
        this.likes += 1
    }

    public removeLike() {
        this.likes -= 1
    }

    public addDislike() {
        this.dislikes += 1
    }

    public removeDislike() {
        this.dislikes -= 1
    }


    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getCreatedAt():string{
        return this.created_at
    }

    public setCreatedAt(value:string){
        this.created_at = value
    }

    public getUpdatedAt():string{
        return this.updated_at
    }

    public setUpdatedAt(value:string){
        this.updated_at = value
    }

    public getCreator():{
        id: string,
        name: string,
    }{
        return this.creator
    }

    public setCreator(value:{
        id: string,
        name: string,
    }){
        this.creator = value
    }

    public toDBModelBusiness(): TPostsDB{
        return {
            id:this.id,
            creator_id: this.creator.id,
            // comments: this.comments,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at,        
        }
    }

    // public toDBCommentBusiness(): Comment{
    //     return {
    //         id:this.id,
    //         creator_id: this.creator.id,
    //         // post_id: this.comments_post.post_id,
    //         content: this.content,
    //         likes: this.likes,
    //         dislikes: this.dislikes,
    //         created_at: this.created_at,
    //         updated_at: this.updated_at,        
    //     }
    // }

}

    // public toDBModelBusiness() : TPostsDB {
    //     return {
    //         id: this.id,
    //         content: this.content,
    //         likes: this.likes,
    //         dislikes: this.dislikes,
    //         created_at: this.createdAt,
    //         updated_at: this.updatedAt,
    //         creator_id: this.creator.id
    //     }
//     }
// }

