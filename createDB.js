const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const logger = require('./libs/log')(module);
const format = require('util').format;

// If you are using mongoose:

// Connection URL
const url = 'mongodb://localhost:27017'; //,localhost:27017/login,localhost:27017/registration,localhost:27017/schedule';

// Database Name
const dbName = 'web_shop_train_tickets';

// Create a new MongoClient
const client = new MongoClient(url, {
	useNewUrlParser: true, poolSize: 10
});

// Use connect method to connect to the Server
client.connect( function(err) {
	if (err) throw err;

	assert.equal(null, err);
	logger.info("Connected successfully to server. DB := " + dbName);

	const db = client.db(dbName);

	insertDocuments(db, function() {
		indexCollection(db, function() {
			findDocuments(db, function() {
				updateDocument(db, function() {
					removeDocument(db, function() {
						// removeDocuments(db, function() {
							client.close();
						// });
					});
				});
			});
		});
	});


});

const insertDocuments = function(db, callback) {
	// Get the documents collection
	const collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([
		{a : 1}, {a : 2}, {a : 3}
	], function(err, result) {
		if (err) throw err;
		// assert.equal(err, null);
		// assert.equal(3, result.result.n);
		// assert.equal(3, result.ops.length);
		logger.info("Inserted 3 documents into the collection");
		callback(result);
	});
};

const findDocuments = function(db, callback) {
	// Get the documents collection
	const collection = db.collection('documents');
	// Find some documents
	const cursore = collection.find({});
	cursore.toArray(function(err, docs) {
		if (err) throw  err;
		logger.info("Found the following records");
		console.dir(docs);
		callback(docs);
	});
};

const updateDocument = function(db, callback) {
	// Get the documents collection
	const collection = db.collection('documents');
	// Update document where a is 2, set b equal to 1
	collection.updateOne({ a : 2 }
		, { $set: { b : 1 } }, function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			logger.info("Updated the document with the field a equal to 2");
			callback(result);
		});
};

const removeDocuments = function(db, callback) {
	const collection = db.collection('documents');
	collection.deleteMany({}, function (err, res) {
		if (err) throw err;

		logger.info("Removed All document");
		callback(res);
	});

};

const removeDocument = function(db, callback) {
	// Get the documents collection
	const collection = db.collection('documents');
	// Delete document where a is 3
	collection.deleteOne({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		logger.info("Removed the document with the field a equal to 3");
		callback(result);
	});
};

const indexCollection = function(db, callback) {
	db.collection('documents').createIndex(
		{ "a": 1 },
		null,
		function(err, results) {
			logger.info(results);
			callback();
		}
	);
};