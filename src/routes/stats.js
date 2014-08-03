var express = require('express');
var router = express.Router();

var stats = require('../emailer/statsStore');

router.get('/totalsent', function(req, res) {

	stats.totalSent(function(count) {
		res.render('controls/textcontrol', {
			content: count + "have sent"
		});
	});

});

router.get('/lastfive', function(req, res) {

	stats.lastSent(5, function(items) {

		var results = items.map(function(doc) {
			return doc.from.name + " => " + doc.to[0].name;
		});

		res.render('controls/listcontrol', {
			items: results
		});
	});

});

router.get('/sendrate', function(req, res) {

	stats.sendRate(function(series) {

		var formatDate = function(ticks) {
			var d = new Date(ticks);
			return d.getHours() + ":" + ('0' + d.getMinutes()).slice(-2) + "." + ('0' + d.getSeconds()).slice(-2)
		};

		var first = series[0][0];
		var last = series[series.length - 1][0];

		var data = [series];
		var xticks = [[first, formatDate(first)], [last, formatDate(last)]];

		res.render('controls/graphcontrol', {
			name: "send-rate-grid",
			items: data,
			xticks: xticks,
		});

	});


});

module.exports = router;
