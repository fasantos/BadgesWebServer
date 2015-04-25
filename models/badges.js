'use strict';

var host = process.env.BADGES_HOST || 'https://afternoon-atoll-4718.herokuapp.com/badges';
var request = require('request');

/*
* Get badges from the pub/sub server
* @param {function} callback
*/
exports.get = function (callback) {
	request(host, function (err, res, data) {
		data = JSON.parse(data);
		if (data.error) {return callback(err, [])};
		callback(err, data.data);
	});
};
