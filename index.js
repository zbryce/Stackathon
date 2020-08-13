const express = require('express');
const app = express();
const path = require('path');
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin, getUser } = require('./utils/users')
const server = http.createServer(app)
const io = socketio(server)
//we have room functionality with socketio
const bot = 'ChatBot'

app.use(express.static(path.join(__dirname, 'public')))

//runs when client connects
io.on('connection', socket => {
    socket.on('joinRoom', (username, room) => {

        const user = userJoin(socket.id, username, room)
        //join room functionality
        socket.join(user.username.room)
        //.emit emits just to the single user who connected
        socket.emit('new', formatMessage(bot, 'Welcome to the Network!'))
   
        //broadcasts to everyone but the user
        socket.broadcast.to(user.username.room).emit('chatMessage', formatMessage(bot, `${username} joined the room`))
    })
     

    //send to everyone
    // io.emit()
    
    //when user disconnects 
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(bot,'user has left the room'))
    })
    //listen for click emission from client
    socket.on('chatMessage', (message) => {
        socket.emit('solo', message)
        socket.broadcast.emit(formatMessage('USER', message))
    })
})

const PORT = 8000
server.listen(PORT, () =>{
    console.info(`Server listening on port ${PORT}`);
})