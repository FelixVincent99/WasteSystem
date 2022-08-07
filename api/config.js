const mysql = require('mysql');
var config = mysql.createConnection({
    host: "219.93.5.3",
    user: "root",
    password: "SkhFvLsh22*",
    database: "dbtssmartsystem"
});

module.exports = config;