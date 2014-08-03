var express = require('express');
var router = express.Router();

var mailBuilder = require('../emailer/mailBuilder');
var stats = require('../emailer/statsStore');

var mailer = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');
var transport = mailer.createTransport(stubTransport());


router.get('/', function(req, res) {

	var routes = [];

	router.stack.forEach(function(item) {
		routes.push({
			path: item.route.path,
			method: item.route.stack[0].method,
		});
	});

	res.render('send', { routes: routes });
})

router.post('/async', function(req, res) {

	var parsed = mailBuilder.parse(req.body);
	var mail = mailBuilder.build(parsed);

	transport.sendMail(mail, function(err, info) {
		if (err) {
			console.log(err);
		}
	});

	var result = { status: "queued" };

	res.json(result);
	stats.log(parsed, result);

});

router.post('/await', function(req, res) {

	var parsed = mailBuilder.parse(req.body);
	var mail = mailBuilder.build(parsed);

	transport.sendMail(mail, function(err, info) {

		var result;

		if (err) {
			result = { status: "error", info: info };
		} else {
			result = { status: "sent"};
		}

		res.json(result);
		stats.log(parsed, result);
	});

});

module.exports = router;
