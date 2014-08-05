var Datastore = require("nedb");
var db = new Datastore({ filename: "app_data/stats.db", autoload: true });


var logEmail = function(email, result) {

	var doc = {
		email: email,
		status: result.status,
		info: result.info,
		sent: Date.now()
	};

	db.insert(doc, function(err, newDoc) {
		//do i care if it failed? i don't know...
	});

};

var totals = function(action) {

	db.count({}, function(err, count) {
		action(count);
	});

};

var lastSent = function(count, action) {

	var map = function(err, docs) {

		var results = docs.map(function(doc) {
			return {
				from: doc.email.from,
				to: doc.email.to
			};
		});

		action(results);

	};

	db.find({})
	  .sort({ sent: -1 })
	  .limit(count)
	  .exec(map);

};

var sendRate = function(action) {

	var now = Date.now();
	var startDate = new Date(now);
	var finishDate = new Date(now);

	startDate.setMinutes(startDate.getMinutes() - 10);

	var rate = 10;		//seconds

	var makeKey = function(d) {
		return Math.round(d.getTime() / (1000 * rate));	//10s
	};

	var dataset = db
		.find({ sent: { $gt: startDate.getTime() } })
		.sort({ sent: 1})
		.exec(function(err, docs) {

			var series = [];
			var results = [];

			for (var i = 0; i < (600 / rate); i++) {

				startDate.setSeconds(startDate.getSeconds() + rate);

				var obj = { sent: startDate.getTime(), count: 0 };
				var key = makeKey(startDate);

				results[key] = obj;
				series.push(obj);
			};

			for (var i = 0; i < docs.length; i++) {

				var doc = docs[i]

				var sent = new Date(doc.sent);
				var key = makeKey(sent);

				results[key].count += 1;
			};

			var mapper = function(item) {
				return [ item.sent, item.count ];
			};

			var dataset = series.map(mapper);

			action(dataset);
		});

};

exports.log = logEmail;

exports.totals = totals;
exports.lastSent = lastSent;
exports.sendRate = sendRate;
