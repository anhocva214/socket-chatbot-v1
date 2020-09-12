var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('chat message',  "Cao thủ xuất hiện")
    socket.broadcast.emit('hi');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message',  msg);
    });
})


http.listen(4000, () => {
    console.log('listening on *:4000');
});