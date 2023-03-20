import express, { Request, Response } from "express"
import cors from "cors"

import { userRouter } from "./router/userRouter";
import { postRouter } from "./router/postRouter";
import dotenv from "dotenv"
import { commentRouter } from "./router/commentRouter";



dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})


app.use("/users", userRouter)

app.use("/posts", postRouter)

app.use("/comments", commentRouter)

