var express = require('express');
var router = express.Router();

router.get('/async', function(req, res) {
	res.json({});
});

router.get('/await', function(req, res) {
	res.json({});
});

router.get('/bulk', function(req, res) {
	res.json({});
})

module.exports = router;
