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
    <!--Naviagtion Information-->
    <div class="main">
        <div class="navbar">
            <div class="icon">
                <h5 class="logo">SHIFT</h5>
            </div>
            <div class="menu">
                <ul>
                    <li><a href="watch.php">SPECTATE</a></li><!--Users will watch real time games here-->
                    <li> <a href="">PAST GAMES</a></li><!--Users will see the past games they've played-->
                    <li><a href="play.php">PLAY NOW!</a></li><!--Users are taken to where they will play games-->
                    <li><a href="homepage.php">HOME</a></li><!--Directed to the Homepage-->

                </ul>
            </div>
        </div>
        <h2 class="title">All CHECKERS PAST GAMES</h2>
        <table>
            <tr>
                <th>PLAYER1</th>
                <th>PLAYER2</th>
                <th>WINNER!</th>
            </tr>

            <?php

            $conn = mysqli_connect('eu-cdbr-west-03.cleardb.net', 'b1f91cc87f0529', 'fee6eb8a', 'heroku_63291ad8f31606c');
            $sql = "SELECT * FROM pastgames";
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