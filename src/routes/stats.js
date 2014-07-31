var express = require('express');
var router = express.Router();

var stats = require('../emailer/stats');

router.get('/', function(req, res) {
	res.render('stats');
});

router.get('/totalsent', function(req, res) {

	stats.totalSent(function(count) {
		res.render('controls/textcontrol', {
			content: count + "have sent"
		});
	});

});

router.get('/lastfive', function(req, res) {

	stats.lastSent(5, function(items) {
		res.render('controls/listcontrol', {
			items: items
		});
	});

});

module.exports = router;
