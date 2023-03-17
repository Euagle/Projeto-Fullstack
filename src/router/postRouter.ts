import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDataBase } from "../database/postDataBase"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDataBase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)


postRouter.post("/", postController.createPost)

postRouter.get("/", postController.getPost)

postRouter.put("/:id", postController.updatePost)

postRouter.delete("/:id", postController.deletePost)

postRouter.put("/:id/like", postController.updatePostId)

postRouter.get("/commentId", postController.getPostComment)