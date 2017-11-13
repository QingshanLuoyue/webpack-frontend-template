const express = require('express');
const path = require('path');
// const loggoer = require('loggoer');

let app = express();
app.get('/', function(req, res) {
    res.send('hello world!!');
    res.download('../local/static/css/animate.css');
});
app.use(express.static(path.join(__dirname, "../local")));
// app.use(loggoer());
const server = app.listen(8000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log('listening on  ' + host + ':' + port + '!');
});
