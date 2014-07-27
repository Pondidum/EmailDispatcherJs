var express = require('express');
var router = express.Router();

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

var formatEmail = function(model) {
	if (model.name != "") {
		return model.name + " <" + model.address + ">";
	}

	return model.address;

}

router.post('/async', function(req, res) {

	var to = JSON.parse(req.body.to);
	var from = JSON.parse(req.body.from);
	var subject = req.body.subject;
	var body = req.body.body;
	var htmlBody = req.body.htmlBody;

	var mailData = {
		from: formatEmail(from),
		to: to.map(formatEmail),
		subject: subject,
		text: body,
		html: htmlBody
	};

	console.log(mailData);

	transport.sendMail(mailData, function(err, info) {
		console.log(err);
	});

	res.json({ status: "queued" });
});

router.post('/await', function(req, res) {
	res.json({});
});

router.post('/bulk', function(req, res) {
	res.json({});
})

module.exports = router;
