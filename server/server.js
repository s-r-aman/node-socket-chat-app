const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT ||3000;
const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage} = require('./utils/utils');

app.use(express.static(publicPath));

io.on('connect',(socket) => {
    console.log('New User Connected');

    socket.emit("newMessage", generateMessage("Admin", " Welcome to the chat app."));

    socket.broadcast.emit('newMessage', generateMessage('Admin', ' New user joined the chat app.'));    

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage',generateMessage(message.from, message.text));
    });
});


server.listen(port, () => {
    console.log('Server is up on port:', port);
})