<!DOCTYPE html>
<html lang="en">

<head>
    <title>Friends</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/friends.css">
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
                    <li><a href="Account.php">ACCOUNT</a></li><!--Directed to the Accounts page/should users want to update their info-->
                    <li><a href="homepage.php">HOME</a></li><!-- User Directed to the homepage-->
                    <li><a href="Friends.php">FRIENDS</a></li><!--Users will be taken to the friends section-->

                </ul>
            </div>

        </div>
        <!--Content-->
        <div class="content">
            <form action="" method="post" class="search-bar"><!--search bar contains css data-->
                <input type="text" placeholder="search for friends" name="search"><!--Users will search for other users here-->
                <button type="submit" name="submit"><img src="/images/search.png"></button><!--Button to search fo the user-->
            </form>        
        </div>
        <div class="search-response">
            <!--Since we need to search for user we have to connect to the databse and get user info-->
            <?php
            $con = new PDO("mysql:host=eu-cdbr-west-03.cleardb.net;dbname=heroku_63291ad8f31606c", 'b1f91cc87f0529', 'fee6eb8a');//Connecting to the user database

            if (isset($_POST["submit"])) {//when user submits the query
                $str = $_POST["search"];
                $sth = $con->prepare("SELECT * FROM users WHERE username = '$str'");//get the user name
                $sth->setFetchMode(PDO::FETCH_OBJ);
                $sth->execute();

                if ($row = $sth->fetch()) {//process the info
            ?>
            
                <a href="<?php echo $row->username; ?>"><?php echo $row->username; ?></a><!--Display the user a link so we can send the friend request-->
                            
            <?php
                } else {
                    echo "USER DOES NOT EXIST";//if user is not found display this message on the website
                }
            }

            ?>
        </div>
    </div>
    </div>
    </div>
    <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>

</body>

</html>