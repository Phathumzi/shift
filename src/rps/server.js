const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const rooms = {};

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => { //give me feedback after a user has connected
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected'); //give me feedback after a user has disconnected
    });

    socket.on('createGame', () => { // code will create a new game
        const roomUniqueId = makeid(6);
        rooms[roomUniqueId] = {};
        socket.join(roomUniqueId);
        socket.emit("newGame", {roomUniqueId: roomUniqueId})
    });

    socket.on('joinGame', (data) => { // a player who is now a user can join a game that has been created
        if(rooms[data.roomUniqueId] != null) {
            socket.join(data.roomUniqueId);
            socket.to(data.roomUniqueId).emit("playersConnected", {});
            socket.emit("playersConnected");
        }
    })

    socket.on("p1Choice",(data)=>{ // this will show the choice made by player 1
        let rpsValue = data.rpsValue;
        rooms[data.roomUniqueId].p1Choice = rpsValue;
        socket.to(data.roomUniqueId).emit("p1Choice",{rpsValue : data.rpsValue});
        if(rooms[data.roomUniqueId].p2Choice != null) {
            declareWinner(data.roomUniqueId);
        }
    });

    socket.on("p2Choice",(data)=>{
        let rpsValue = data.rpsValue;
        rooms[data.roomUniqueId].p2Choice = rpsValue;
        socket.to(data.roomUniqueId).emit("p2Choice",{rpsValue : data.rpsValue});
        if(rooms[data.roomUniqueId].p1Choice != null) {
            declareWinner(data.roomUniqueId);
        }
    });
});

function declareWinner(roomUniqueId) {
    let p1Choice = rooms[roomUniqueId].p1Choice;
    let p2Choice = rooms[roomUniqueId].p2Choice;
    let winner = null;
    if (p1Choice === p2Choice) {
        winner = "d";
    } else if (p1Choice == "Paper") { // player has selected  Paper
        if (p2Choice == "Scissor") {
            winner = "p2";
        } else {
            winner = "p1";
        }
    } else if (p1Choice == "Rock") { // player has selected  rock
        if (p2Choice == "Paper") {
            winner = "p2";
        } else {
            winner = "p1";
        }
    } else if (p1Choice == "Scissor") { // player has selected scissor
        if (p2Choice == "Rock") {
            winner = "p2";
        } else {
            winner = "p1";
        }
    }
    io.sockets.to(roomUniqueId).emit("result", { //display the result to everyone
        winner: winner
    });
    rooms[roomUniqueId].p1Choice = null;
    rooms[roomUniqueId].p2Choice = null;
}

server.listen(4000, () => {
    console.log('listening on: http://localhost:4000/'); // the port that we must listen to
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
