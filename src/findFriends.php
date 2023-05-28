<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>search bar</title>
</head>

<body>
    <form method="post" action="">

        <input type="text" name="search">
        <input type="submit" name="submit">
    </form>

</body>

</html>

<?php
$con = new PDO("mysql:host=eu-cdbr-west-03.cleardb.net;dbname=heroku_63291ad8f31606c", 'b1f91cc87f0529', 'fee6eb8a');

if (isset($_POST["submit"])) {
    $str = $_POST["search"];
    $sth = $con->prepare("SELECT * FROM users WHERE username = '$str'");
    $sth->setFetchMode(PDO::FETCH_OBJ);
    $sth->execute();

    if ($row = $sth->fetch()) {
?>
        <br> <br> <br>
        <table>
            <tr>
                <th>username</th>
            </tr>
            <tr>
                <td>
                    <?php echo $row->username; ?>
                </td>
            </tr>
        </table>
<?php
    } else {
        echo "USER DOES NOT EXIST";
    }
}

?>