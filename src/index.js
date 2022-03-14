const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const express = require('express')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname , '../public')

app.use(express.static(publicDirPath))


io.on('connection' , (socket) =>{
    console.log('Connection done');

    socket.emit('message' , 'welcome')

    socket.on('sendMessage', (msg) =>{
        io.emit('message', msg)
    })
})


server.listen(port , ()=>{
    console.log(`Server is running at ${port}!`);
})