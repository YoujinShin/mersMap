
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var request = require('request'); // library to make requests to remote urls
var moment = require("moment"); // date manipulation library


exports.index = function(req, res) {
	console.log('main page requested');
	// res.render('index.html');
	res.render('scroll.html');
}

exports.scroll = function(req, res) {
	console.log('scroll page requested');
	res.render('scroll.html');
}