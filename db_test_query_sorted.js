var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


// retrieve all documents in the restaurants collection, sorted first by the borough field in ascending order, and then, 
// within each borough, by the "address.zipcode" field in ascending order.
var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find().sort( {"borough": 1, "address.zipcode": 1} );
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

// call findRestaurants
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err) 

	findRestaurants(db, function() {
		db.close();
	});
});