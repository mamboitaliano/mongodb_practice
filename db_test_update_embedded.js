var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var updateRestaurants = function(db, callback) {
	db.collection('restaurants').updateOne(
		{ 
			"restaurant_id": "41156888" 
		},

		{ 
			$set: { "address.street": "East 31st Street"} 
		},

		function(err, results) {
			console.log(results);
			callback();
		});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	updateRestaurants(db, function() {
		db.close();
	});
});

