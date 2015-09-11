var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( {"address.zipcode": "10075"} );		// get documents where zipcode is 10075
	cursor.each(function(err, doc) { 	// iterate through the docs returned by the query
		assert.equal(err, null);
		if (doc != null) { 		// if there's a matching doc
			console.dir(doc);	// print it to the console
		}
		else {
			callback();
		}
	});
};

// call the query function
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	findRestaurants(db, function() {
		db.close();
	});
});