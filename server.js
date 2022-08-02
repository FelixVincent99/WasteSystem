const express = require('express');
const url = require('url');
var app = express();
var server = require('http').createServer(app);
var router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);
const sensor = require('./api/sensor_api');

app.route('/send_from_sensor').get((request, res) => {
    var data = url.parse(request.url, true).query;
    console.log(data);
    sensor.sendData(data).then(result => {
        res.json({ "status": "success", "message": "Data is sent..." });
    });
});


// app.get('/send_from_sensor', (request, res) => {
//     var data = url.parse(request.url, true).query;
//     console.log(data);
//     sensor.sendData(data).then(result => {
//         res.json({ "status": "success", "message": "Data is sent..." });
//     });
// });


const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Listening on ${ PORT }`))