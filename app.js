const express = require('express');
const socket = require('socket.io');
const port = 80;


// App Setup
const app = express();
const server = app.listen(port, () => {
    console.log(`Listening to request on port ${port}`);
})

// Static files
app.use(express.static('public'));


// Socket.IO
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Socket connection:', socket.id);

    socket.on('coordinates', (data) => {
       //  console.log('x: ', data.x, 'y: ', data.y, 'isOut:', data.isOut);
        socket.broadcast.emit('coordinates-broadcast', data);
    });

});