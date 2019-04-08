const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render("home", {title: 'Home Page'});
});

router.get('/registration', function(req, res) {
	res.render("registration", {title: 'Registration Page'});
});

module.exports = router;
