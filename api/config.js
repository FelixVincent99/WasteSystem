const mysql = require('mysql');
var config = mysql.createConnection({
    host: "10.40.120.37",
    user: "root",
    password: "SkhFvLsh22*",
    database: "dbtssmartsystem"
});

module.exports = config;