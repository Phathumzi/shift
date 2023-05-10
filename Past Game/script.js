//get past game from database
pastGame = [14, -7, 10, 7, 13, -7, 10, 14, 16, -14, 9, 7, 16, -7, 7, 7, 16, -14, 3, 14, 14, -7, 11, 14, 15, -18, 3, 14, 12, -7, 9, 14, 18, -9, 3, 18, 23, -18, 5, 9, 23, -9, 5, 9, 23, -14, 6, 18, 17, -7, 6, 7, 17, -14, 2, 7, 17, -9, 2, 18, 19, -9, 2, 7, 19, -18, 9, 9, 20, -14, 8, 9, 20, -7, 8, 18, 22, -7, 8, 18, 19, -9, 1, 7, 21, -7, 1, 18, 21, -7, 8, -9, 21, -7, 1, 18]


//this is the board
var board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

//the game will be stored here
let game = [];

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

//initialization
let cells = document.querySelectorAll("td");
let redsPieces = document.querySelectorAll("p");
let blacksPieces = document.querySelectorAll("span");
let PlayerTurnText = document.querySelectorAll(".Player-turn-text");
let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces = [];

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false,
    otherPlayerMove: -1
}

//send info
let ID_of_piece = -1;
let piece_Move = -1;

//intitalize buttons
var next = document.getElementById("nextButton");
var prev = document.getElementById("prevButton");
prev.disabled = true;
prev.style.backgroundColor = "grey";
prev.style.border = "2px solid rgb(49, 49, 49)";


changePlayer(); //make black start


index = 0

function Next() {
    //make move
    recieveMove(pastGame[index], pastGame[index+1])
    index += 2;


    if(index != 0){//first move has been made so activate Prev Button
        prev.disabled = false;
        prev.style.backgroundColor = "#04AA6D";
        prev.style.border = "2px solid green";
    }

    if(index >= pastGame.length){//last move was made
        next.disabled = true;
        next.style.backgroundColor = "grey";
        next.style.border = "2px solid rgb(49, 49, 49)";
    }
}

function Prev() {
    //make move
    reset();
    index -= 2
    for(let i = 0; i < index; i+=2 ){
        recieveMove(pastGame[i], pastGame[i+1]);
    }


    if(index < pastGame.length){//last move hasn't been made so activate Next Button
        next.disabled = false;
        next.style.backgroundColor = "#04AA6D";
        next.style.border = "2px solid green";

        prev.disabled = false;
        prev.style.backgroundColor = "#04AA6D";
        prev.style.border = "2px solid green";
    }
    
    if(index == 0){//first move hasn't been made so deactivate Prev Button
        prev.disabled = true;
        prev.style.backgroundColor = "grey";
        prev.style.border = "2px solid rgb(49, 49, 49)";
    }
}


function givePiecesEventListeners() {//allows us to press on pieces and starts the game
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}


function getPlayerPieces() {//check who's turn it, then assign the correct pieces 
    if (turn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }
    removeCellonclick();
    resetBorders();
    resetSelectedPieceProperties();
    getSelectedPiece();
}


function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}


function resetBorders() {//reset peice's border to original colour 
    for (let i = 0; i < playerPieces.length; i++) {
        if(playerPieces == redsPieces){
            playerPieces[i].style.border = "5px solid maroon";
        }
        else{
            playerPieces[i].style.border = "5px solid rgb(49, 49, 49)";

        }
    }
}


function resetSelectedPieceProperties() {//after player makes move reset some things
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
    selectedPiece.otherPlayerMove = -1;
}


function getSelectedPiece() {//get the selected piece
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);

    isPieceKing();
}


function isPieceKing() {//check if piece is a King
    ID_of_piece = selectedPiece.pieceId
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}


function getAvailableSpaces() {//check which squares are available
    if (board[selectedPiece.indexOfBoardPiece + 7] === null && 
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null && 
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null && 
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 9] === null && 
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusNinthSpace = true;
    }
    
    checkAvailableJumpSpaces();
}

