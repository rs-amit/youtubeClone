import dotenv from "dotenv"
import connectDB from "./db/index.js"
dotenv.config({
    path: "./.env"
})


import {app} from "./app.js"


const PORT = process.env.PORT || 3000

connectDB()
.then(()=>{app.listen(PORT, ()=>{console.log(`Server running at port: ${PORT}`)})})
.catch((error)=>{console.log(`mongoDb connection failed !!! ${error}`)})


