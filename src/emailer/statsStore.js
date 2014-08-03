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

var totalSent = function(action) {

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
	  .sort({ sent: 1 })
	  .limit(count)
	  .exec(map);

};

var sendRate = function(action) {

	var mapreduce = function(err, docs) {

		var results = docs.reduce(function(result, current) {

			var sent = new Date(current.sent);
			var key = Number([
				sent.getFullYear(),
				sent.getMonth(),
				sent.getDate(),
				sent.getHours(),
				sent.getMinutes(),
				sent.getSeconds()
			].join(""));

			if (key in result) {
				result[key].count += 1;
			} else {
				result._array.push(
					result[key] = { key: key, count: 1 }
				);
			}

			return result;

		}, { _array: [] })._array;


		var mapper = function(item) {
			return [ item.key, item.count ];
		};

		var dataset = results.map(mapper);

		action(dataset);
	};


	var dataset = db
		.find({})
		.sort({ sent: 1})
		.exec(mapreduce);


};

exports.log = logEmail;

exports.totalSent = totalSent;
exports.lastSent = lastSent;
exports.sendRate = sendRate;
