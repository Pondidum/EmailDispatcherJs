var express = require('express');
var router = express.Router();

var stats = require('../emailer/stats');

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', {
  	title: 'EmailDispatcherJS'
  });

});

router.get('/stats', function(req, res) {

	stats.sentFromCount(function(groups) {

		//console.log(groups);
		res.render('stats', {
			groups: groups
		});

	});

});

module.exports = router;
