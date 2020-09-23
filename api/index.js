import http from 'http';
import socketIO from 'socket.io';

const server = http.createServer((req, res) => {
    res.write('hello world');
    res.end();
});

const io = socketIO(server, {
    pingTimeout: 60000,
});

io.on('connection', socket => {
    let user = socket.handshake.query.name;
    let userId = Math.floor(Math.random()*(5000-1000+1)+1000);
    console.log(user + '-' + userId + ' is connected');

    socket.emit('connected', 'test emit');

    socket.on('disconnect', () => {
        console.log(user + '-' + userId + ' has disconnected');
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
