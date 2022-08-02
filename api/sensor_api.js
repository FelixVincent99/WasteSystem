var conn = require('./config');
var dateTime = require('node-datetime');

async function sendData(data) {
    var created = dateTime.create().format('Y-m-d H:M:S');
    try {
        var query = "INSERT INTO tblcollection (weight, lat, lng, collectionTime)";
        query += " VALUES('" + data.weight + "', '" + data.lat + "', '" + data.lng + "', '" + created + "')";
        conn.query(query, function(err, result) {
            if (err) throw err;
            // console.log(result);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendData: sendData
}