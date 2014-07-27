var express = require('express');
var router = express.Router();

var mailer = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');

var transport = mailer.createTransport(stubTransport());

var formatEmail = function(model) {

	if (model.name != "") {
		return model.name + " <" + model.address + ">";
	}

	return model.address;
}

var buildMail = function(requestBody) {

	var to = JSON.parse(requestBody.to);
	var from = JSON.parse(requestBody.from);
	var subject = requestBody.subject;
	var body = requestBody.body;
	var htmlBody = requestBody.htmlBody;

	var mailData = {
		from: formatEmail(from),
		to: to.map(formatEmail),
		subject: subject,
		text: body,
		html: htmlBody
	};

	return mailData;
}

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

	var mailData = buildMail(req.body);

	transport.sendMail(mailData, function(err, info) {
		if (err) {
			console.log(err);
		}
	});

	res.json({ status: "queued" });
});

router.post('/await', function(req, res) {

	var mailData = buildMail(req.body);

	transport.sendMail(mailData, function(err, info) {

		if (err) {
			res.json({ status: "error", info: info });
		} else {
			res.json({ status: "sent"});
		}

	});

});

module.exports = router;
