var express = require('express');
var router = express.Router();

var mailer = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');

var handleChain = require('../emailer/sendChain');

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

	var mailData = handleChain.handle(req);

	transport.sendMail(mailData, function(err, info) {
		if (err) {
			console.log(err);
		}
	});

	res.json({ status: "queued" });
});

router.post('/await', function(req, res) {

	var mailData = handleChain.handle(req);

	transport.sendMail(mailData, function(err, info) {

		if (err) {
			res.json({ status: "error", info: info });
		} else {
			res.json({ status: "sent"});
		}

	});

});

module.exports = router;
