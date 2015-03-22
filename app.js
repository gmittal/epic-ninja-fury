var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(express.static(__dirname + '/'));

var port = 3000;

app.get('/', function (req, res) {
  res.sendFile('index.html');
})



http.listen(port, function(){
  console.log('listening on *:'+port);
});