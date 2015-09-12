var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

// To replace the entire document except for the _id field, pass an entirely new document as the second argument to the 
// replaceOne method. The replacement document can have different fields from the original document. In the replacement 
// document, you can omit the _id field since the _id field is immutable. If you do include the _id field, it must be 
// the same value as the existing value.
var updateRestaurants = function(db, callback) {
	db.collection('restaurants').replaceOne(
		{ 
			"restaurant_id": "41704620" 
		},

		{
			"name": "Vella 2",
			"address": 
			{
				"coord": [ -73.9557413, 40.7720266 ],
				"building": "1480",
				"street": "2 Avenue",
				"zipcode": "10075"
			}
		},
		function(err, results) {
			console.log(results);
			callback();
	});
};

// call updateRestaurants:
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	updateRestaurants(db, function() {
		db.close();
	});
});

