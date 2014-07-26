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
	res.json({});
});

router.post('/await', function(req, res) {
	res.json({});
});

router.post('/bulk', function(req, res) {
	res.json({});
})

module.exports = router;
