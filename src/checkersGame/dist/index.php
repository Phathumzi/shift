<?php

include 'connection.php';
session_start();
$userid = $_SESSION['user_id'];

?>

<!DOCTYPE html>
<html lang="en">
<?php
$select = mysqli_query($conn, "SELECT * FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'") or die('query failed');
if (mysqli_num_rows($select) > 0) {
  $fetch = mysqli_fetch_assoc($select);
}
?>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Checkers</title>
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="index.css" />
  <link rel="icon" href="./content/checkersIcon.png" />
  <script src="/socket.io/socket.io.js"></script>
</head>

<body>

  <!--Getting the users stored information-->
  <?php
  $select = mysqli_query($conn, "SELECT * FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'") or die('query failed');
  if (mysqli_num_rows($select) > 0) {
    $fetch = mysqli_fetch_assoc($select);
  }
  ?>
  <footer>
    <div class="footer-content">
      <h3>GAME INFOMATION</h3>
      <div class="input-field">
        <i class="bx bxs-user"></i>
        <input readonly type="text" name="player_name" value=<?php echo $fetch['username']; ?>>
      </div>
      <p> versus </p>
      <div class="input-field">
        <i class="bx bxs-user"></i>
        <input type="text" name="update_username" value="player 2" readonly>
      </div>
    </div>
  </footer>
  <script src="main.js"></script>
</body>

</html>