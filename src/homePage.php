<?php

include 'connection.php';
session_start();
$user_id = $_SESSION['user_id'];

if (!isset($user_id)) {
    header('location:login.php');
};
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Home Page</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <!--Navigation Bar/Menu-->
    <div class="main">
        <div class="navbar">
            <div class="icon">
                <h5 class="logo">SHIFT</h5>
            </div>
            <div class="menu">
                <ul>
                    <li><a href="">SPECTATE</a></li><!--Users will watch real time games here-->
                    <li> <a href="pastgames.php">PAST GAMES</a></li><!--sers will see the past games they've played-->
                    <li><a href="play.php">PLAY NOW!</a></li><!--Users are taken to where they will play games-->
                    <li><a href="Account.php">ACCOUNT</a></li><!--Directed to the Accounts page/should users want to update their info-->
                    <li><a href="logOUT.php">LOG OUT</a></li>

                </ul>
            </div>
        </div>
        <!--Not much here-->
        <div class="content">
            <h1>WELCOME <br><span>TO</span> <br>SHIFT</h1>
            <p class="par">
                <br>
            </p>




        </div>
    </div>
    </div>
    </div>
    <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>


</body>

</html>