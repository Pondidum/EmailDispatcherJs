var Datastore = require("nedb");
var db = new Datastore({ filename: "app_data/stats.db", autoload: true });


var logEmail = function(email, result) {

	var doc = {
		email: email,
		status: result.status,
		info: result.info
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

var sentByFrom = function(action) {

	db.find({}, function(err, docs) {

		var reduced = docs.reduce(function(result, doc) {

			var from = doc.email.from;

			if (from in result) {
				result[from].count += 1;
			} else {
				result.arr.push(
					result[from] = {
						from: from,
						count: 1
					});
			}

			return result;
		}, { arr: [] } );

		action(reduced.arr);

	});

};

exports.log = logEmail;
exports.totalSent = totalSent;
exports.sentFromCount = sentByFrom;
