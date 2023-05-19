<?php

namespace App;
?>
<?php
include 'connection.php';
session_start();
$userid = $_SESSION['user_id'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>PAST GAMES</title>
    <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/style.css">
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            color: #588c7e;
            font-family: monospace;
            font-size: 25px;
            text-align: left;
        }

        th {
            background-color: #588c7e;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #001236
        }
    </style>

</head>

<body>
    <?php
    $select = mysqli_query($conn, "SELECT username FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'") or die('query failed');
    if (mysqli_num_rows($select) > 0) {
        $fetch = mysqli_fetch_assoc($select);
        $username = $fetch['username'];
    }
    ?>
    <!--Naviagtion Information-->
    <div class="main">
        <div class="navbar">
            <div class="icon">
                <h5 class="logo">SHIFT</h5>
            </div>
            <div class="menu">
                <ul>
                    <li><a href="">SPECTATE</a></li><!--Users will watch real time games here-->
                    <li> <a href="">PAST GAMES</a></li><!--Users will see the past games they've played-->
                    <li><a href="play.php">PLAY NOW!</a></li><!--Users are taken to where they will play games-->
                    <li><a href="homepage.php">HOME</a></li><!--Directed to the Homepage-->

                </ul>
            </div>
        </div>
        <h2 class="title">All CHECKERS PAST GAMES</h2>
        <a class="pg" id="pg" href="PastGames/pg1/index.html">My Game 1</a>
        <a class="pg" id="pg" href="PastGames/pg2/index.html">My Game 2</a>
        <a class="pg" id="pg" href="PastGames/pg3/index.html">My Game 3</a>

        <table>
            <tr>
                <th>PLAYER1</th>
                <th>PLAYER2</th>
                <th>WINNER!</th>
            </tr>

            <?php


            class pastgames
            {

                public static function getTable()
                {

                    $conn = mysqli_connect('eu-cdbr-west-03.cleardb.net', 'b1f91cc87f0529', 'fee6eb8a', 'heroku_63291ad8f31606c');
                    $userid = $_SESSION['user_id'];
                    $select = mysqli_query($conn, "SELECT username FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'") or die('query failed');
                    if (mysqli_num_rows($select) > 0) {
                        $fetch = mysqli_fetch_assoc($select);
                        $username = $fetch['username'];
                    }

                    $sql = "SELECT * FROM heroku_63291ad8f31606c.pastgames where player1='$username' or player2='$username'";

                    $result = $conn->query($sql);

                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr><td>" . $row["player1"] . "</td><td>" . $row["player2"] . "</td><td>" . $row["won"] . "</td><tr>";
                        }
                    } else {
                        echo "NO PAST GAMES YET";
                    }



                    $conn->close();
                }
            }

            $conn = mysqli_connect('eu-cdbr-west-03.cleardb.net', 'b1f91cc87f0529', 'fee6eb8a', 'heroku_63291ad8f31606c');
            $sql = "SELECT * FROM heroku_63291ad8f31606c.pastgames where player1='$username' or player2='$username'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<tr><td>" . $row["player1"] . "</td><td>" . $row["player2"] . "</td><td>" . $row["won"] . "</td><tr>";
                }
            } else {
                echo "NO PAST GAMES YET";
            }

            $conn->close();




            ?>
        </table>
        </form>
    </div>
</body>

</html>