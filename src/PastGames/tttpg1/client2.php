<?php
include 'connection.php';
session_start();
$userid = $_SESSION['user_id'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Tic Tac Toe</title>
    <link rel="shortcut icon" href="images/favicon.png" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <?php
    $select = mysqli_query($conn, "SELECT * FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'") or die('query failed');
    if (mysqli_num_rows($select) > 0) {
        $fetch = mysqli_fetch_assoc($select);
    }
    ?>
    <div class="topDiv">
        <!-- <div class="headerDiv"> -->
        <h1>Tic Tac Toe</h1>
        <button class="backBtn" onclick="history.back()">
            back
        </button>
        <!-- </div> -->
        <div>
            <p class="player-1" id="player1">
                <?php echo $fetch['username']; ?>
            </p>
        </div>
        <div>
            <p class="versus">
                vs
            </p>
        </div>
        <div>
            <p class="player-2" id="player2">
                test1
            </p>
        </div>
        <div class="container" id="container">

            <div class="sidebar" id="sidebar">
                <div class="flex-col1">
                    <!-- user details goes here -->
                </div>
                <div class="flex-col2">
                    <button class="connectBtn" onclick="window.location.href = 'client1.php';">Previous</button>
                    <button class="newGame" onclick="window.location.href = 'client3.php';">Next</button>
                </div>

            </div>
            <div class="mainbar" id="mainbar">
                <div class="gameStatus" id="gameStatus"></div>
                <div class="board" id="board">
                    <div class="cell x" id="cell">X</div>
                    <div class="cell" id="cell"></div>
                    <div class="cell" id="cell"></div>
                    <div class="cell" id="cell"></div>
                    <div class="cell circle" id="cell"></div>
                    <div class="cell" id="cell"></div>
                    <div class="cell" id="cell"></div>
                    <div class="cell" id="cell"></div>
                    <div class="cell" id="cell"></div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <p class="turn" id="turn">
            test1 won
        </p>
    </div>
    <script src="clientScript.js" defer></script>
</body>

</html>