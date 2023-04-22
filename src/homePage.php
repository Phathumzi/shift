<?php

include 'connection.php';
session_start();
//user id taken from login page
$user_id = $_SESSION['user_id'];

if (!isset($user_id)) {
    header('location:login.php');
};
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Home Page</title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <!--Navigation Bar/Menu-->
    <div class="main">
        <div class="navbar">
            <div class="icon">
                <h5 class="logo">shift</h5>
            </div>

            <div class="menu">
                <ul>
                    <li><a href="/watch.php">SPECTATE</a></li><!--Users will watch real time games here-->
                    <li> <a href="">MY PAST GAMES</a></li><!--sers will see the past games they've played-->
                    <li><a href="/play.php">PLAY NOW!</a></li><!--Users are taken to where they will play games-->
                    <li><a href="/Account.php">ACCOUNT</a></li><!--Directed to the Accounts page/should users want to update their info-->

                </ul>
            </div>
            <!--Logout Button(Directed to the signin page-->
            <div class="search">
                <button type="button" class="btn btn-light" color=#fff><a href="logOUT.php">Logout</a></button>
            </div>

        </div>
        <!--Not much here-->
        <div class="content">
            <h1>WELCOME <br><span>TO</span> <br>SHIFT</h1>
            <p class="par">
                <br>
            </p>

            <button class="cn"><a href="#">REFRESH</a></button>


        </div>
    </div>
    </div>
    </div>
    <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>

    <?php




    ?>









</body>

</html>