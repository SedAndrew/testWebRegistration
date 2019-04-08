const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
	res.render('login', {title: 'Login Page'});
});

module.exports = router;
