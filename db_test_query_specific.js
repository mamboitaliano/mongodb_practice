var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

// find documents whose borough field equals "Manhattan"
var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( {"name": "Juni"} ); // <----- Specify criteria here
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

// Call the findRestaurants function
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	findRestaurants(db, function() {
		db.close();
	});
});
