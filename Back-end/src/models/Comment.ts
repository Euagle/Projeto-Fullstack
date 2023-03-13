export class Comment {
    constructor(
        private id: string,
        private userId: string,
        private postId: string,
        private likes: number,
        private dislikes: number,
        private comment: string,
    ){}

    getId(): string{
        return this.id
    }

    setId(value: string):void {
        this.id = value
    }

    getUserId(): string{
        return this.userId
    }

    setUserId(value: string):void {
        this.userId = value
    }

    getPostId(): string{
        return this.postId
    }

    setPostId(value: string):void {
        this.postId = value
    }

    getComment(): string{
        return this.comment
    }

    setComment(value: string):void {
        this.comment = value
    }

    addLikes(){
        this.likes += 1
    }

    removeLikes(){
        this.likes -= 1
    }

    addDislikes(){
        this.dislikes += 1
    }

    removeDislikes(){
        this.dislikes -= 1
    }

    getDislikes(): number{
        return this.dislikes
    }

    setDislikes(value: number):void {
        this.dislikes = value
    }

    getLikes(): number{
        return this.likes
    }

    setLikes(value: number):void {
        this.likes = value
    }

}