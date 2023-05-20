var express = require('express');
var app = express();

const urls = [
    'http://ariel17.com.ar',
    'http://ariel17.com.ar/uncuentoporsemana',
    'https://google.com',
    'https://reddit.com',
    'https://news.ycombinator.com/',
];

app.post('/', function (req, res) {
    const sleep = Math.floor(Math.random() * 60000) + 10000;
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

