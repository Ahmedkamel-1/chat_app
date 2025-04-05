import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/connection.js'
import authRouter from './route/authUser.js'
import messageRouter from './route/message.router.js'
import userRouter from './route/user.router.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import {app , server} from './Socket/socket.js'

const __dirname = path.resolve()

dotenv.config()
app.use(express.json())
app.use(cookieParser())


// const whitelist = ["http://localhost:5174"]

// app.use((req,res,next)=>{
//     console.log(req.header("origin"))
//     if(!whitelist.includes(req.header("origin"))){
//         return next(new Error("Blocked by CORS!"))
//     }
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Headers", "*")
//     res.setHeader("Access-Control-Allow-Methods","*")
//     res.setHeader("Access-Control-Allow-Private-Network",true)
//     return next()
// })

// auth
app.use('/api/auth' , authRouter)


// message
app.use('/api/message' , messageRouter)

// user
app.use('/api/user' , userRouter)

//app.use(express.static(path.join(__dirname, "/Front/tailwindcss4/dist")))

// app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname,"Front","tailwindcss4","dist","index.html"))
// })


app.get('/' , (req,res)=>{
    res.send("Server is working!")
})

const PORT = process.env.PORT || 300

server.listen(PORT, () => {
    connectDB()
    console.log(`Chat app listening on port ${PORT}!`)
})