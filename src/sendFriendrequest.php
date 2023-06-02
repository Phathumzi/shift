<?php require_once "controllerUserData.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>SEND REQUEST</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style2.css">
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4 form">
                <form action="sendFriendrequest.php" method="POST" autocomplete="">
                    <h2 class="text-center">ADD NEW FRIEND</h2>
                    
                    <?php
                    if (count($errors) > 0) {
                    ?>
                        <div class="alert alert-danger text-center">
                            <?php
                            foreach ($errors as $error) {
                                echo $error;
                            }
                            ?>
                        </div>
                    <?php
                    }
                    ?>
                    <div class="form-group">
                    <span id="result" name="result"></span>
                    <script>
                    document.getElementById("result").innerHTML=localStorage.getItem("textvalue");
                    </script>
                    </div>
                    <div class="form-group">
                        <input class="form-control button" type="submit" name="result" value="ADD Friend">
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>

</html>