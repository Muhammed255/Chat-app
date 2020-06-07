var express = require('express');
var socket = require('socket.io');

const app = express();

const PORT = 3000;

var server = app.listen(PORT, () => {
    console.log(`app Listening to port ${PORT}`);
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket) {

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});