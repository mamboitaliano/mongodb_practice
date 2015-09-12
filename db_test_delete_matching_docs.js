var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


// remove all documents that match the specified condition:
var deleteRestaurants = function(db, callback) {
	db.collection('restaurants').deleteMany(
		{ 
			"borough": "Manhattan" // <--- this is the condition
		},
		function(err, results) {
			console.log(results);
			callback();
		}
	);
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	deleteRestaurants(db, function() {
		db.close();
	});
});