function checkAvailableJumpSpaces() {//check which pieces can be captured
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;

        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null 
        && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
            selectedPiece.minusFourteenthSpace = true;

        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null 
        && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
            selectedPiece.minusEighteenthSpace = true;
        }
    } else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null 
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 7] < 12 && board[selectedPiece.indexOfBoardPiece + 7] !== null) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
        && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece + 9] < 12 && board[selectedPiece.indexOfBoardPiece + 9] !== null) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 7] < 12 
        && board[selectedPiece.indexOfBoardPiece - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.indexOfBoardPiece - 9] < 12
        && board[selectedPiece.indexOfBoardPiece - 9] !== null) {
            selectedPiece.minusEighteenthSpace = true;
        }
    }
    checkPieceConditions();
}


function checkPieceConditions() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}


function givePieceBorder() {//change piece's border to green when selected    
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
    || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "5px solid green";
        giveCellsClick();
    } 
    else {
        return;
    }
}


function giveCellsClick() {  
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");//bottom left
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");//bottom right
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)")//jump bottom left
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");//jump bottom right
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)"); //top right
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)"); //top left
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");//jump top right
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");//jump top left
    }

    //handle other player's move
    if(turn){
        cells[selectedPiece.indexOfBoardPiece + selectedPiece.otherPlayerMove].click()
    }

    if(!turn){
        cells[selectedPiece.indexOfBoardPiece + selectedPiece.otherPlayerMove].click()
    }
}


function makeMove(number) {//make a move
    switch (number) {
        case 7:
            piece_Move = 7;
          break;
        case 9:
            piece_Move = 9;
          break;
        case 14:
            piece_Move = 14;
          break;
        case 18:
            piece_Move = 18;
          break;
        case -7:
            piece_Move = -7;
          break;
        case -9:
            piece_Move = -9;
          break;
        case -14:
            piece_Move = -14;
            break;
        case -18:
            piece_Move = -18;
          break;                
      }

    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
        }
    }

    //send move and display board
   // sendMove(ID_of_piece, piece_Move);

    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}


function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {//updates everything
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackScore--;
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            redScore--;
        }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}


function removeEventListeners() { // removes the event listener from each piece
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    changePlayer();
}


function changePlayer() {//change to other player's turn
    if (turn) {
        turn = false;
        let PlayerText = document.getElementById("text");
        PlayerText.innerText = "Black's turn";

    } else {
        turn = true;
        let PlayerText = document.getElementById("text");
        PlayerText.innerText = "Red's turn";
    }

    checkForWin();
}


function checkForWin() {//check for a winner
    if (blackScore == 0) {
        let PlayerText = document.getElementById("text");
        PlayerText.innerText = "Red Wins";

    } else if (redScore == 0) {
        let PlayerText = document.getElementById("text");
        PlayerText.innerText = "Black Wins";
    }

}

