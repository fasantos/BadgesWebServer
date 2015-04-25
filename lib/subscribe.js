'use strict';

var axon = require('axon');
var socket = axon.socket('sub');

socket.connect(4001);

socket.on('error', function (err) {
	throw err;
});

module.exports = socket;