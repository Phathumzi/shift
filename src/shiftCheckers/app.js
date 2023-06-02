var express = require("express");
var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
var io = require('socket.io')(http);




var gameIDs = [];
var games = [];

var generateGameId = function(){ //used to generated game id
    var gameID = Math.floor(Math.random()*100000);
    console.log(gameID);
    while(true){
        var i = gameIDs.indexOf(gameID);
        if (i < 0){
            return gameID;
        }
        gameID = Math.floor(Math.random()*100000);

        /////use this to send to database
    }
}

function getGameByID(IDKey){ 
    for(var i = 0; i < games.length; i++){
        if(games[i].id == IDKey){
            return games[i];
        }
    }
}

function getGameIDByID(IDKey){
    for(var i = 0; i < games.length; i++){
        if(games[i].id == IDKey){
            return i;
        }
    }
}

app.use("/static", express.static(__dirname + "/client"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile(__dirname + "/client/index.html");
});

app.post("/start", function(req, res){
    res.sendFile(__dirname + "/client/no-js.php"); //used to begin game
});

app.post("/join", function(req, res){
    res.sendFile(__dirname + "/client/no-js.php"); //new game is added
});

http.listen(8080, function(){
    console.log("Listening on http://127.0.0.1:8080/"); //the used port
});

socket_list = {}; 

io.on("connection", function(socket){
    socket.id = Math.random();
    socket_list[socket.id] = socket;

    socket.on("gameid", function(data){
        socket.gameid = parseInt(data);
        console.log("connected to game: " + data);
    });

    socket.on("start game", function(form_data){
        socket.player = form_data.playername;
        socket.gameID = generateGameId();
        gameIDs.push(socket.gameID);
        var game = {id: socket.gameID, player1: socket, player2: null, bps: 12, wps: 12}
        games.push(game);
        socket_list[socket.id].emit("game started", socket.gameID);
    });

    socket.on("join game", function(form_data){ // when game already connecd
        socket.player = form_data.player2name;
        var gameID = parseInt(form_data.gameid);
        var i = gameIDs.indexOf(gameID);
        if(i < 0){
            socket_list[socket.id].emit("invalid game");
            console.log("Invalid game id: "+form_data.gameid);
            return;
        }
        var game = getGameByID(gameID)
        if(game.player2 != null){
            socket_list[socket.id].emit("full game");
            return;
        }
        socket.gameID = gameID;
        console.log("Player "+socket.player+" joined game "+gameID.toString());
        game.player2 = socket;
        socket_list[socket.id].emit("game joined", socket.gameID, game.player1.player);
        game.player1.emit("player joined", socket.player);
    });

    socket.on("piece moved", function(origin, target){ //check the user's move
        var game = getGameByID(socket.gameID);
        if(game.player1.id == socket.id){
            game.player2.emit("move piece", origin, target);
            game.player1.emit("turn end");
            game.player2.emit("turn start");
        }
        else{
            game.player1.emit("move piece", origin, target);
            game.player2.emit("turn end");
            game.player1.emit("turn start");
        }
    });

    socket.on("piece removed", function(pieceRemoved, pieceColor){ //used to take a piece out of the board
        var game = getGameByID(socket.gameID);
        if(pieceColor == "white"){ game.wps--; }
        else { game.bps--; }
        if(game.player1.id == socket.id){
            game.player2.emit("remove piece", pieceRemoved);
        }
        else{
            game.player1.emit("remove piece", pieceRemoved);
        }
        if(game.bps == 0){
            game.player1.emit("you won");
            game.player2.emit("you lost");
        }
        if(game.wps == 0){
            game.player2.emit("you won");
            game.player1.emit("you lost");
        }
    });

    socket.on("request truce", function(){ // request opponet for a draw
        var game = getGameByID(socket.gameID);
        if(game.player1.id == socket.id){
            game.player2.emit("truce requested");
        }
        else{
            game.player1.emit("truce requested");
        }
    });

    socket.on("accept truce", function(){ //used to accept a draw
        var game = getGameByID(socket.gameID);
        if(game.player1.id == socket.id){
            game.player2.emit("truce accepted");
        }
        else{
            game.player1.emit("truce accepted");
        }
    });

    socket.on("reject truce", function(){
        var game = getGameByID(socket.gameID);
        if(game.player1.id == socket.id){
            game.player2.emit("truce rejected");
        }
        else{
            game.player1.emit("truce rejected");
        }
    });

    socket.on("disconnect", function(){ //user disconects from web
        if("gameID" in socket){
            var game = getGameByID(socket.gameID);
            if (game.player1.id == socket.id){
                if(game.player2){
                    game.player2.emit("game disconnect", game.player1.player);
                    console.log("player1 disconnect");
                }
            }
            else{
                game.player1.emit("game disconnect", game.player2.player);
                console.log("player2 disconnect");
            }
            delete gameIDs[socket.gameID];
            delete games[game];
        }
        console.log("socket "+socket_list[socket.id].player+" disconnected");
        delete socket_list[socket.id];
    })
    console.log("user connected");
});
