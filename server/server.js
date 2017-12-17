const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT ||3000;
const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/utils');

app.use(express.static(publicPath));

io.on('connect',(socket) => {
    console.log('New User Connected');

    socket.emit("newMessage", generateMessage("Admin", " Welcome to the chat app."));

    socket.broadcast.emit('newMessage', generateMessage('Admin', ' New user joined the chat app.'));    

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback('This is confirmation from the server');
    });

    socket.on('createLocationMessage', (location) =>{
        io.emit('newLocationMessage', generateLocationMessage('User',location.latitude,location.longitude));
    });

});


server.listen(port, () => {
    console.log('Server is up on port:', port);
})