function recieveMove(id, move){
    selectedPiece.pieceId = parseInt(id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    selectedPiece.otherPlayerMove = parseInt(move) //piece_Move of other player
    
    if (turn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }
    

    resetBorders();//reset the border color
    isPieceKing();//run functions to make it look like player made move
    //givePiecesEventListeners(); //restarts cycle
    //return updated board
    
    
} 

function sendMove(ID, Move){
    //do something
    console.log("piece:" + ID + ", moved in direction " + Move)
    
    //record game into array
    game.push(ID)
    game.push(Move)

    console.log(game)

    //send to opponent
}


function reset(){
    var element = document.getElementById("table");
    element.remove();

    // Create table
    var table = document.createElement("TABLE");
    table.setAttribute("id", "table");
    document.getElementById("main").appendChild(table);
    makeRedRows();
    makeMidRows();
    makeBlackRows();

    resetAll();
    changePlayer();
}


function makeRedRows(){
    //Create row0
    var row = document.createElement("TR");
    row.setAttribute("id", "myTr3");
    document.getElementById("table").appendChild(row);

    for(let i=0; i<4; i++){
        //Create cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "red";  
        document.getElementById("myTr3").appendChild(cell1);

        //add pieces
        var cell2 = document.createElement("TD");
        var redP = document.createElement("p");
        redP.setAttribute("class", "red-piece");
        redP.setAttribute("id", i);
        cell2.appendChild(redP);
        document.getElementById("myTr3").appendChild(cell2);
    }


    //Create row1
    var row = document.createElement("TR");
    row.setAttribute("id", "myTr");
    document.getElementById("table").appendChild(row);

    for(let i=4; i<8; i++){
         //add pieces
         var cell2 = document.createElement("TD");
         var redP = document.createElement("p");
         redP.setAttribute("class", "red-piece");
         redP.setAttribute("id", i);
         cell2.appendChild(redP);
         document.getElementById("myTr").appendChild(cell2);

        //Create cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "red";  
        document.getElementById("myTr").appendChild(cell1);
    }


    //Create row2
    var row = document.createElement("TR");
    row.setAttribute("id", "myTr2");
    document.getElementById("table").appendChild(row);

    for(let i=8; i<12; i++){
        //Create cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "red";  
        document.getElementById("myTr2").appendChild(cell1);

        //add pieces
        var cell2 = document.createElement("TD");
        var redP = document.createElement("p");
        redP.setAttribute("class", "red-piece");
        redP.setAttribute("id", i);
        cell2.appendChild(redP);
        document.getElementById("myTr2").appendChild(cell2);
    }

}


function makeMidRows(){
    //Create row0
    var row = document.createElement("TR");
    row.setAttribute("id", "tr2");
    document.getElementById("table").appendChild(row);

    for(let i=0; i<4; i++){
        //Create black cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "black";  
        document.getElementById("tr2").appendChild(cell1);

        //Create red cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "red";  
        document.getElementById("tr2").appendChild(cell1);

    }   
    
    //Create row1
    var row = document.createElement("TR");
    row.setAttribute("id", "tr1");
    document.getElementById("table").appendChild(row);

    for(let i=0; i<4; i++){
        //Create red cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "red";  
        document.getElementById("tr1").appendChild(cell1);

        //Create black cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "black";  
        document.getElementById("tr1").appendChild(cell1);

    }

}


function makeBlackRows(){
    //Create row5
    var row = document.createElement("TR");
    row.setAttribute("id", "myTr5");
    document.getElementById("table").appendChild(row);

    for(let i=12; i<16; i++){
         //add pieces
         var cell2 = document.createElement("TD");
         var redP = document.createElement("span");
         redP.setAttribute("class", "black-piece");
         redP.setAttribute("id", i);
         cell2.appendChild(redP);
         document.getElementById("myTr5").appendChild(cell2);

        //Create cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "red";  
        document.getElementById("myTr5").appendChild(cell1);
    }


    //Create row6
    var row = document.createElement("TR");
    row.setAttribute("id", "myTr6");
    document.getElementById("table").appendChild(row);

    for(let i=16; i<20; i++){
        //Create cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "red";  
        document.getElementById("myTr6").appendChild(cell1);

        //add pieces
        var cell2 = document.createElement("TD");
        var redP = document.createElement("span");
        redP.setAttribute("class", "black-piece");
        redP.setAttribute("id", i);
        cell2.appendChild(redP);
        document.getElementById("myTr6").appendChild(cell2);
    }


    //Create row7
    var row = document.createElement("TR");
    row.setAttribute("id", "myTr7");
    document.getElementById("table").appendChild(row);

    for(let i=20; i<24; i++){
         //add pieces
         var cell2 = document.createElement("TD");
         var redP = document.createElement("span");
         redP.setAttribute("class", "black-piece");
         redP.setAttribute("id", i);
         cell2.appendChild(redP);
         document.getElementById("myTr7").appendChild(cell2);

        //Create cell
        var cell1 = document.createElement("TD");
        cell1.setAttribute("class", "noPieceHer");
        cell1.style.backgroundColor = "red";  
        document.getElementById("myTr7").appendChild(cell1);
    }

}


function resetAll(){
    board = [
        null, 0, null, 1, null, 2, null, 3,
        4, null, 5, null, 6, null, 7, null,
        null, 8, null, 9, null, 10, null, 11,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        12, null, 13, null, 14, null, 15, null,
        null, 16, null, 17, null, 18, null, 19,
        20, null, 21, null, 22, null, 23, null
    ]

    game = [];


    cells = document.getElementById("table").querySelectorAll("td");
    redsPieces = document.getElementById("table").querySelectorAll("p");
    blacksPieces = document.getElementById("table").querySelectorAll("span");
    
    PlayerTurnText = document.getElementById("text");
    PlayerTurnText.innerText = "Black's turn";

    turn = true;
    redScore = 12;
    blackScore = 12;
    playerPieces = [];

    ID_of_piece = -1;
    piece_Move = -1;

    prev.disabled = true;
    prev.style.backgroundColor = "grey";
    prev.style.border = "2px solid rgb(49, 49, 49)";

    resetSelectedPieceProperties();
}

