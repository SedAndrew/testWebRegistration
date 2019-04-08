const mongoose = require('./libs/mongoose');
const async = require('async');

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers
], function (err, results) {
	console.log(arguments);
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
	// mongoose.connection.close().then(
	// 	() => { console.log('Disconnect server'); },
	// 	err => { console.error(`error (${err})`); }
	// );
});

function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	const db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require('./models/user');
	async.each(Object.keys(mongoose.models), function (modelName, callback) {
		mongoose.models[modelName].createIndexes(callback);
	}, callback);
}

function createUsers(callback) {

	const users = [
		{
			username: "Tester1",
			first_name: "FirstName1",
			second_name: "SecName1",
			password: "asdfghjkl"
		},
		{
			username: "Tester2",
			first_name: "FirstName2",
			second_name: "SecName2",
			password: "secret"
		},
		{
			username: "Tester3",
			first_name: "FirstName3",
			second_name: "SecName3",
			password: "12345"
		},
		{
			username: "admin",
			first_name: "Superuser1",
			second_name: "Hero",
			password: "shazam"
		}
	];

	async.each(users, function (userData, callback) {
		const user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);
}

/*
	db.dropDatabase(function (err) {
		if (err) throw err;

		async.parallel([
			function (callback) {
				const user1 = new User({
					username: "Tester1",
					first_name: "FirstName1",
					second_name: "SecName1",
					password: "asdfghjkl"
				});
				user1.save(function (err) {
					callback(err, user1);
				});
			},
			function (callback) {
				const user2 = new User({
					username: "Tester2",
					first_name: "FirstName2",
					second_name: "SecName2",
					password: "secret"
				});
				user2.save(function(err) {
					callback(err, user2);
				});
			},
			function (callback) {
				const user3 = new User({
					username: "Tester3",
					first_name: "FirstName3",
					second_name: "SecName3",
					password: "12345"
				});
				user3.save(function(err) {
					callback(err, user3);
				});
			},
			function (callback) {
				const admin = new User({
					username: "admin",
					first_name: "Superuser1",
					second_name: "Hero",
					password: "shazam"
				});
				admin.save(function(err) {
					callback(err, admin);
				});
			}
		], function (err, res) {
			console.log(arguments);
			mongoose.connection.close().then(
				() => { console.log('Disconnect server'); },
				err => { console.error(`error (${err})`); }
			);
		});

	});
});

*/

/*
const user = new User({
	username: "Tester5",
	first_name: "FirstName5",
	second_name: "SecName5",
	password: "secret"
});

user.save(function (err, user, affected) {
	if (err) throw err;

	User.findOne({username: "Tester"}, function (err, tester) {
		if (tester)
			console.log(tester);
		else
			console.log("Not Found!");
	});
});
*/