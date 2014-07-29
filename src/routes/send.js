var express = require('express');
var router = express.Router();

var mailBuilder = require('../emailer/mailBuilder');
var stats = require('../emailer/stats');

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

	var mailData = mailBuilder.build(req.body);

	transport.sendMail(mailData, function(err, info) {
		if (err) {
			console.log(err);
		}
	});

	var result = { status: "queued" };

	res.json(result);
	stats.log(mailData, result);

});

router.post('/await', function(req, res) {

	var mailData = mailBuilder.build(req.body);

	transport.sendMail(mailData, function(err, info) {

		var result;

		if (err) {
			result = { status: "error", info: info };
		} else {
			result = { status: "sent"};
		}

		res.json(result);
		stats.log(mailData, result);
	});

});

module.exports = router;
