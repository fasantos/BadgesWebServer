'use strict';

var express = require('express');
var app = express();

/*
* Allows third party clients to connect to the socket server
*/
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var subSocket = require('./lib/subscribe');
var badges = require('./models/badges');

/*
* Have our server listen on port 3000
*/
var port = process.env.PORT || 3000
server.listen(port, function(){
	console.log('Server is running on port %d\nTo turn off the server, press ctrl-c', port);
});

/*
* Serve static assets out of public directory
*/
app.use(express.static('public'))

/*
* Send the public/index.html to the browser
*/
app.get('/', function(req, res){
	res.sendfile('./public/index.html');
});

/*
* Watch for connections
*/
io.sockets.on('connection', function(socket){
	badges.get(function(err, badgeList){
		if (err) {return};
		badgeList.forEach(function(badge){
			socket.emit('badge', badge);
		});
	});
});

/*
* When a message comes in from the pub/sub system, send it to the sockets
*/
subSocket.on('message', function(message){
	io.sockets.emit('badge', message);
});
