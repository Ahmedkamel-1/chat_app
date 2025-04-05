import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
const io = new Server({
    cors: {
        origin:['http://localhost:5174/'],
        methods:["GET","POST"]
    }
})

export const getRecieverSocketid = (recieverid) => {
    return userSocketmap[recieverid]
}


const userSocketmap = {}  //userid,socketid
io.on('connection', (socket) => {
    const userid = socket.handshake.query.userid
    if(userid !== "undefined") userSocketmap[userid] = socket.id
    io.emit("getOnlineUsers" , Object.keys(userSocketmap))
    socket.on('disconnect' , ()=>{
        delete userSocketmap[userid]
        io.emit('getOnlineUsers', Object.keys(userSocketmap))
    })
})

export {app, io , server}