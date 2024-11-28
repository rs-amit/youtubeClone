import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes imports
import userRouter from "./routes/user.routes.js"
import subscribeRouter from "./routes/subscribe.routes.js"


//routes declearation
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscribe", subscribeRouter)

export {app}
