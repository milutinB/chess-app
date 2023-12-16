import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app: express.Application = express();
const server = createServer(app);
const io = new Server(server);

const PORT: number = 3000;

app.use(express.static('client/build'));

function generateCode(): string {
    let output = '';
    for (let i = 0 ; i < 4; ++i) {
        if (Math.random() > 0.5)
            output += String.fromCharCode(97 + Math.floor(Math.random()*26));
        else
            output += (Math.floor(Math.random()*10)).toString();
    }
    return output;
}

type EmptyObj = Record<PropertyKey, never>;

let rooms: Map<string, number>= new Map();
let codes: string[] = [];

app.get('/new_game', (req, res) => {
    let code: string = generateCode();
    codes.push(code);
    rooms.set(code, 0);
    res.send({"code": code});
});


io.on('connection', (socket) => {
    const game_code: string = socket.handshake.query["code"] as string;
    const players_waiting = rooms.get(game_code);
    if (players_waiting != undefined) {
        rooms.set(game_code, players_waiting + 1);
        socket.join(game_code);
        io.to(game_code).emit('code', game_code);
        if (players_waiting === 1)
            io.to(game_code).emit('ready');
    }

    socket.on('update', (arg) => {
        let room_list = Array.from(socket.rooms);
        let room_code: string;
        if (room_list[0].length == 4) {
            room_code = room_list[0];
        } else {
            room_code = room_list[1];
        }
        io.to(room_code).emit('update', arg);
    });
});


server.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
