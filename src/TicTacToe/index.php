<?php
include 'connection.php';
session_start();
$userid = $_SESSION['user_id'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>Tic Tac Toe</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="shortcut icon" href="images/favicon.png" />
  <link href="style.css" rel="stylesheet" />
  <script src="script.js" defer></script>
</head>

<body>
  <?php
  $select = mysqli_query($conn, "SELECT * FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'") or die('query failed');
  if (mysqli_num_rows($select) > 0) {
    $fetch = mysqli_fetch_assoc($select);
  }
  ?>
  <div class="start-page">
    <header>TIC TAC TOE</header>
    <button class="start-game-button">
      <img src="images/icons/play.svg" alt="" />
      <p>start game</p>
    </button>
    <button class="spectate-game-button">
      <img src="images/icons/tv.svg" alt="" />
      <p>spectate games</p>
    </button>
    <button class="review-game-button">
      <img src="images/icons/rewind.svg" alt="" />
      <p>review my games</p>
    </button>
  </div>
  <div class="main-page">
    <header>tic tac toe</header>
    <main class="hidden">
      <div class="winner-modal">
        <p></p>
        <button class="restart-game-button">
          <img src="images/icons/restart.svg" alt="" />
          <p>restart</p>
        </button>
        <button onclick="history.back()" class="restart-game-button">
          <img src="images/icons/quit.svg" alt="" />
          <p>quit</p>
        </button>
      </div>
      <div class="player-cards">
        <div class="player-card player1">
          <input value=<?php echo $fetch['username']; ?> class="player-name" id="player1-name" disabled>X</input>
        </div>
        <p class="versus">vs.</p>
        <div class="player-card player2">
          <input value="Opponent" class="player-name" id="player2-name" disabled>O</input>
        </div>
      </div>
      <div class="game-board"></div>
    </main>
  </div>
</body>

</html>