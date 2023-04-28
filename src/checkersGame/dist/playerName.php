<?php

use SebastianBergmann\Environment\Console;

include '/Users/Phathumzi/SHIFT-java/shift-1/src/connection.php';
session_start();
$userid = $_SESSION['user_id'];



$select = mysqli_query($conn, "SELECT * FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'") or die('query failed');
if (mysqli_num_rows($select) > 0) {
    $fetch = mysqli_fetch_assoc($select);
}

echo $fetch['username'];




$select = mysqli_query($conn, "SELECT * FROM heroku_63291ad8f31606c.users WHERE userid = '$userid'");



$stmt = $conn->prepare("insert into game(player1) values (?)");
$stmt->bind_param("s", $fetch['username']);
$stmt->execute();
$stmt->close();
$conn->close();
