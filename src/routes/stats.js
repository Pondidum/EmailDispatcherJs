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
			return doc.from;
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
			return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
		};

		var first = series[0][0];
		var last = series[series.length - 1][0];

		var xticks = {
			startVal: first,
			startText: formatDate(first),
			finishVal: last,
			finishText: formatDate(last)
		};

		var data = [series];

		res.render('controls/graphcontrol', {
			name: "send-rate-grid",
			items: JSON.stringify(data),
			xticks: xticks,
		});

	});


});

module.exports = router;
