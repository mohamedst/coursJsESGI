import http from 'http';
import socketIO from 'socket.io';

const players = [];
const config = { turn: 0 };
const server = http.createServer((req, res) => {
    res.write('hello world');
    res.end();
});

const io = socketIO(server, {
    pingTimeout: 60000,
});

io.on('connection', socket => {
    if (players.length >= 2){
        console.log('connexion refusée')
        return
    }
    let user = socket.handshake.query.name;
    let userId = Math.floor(Math.random()*(5000-1000+1)+1000);
    user = user + '-' + userId;
    let player = {
        name : user,
        socket : socket,
        pokemon : null }
    players.push(player);
    console.log(user + ' is connected');

    socket.emit('connected', 'test emit');

    socket.on('disconnect', () => {
        console.log(user + ' has disconnected');
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
