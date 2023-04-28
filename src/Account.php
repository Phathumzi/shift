<?php

include 'connection.php';
session_start();
$userid = $_SESSION['user_id'];

if (isset($_POST['Account'])) {

    $update_name = mysqli_real_escape_string($conn, $_POST['update_username']);
    $update_email = mysqli_real_escape_string($conn, $_POST['update_email']);
    //get information from the databe
    mysqli_query($conn, "UPDATE heroku_63291ad8f31606c.users SET username = '$update_name', email = '$update_email' WHERE userid = '$userid'") or die('query failed');

    $new_pass = mysqli_real_escape_string($conn, $_POST['new_pass']);
    $confirm_pass = mysqli_real_escape_string($conn, $_POST['confirm_pass']);
    //Password validation
    if (!empty($new_pass) || !empty($confirm_pass)) {
        if ($new_pass != $confirm_pass) {
            $message[] = 'passwords do not match!';
        } else { //Saving the updated information to the information
            mysqli_query($conn, "UPDATE heroku_63291ad8f31606c.users SET password = '$confirm_pass' WHERE userid = '$userid'") or die('query failed');
            $message[] = 'password updated successfully!';
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Account</title>
    <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/app.css" />
    <link rel="stylesheet" href="css/style.css" />

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
                    <li><a href="">SPECTATE</a></li><!--Users will watch real time games here-->
                    <li> <a href="pastgames.php">PAST GAMES</a></li><!--Users will see the past games they've played-->
                    <li><a href="play.php">PLAY NOW!</a></li><!--Users are taken to where they will play games-->
                    <li><a href="homepage.php">HOME</a></li><!--Directed to the Homepage-->

                </ul>
            </div>

        </div>
        <!--Getting the users stored information-->
        <?php
        $select = mysqli_query($conn, "SELECT * FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'") or die('query failed');
        if (mysqli_num_rows($select) > 0) {
            $fetch = mysqli_fetch_assoc($select);
        }
        ?>
        <form action="Account.php" method="post" enctype="multipart/form-data">
            <?php
            if (isset($message)) {
                foreach ($message as $message) {
                    echo '<div class="message">' . $message . '</div>';
                }
            }
            ?>
            <h2 class="title">Your Shift Profile</h2>
            <!--Username Information-->
            <div class="input-field">
                <i class="bx bxs-user"></i>
                <input type="text" name="update_username" value=<?php echo $fetch['username']; ?>>
            </div>
            <!--Email-->
            <div class="input-field">
                <i class="bx bxs-envelope"></i>
                <input type="email" name="update_email" value=<?php echo $fetch['email']; ?>>
            </div>
            <!--Password-->
            <div class="input-field">
                <i class="bx bxs-lock-alt"></i>
                <input type="password" name="new_pass" placeholder="enter new password">
            </div>
            <!--Confirm Password-->
            <div class="input-field">
                <i class="bx bxs-lock-alt"></i>
                <input type="password" name="confirm_pass" placeholder="confirm new password">
            </div>
            <input type="submit" value="update Profile" name="Account" class="btn solid" />
        </form>
    </div>
    <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
</body>

</html>