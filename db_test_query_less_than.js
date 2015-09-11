var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

// Query for documents whose grades array contains an embedded document with a field score less than 3:
var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( { "grades.score" : {$lt: 3} } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		}
		else {
			callback();
		}
	});
};

// call findRestaurants:
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	findRestaurants(db, function() {
		db.close();
	});
});