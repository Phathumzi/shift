const socket = io();
let roomUniqueId = null;
let player1 = false;
let myScore = 0, OpponentScore = 0;

function createGame() {//make a game room that someone can join
    player1 = true;
    socket.emit('createGame');
}

function joinGame() {//join a unique gameroom
    roomUniqueId = document.getElementById('roomUniqueId').value;
    socket.emit('joinGame', {roomUniqueId: roomUniqueId});
}

socket.on("newGame", (data) => { //the waiting page that's created when you create a new game
    roomUniqueId = data.roomUniqueId;
    document.getElementById('initial').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    let copyButton = document.createElement('button');
    //styles
    copyButton.style.display = 'block';
    copyButton.style.fontSize = '20px';
    copyButton.style.border = '2px solid green';
    copyButton.style.background = 'linear-gradient(90deg, #00ff0d, rgb(29, 146, 0), #00ff0d)';
    copyButton.style.borderRadius = "7.5%";
    copyButton.style.cursor = "pointer";
    copyButton.style.backgroundSize = "300%";
    copyButton.style.padding = "20px 40px";

    // Add a mouseover event listener
    copyButton.addEventListener('mouseover', () => {
    // Change the button's background color
    copyButton.style.background = 'linear-gradient(90deg, rgb(29, 146, 0), #00ff0d, rgb(29, 146, 0))';
  });
  
  // Add a mouseout event listener
  copyButton.addEventListener('mouseout', () => {
    // Change the button's background color back to its original color
    copyButton.style.background = 'linear-gradient(90deg, #00ff0d, rgb(29, 146, 0), #00ff0d)';
  });

    copyButton.classList.add('btn','btn-primary','py-2', 'my-2')
    copyButton.innerText = 'Copy Code';
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(roomUniqueId).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    });
    document.getElementById('waitingArea').innerHTML = `Waiting for opponent, please share code ${roomUniqueId} to join`;
    document.getElementById('waitingArea').style.fontSize = "40px";
    document.getElementById('waitingArea').appendChild(copyButton);
});

socket.on("playersConnected", () => {//
    document.getElementById('initial').style.display = 'none';
    document.getElementById('waitingArea').style.display = 'none';
    document.getElementById('gameArea').style.display = 'flex';
})

socket.on("p1Choice",(data)=>{
    if(!player1) {
        createOpponentChoiceButton(data);
    }
});

socket.on("p2Choice",(data)=>{
    if(player1) {
        createOpponentChoiceButton(data);
    }
});

socket.on("result",(data)=>{
    let winnerText = '';
    if(data.winner != 'd') {
        //player1's screen
        if(data.winner == 'p1' && player1) {
            winnerText = 'You win';
            myScore++;
        } else if(data.winner == 'p1') {
            winnerText = 'You lose';
            OpponentScore++;
        } 
        
        //player2's screen
        else if(data.winner == 'p2' && !player1) {
            winnerText = 'You win';
            myScore++;
        } else if(data.winner == 'p2') {
            winnerText = 'You lose';
            OpponentScore++;
        }
    } else {
        winnerText = `It's a draw`;
    }
    document.getElementById('opponentState').style.display = 'none';
    document.getElementById('opponentButton').style.display = 'block';

    //make score board
    document.getElementById('scoreBoard').style.background = "#ff998b";
    document.getElementById('scoreBoard').style.padding = "2em";
    document.getElementById('scoreBoard').style.boxShadow = "0 0 6em rgba(0,0,0,.15)";
    document.getElementById('scoreBoard').style.border = "2px solid rgb(107, 0, 107)";
    document.getElementById('scoreBoard').style.borderRadius = "3%";

    //Result
    document.getElementById('winnerArea').innerHTML = winnerText;
    document.getElementById('winnerArea').style.fontSize = "60px";
    document.getElementById('winnerArea').style.fontStyle = "italic";
    document.getElementById('winnerArea').style.textAlign = "center";
    
    //My Score
    document.getElementById('MyScore').innerHTML ="My Score: " + myScore;
    document.getElementById('MyScore').style.fontSize = "40px";
    document.getElementById('MyScore').style.fontStyle = "italic";
    document.getElementById('MyScore').style.textAlign = "left";
    document.getElementById('MyScore').style.float = "left";

    //Opponenent's Score
    document.getElementById('OpponentScore').innerHTML = "Opponent's Score: " + OpponentScore;
    document.getElementById('OpponentScore').style.fontSize = "40px";
    document.getElementById('OpponentScore').style.fontStyle = "italic";
    document.getElementById('OpponentScore').style.textAlign = "right";
    document.getElementById('MyScore').style.float = "left";
});

function sendChoice(rpsValue) {
    const choiceEvent= player1 ? "p1Choice" : "p2Choice";
    socket.emit(choiceEvent,{
        rpsValue: rpsValue,
        roomUniqueId: roomUniqueId
    });
    let playerChoiceButton = document.createElement('button');
    playerChoiceButton.style.display = 'block';
    playerChoiceButton.classList.add(rpsValue.toString().toLowerCase());
    playerChoiceButton.innerText = rpsValue;
    document.getElementById('player1Choice').innerHTML = "";
    document.getElementById('player1Choice').appendChild(playerChoiceButton);
}

function createOpponentChoiceButton(data) {
    document.getElementById('opponentState').innerHTML = "Opponent made a choice";
    let opponentButton = document.createElement('button');
    opponentButton.id = 'opponentButton';
    opponentButton.classList.add(data.rpsValue.toString().toLowerCase());
    opponentButton.style.display = 'none';
    opponentButton.innerText = data.rpsValue;
    document.getElementById('player2Choice').appendChild(opponentButton);
}
