//node Server Entry point. which willl handle socket.i
const express = require('Express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log('listening at port ' + PORT)
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));



io.on('connection', (socket) => {
    console.log('client is connected ' + socket.id);
});







// //node Server Entry point. which willl handle socket.i

// const io = require('socket.io')(9000);
// const users = {};
// io.on('connection', socket => {
//     socket.on('new-user-joined', name => {

//         // console.log('new user', name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);

//     });
//     socket.on('send', message => {
//         socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
//     })
//     socket.on('disconnect', message => {
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     })
// });