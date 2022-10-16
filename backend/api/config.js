const mysql = require('mysql');
var config = mysql.createConnection({
    host: "localhost",
    user: "felix",
    password: "August@2022",
    database: "dbtssmartsystem"
});

module.exports = config;