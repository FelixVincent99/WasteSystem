const mysql = require('mysql');
var config = mysql.createConnection({
    host: "10.40.120.36",
    user: "root",
    password: "SkhFvLsh22*",
    database: "dbtssmartsystem"
});

module.exports = config;