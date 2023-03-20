import express from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentController } from "../controller/CommentController"
import { CommentDataBase } from "../database/CommentDataBase"
import { PostDataBase } from "../database/PostDataBase"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"

export const commentRouter = express.Router()

const commentController = new CommentController(
    new CommentBusiness(
        new CommentDataBase(),
        new PostDataBase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)


commentRouter.post("/:id", commentController.createComment)

commentRouter.get("/", commentController.getComment)

commentRouter.put("/:id", commentController.updateComment)

commentRouter.delete("/:id", commentController.deleteComment)

commentRouter.put("/:id/like", commentController.updateCommentId)

