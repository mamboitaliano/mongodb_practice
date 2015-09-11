var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( {"grades.grade": "B"} );
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

// Call the findRestaurant function
MongoClient.connect(url, function(err, db) { // <--- callback function
	assert.equal(null, err);

	findRestaurants(db, function() {
		db.close();
	});
});
