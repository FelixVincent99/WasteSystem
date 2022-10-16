const mysql = require('mysql');
var config = mysql.createConnection({
    host: "219.93.5.3",
    user: "felix",
    password: "August@2022",
    database: "dbtssmartsystem"
});

module.exports = config;