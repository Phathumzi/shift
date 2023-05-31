var mysql = require('mysql');

var con = mysql.createConnection({
    host: "eu-cdbr-west-03.cleardb.net",
    user: "b1f91cc87f0529",
    password: "fee6eb8a",
    database: "heroku_63291ad8f31606c"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});
