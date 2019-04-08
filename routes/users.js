const express = require('express');
const router = express.Router();

/* GET users listing. */

const User = require('../models/user').User;
router.get('/', function(req, res, next) {
  User.find({}, function (err, users) {
    if (err) throw next(err);
    res.json(users);
	});
  // res.send('respond with a resource');
});
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
		if (err) throw next(err);
		if (!user) {
			next(new HttpError(404, "User Not Found"));
		}
		res.json(user);
	});
});

module.exports = router;
