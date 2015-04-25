'use strict';

$(function () {
	var socket = io.connect();
	socket.on('badge', function (badge) {
		var img = '<img scr="' + badge.badge_id + '" alt="Code School badge">';
		$('#badge-wraper').prepend($(img));
		setTimeout(function(){
			$(img).addClass('on');
		}, 0);
	});
});
