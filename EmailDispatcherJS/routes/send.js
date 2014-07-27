var express = require('express');
var router = express.Router();

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

	var to = JSON.parse(req.body.to);
	var from = JSON.parse(req.body.from);
	var subject = req.body.subject;
	var body = req.body.body;

	console.log("Email:")
	console.log("  From: " + from.Name + " (" + from.address + ")");
	console.log("  To: " + to[0].Name + " (" + to[0].address + ")");
	console.log("  Subject: " + subject);
	console.log("  Body: " + body);

	res.json({ status: "success", to: to[0].name, from: from.name});
});

router.post('/await', function(req, res) {
	res.json({});
});

router.post('/bulk', function(req, res) {
	res.json({});
})

module.exports = router;
