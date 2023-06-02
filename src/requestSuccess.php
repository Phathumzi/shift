<!DOCTYPE html>
<html lang="en">

<head>
    <title>Friends</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/friends.css">
    <script> function passvalues(){
        var selectedUser = document.getElementById("txt").value;
        localStorage.setItem("textvalue",selectedUser);
        return false;
    }</script>
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
                    <li> <a href="MYpastgames.php">PAST GAMES</a></li><!--sers will see the past games they've played-->
                    <li><a href="Account.php">ACCOUNT</a></li><!--Directed to the Accounts page/should users want to update their info-->
                    <li><a href="homePage.php">HOME</a></li><!-- User Directed to the homepage-->
                    
                </ul>
            </div>

        </div>
        <!--Content-->
        <div class="content">
            <form action="" method="post" class="search-bar"><!--search bar contains css data-->
            <H3> NEW FRIEND ADDED</H3>
            <li><a href="friends-table.php">view my friends</a></li>        
        </div>
    </div>
    </div>
    </div>
    <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>

</body>

</html>