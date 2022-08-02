const mysql = require('mysql');
var config = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbtssmartsystem"
});

module.exports = config;