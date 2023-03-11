import { Comment, TPostsDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts";
    public static TABLE_USERS = "users";
    public static TABLE_COMMENTS = "comments";




    public async findPosts(){
        const result : TPostsDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS);
        return result;
    }

    public async findPostId(id : string){
        const [ result ] : TPostsDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id });
        return result;
    }

    public getAllPosts = async () => {
        const postDB = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()

        return postDB
    }
    public async createPost(newPostDB : TPostsDB){
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB);
    }
    public PostCreator = async()=>{
        const postsDB = await this.getAllPosts()
        const creatorsDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return{
            postsDB,
            creatorsDB,
        }
    }

    public async edittePost(updatedPostDB : TPostsDB, id : string){
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(updatedPostDB)
            .where({ id })
    }

    public async deletePost(id : string){
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .del()
            .where({ id });
    }
    public getPostComments = async(id:string)=>{
        const posts = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select().where({id:id})

        const creators = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        const comments = await BaseDatabase
        .connection(PostDatabase.TABLE_COMMENTS)
        .select("comments_posts.*","users.username")
        .leftJoin(PostDatabase.TABLE_USERS,"users.id","=","comments_posts.creator_id")

        return{
            posts,
            creators,
            comments,
        }
    }
    
    public CreateComment = async(newPost:Comment)=>{
        await BaseDatabase.connection(PostDatabase.TABLE_COMMENTS)
        .insert(newPost)
    }
  
    public EditComment = async(editPost:TPostsDB,id:string)=>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_COMMENTS)
        .update(editPost)
        .where({id:id})
    }
    public deleteCommentsId = async(id:string)=>{
        await BaseDatabase
        .connection(PostDatabase.TABLE_COMMENTS)
        .del()
        .where({post_id:id})
    }

}



