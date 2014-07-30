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
	res.json({ count: 5 });
});

module.exports = router;
