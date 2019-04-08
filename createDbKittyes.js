const mongoose = require('mongoose');
const logger = require('./libs/log')(module);

mongoose.connect('mongodb://localhost:27017/testWebShopRegistration', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	logger.info("Successfully connect");

	const kittySchema = new mongoose.Schema({
		name: String
	});

	kittySchema.methods.speak = function () {
		const greeting = this.name
			? "Meow name is " + this.name
			: "I don't have a name";
		logger.info(greeting);
	};

	const Kitten = mongoose.model('Kitten', kittySchema);

	const fluffy = new Kitten({ name: 'fluffy' });
	// fluffy.save(function (err, fluffy, affected) {
	// 	console.log(arguments);
	// 	if (err) return console.error(err);
	// 	fluffy.speak();// "Meow name is fluffy"
	// });

	const silence = new Kitten({ name: 'Silence' });
	logger.info(silence.name); // 'Silence'
	silence.speak();

	const tramp = new Kitten();
	tramp.speak();



	Kitten.find(function (err, kittens) {
		if (err) throw err;
		console.log(kittens);
	});

	Kitten.deleteMany({}, function (err) {
		if (err) throw err;
		logger.info('Success deleted');
	});

	Kitten.find(function (err, kittens) {
		if (err) throw err;
		console.log(kittens);
	});
});
