var express = require('express');
var router = express.Router();

var stats = require('../emailer/stats');

router.get('/', function(req, res) {

	stats.sentFromCount(function(groups) {

		res.render('stats', {
			groups: groups
		});

	});

});

router.get('/totalsent', function(req, res) {

	stats.totalSent(function(count) {
		res.json({ count: count });
	});

});

router.get('/lastfive', function(req, res) {

	stats.lastSent(5, function(items) {
		res.json(items);
	});

});

module.exports = router;
