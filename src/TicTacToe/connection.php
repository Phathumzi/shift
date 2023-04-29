<?php
//Connection to the Database
$servername = 'eu-cdbr-west-03.cleardb.net';
$username = 'b1f91cc87f0529';
$password = 'fee6eb8a';
$db_name = 'heroku_63291ad8f31606c';
$conn = new mysqli($servername, $username, $password, $db_name, 3306);
if ($conn->connect_error) {
    die("Connection failed" . $conn->connect_error);
}
