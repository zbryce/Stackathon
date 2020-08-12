const express = require('express');
const app = express();
const path = require('path');
const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))
//runs when client connects
io.on('connection', socket => {
    //.emit emits just to the single user who connected
    socket.emit('message', 'Through hyperspace')
    //broadcasts to everyone but the user
    socket.broadcast.emit('message', 'a user has joined the network')
    //send to everyone
    
    // io.emit()
    
    //when user disconnects 
    socket.on('disconnect', () => {
        io.emit('message', 'user has left the station')
    })
})

const PORT = 8000
server.listen(PORT, () =>{
    console.info(`Server listening on port ${PORT}`);
})