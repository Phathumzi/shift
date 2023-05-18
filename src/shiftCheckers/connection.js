var mysql = require('mysql');

var con = mysql.createConnection({
  host:'eu-cdbr-west-03.cleardb.net',
  user: 'b1f91cc87f0529',
  password: 'fee6eb8a'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   
  });