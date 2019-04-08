const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render("develop", {title: 'Develop Page'});
});

module.exports = router;
