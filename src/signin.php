<?php
//signing up php.
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];



//DATABASE connection

$conn = new mysqli('eu-cdbr-west-03.cleardb.net', 'b1f91cc87f0529', 'fee6eb8a', 'heroku_63291ad8f31606c');
if ($conn->connect_error) {
    die('Connection Failed : ' . $conn->connect_error);
    echo ("Invalid username or email, try again!");
} else {
    $stmt = $conn->prepare("insert into users(username,email,password) values (?,?,?)");
    $stmt->bind_param("sss", $username, $email, $password);
    $stmt->execute();
    header("Location: signin.html");
    $stmt->close();
    $conn->close();
}
