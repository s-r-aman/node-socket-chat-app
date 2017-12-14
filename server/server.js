const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT ||3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connect',(socket) => {
    console.log('New User Connected');

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            timeStamp: new Date().getTime()
        });
    });
});


server.listen(port, () => {
    console.log('Server is up on port:', port);
})