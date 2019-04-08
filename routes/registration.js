const express = require('express');
const router = express.Router();

/* GET registration page. */
router.get('/', function(req, res) {
	res.render("registration", {title: 'Registration Page'});
});

module.exports = router;
