var express = require('express');
var cors = require('cors')
var app = express();

const urls = [
    'http://ariel17.com.ar',
    'http://ariel17.com.ar/uncuentoporsemana',
];

app.use(cors());
app.post('/prod/', function (req, res) {
    const sleep = Math.floor(Math.random() * 5000) + 15000;
    const index = Math.floor(Math.random() * urls.length)
    setTimeout(() => {
        res.json({
            status: 201,
            url: urls[index],
        });
    }, sleep);
})

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Mock API server listening at http://%s:%s", host, port);
})

