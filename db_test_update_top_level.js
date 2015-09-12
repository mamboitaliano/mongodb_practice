var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

// updates the first document with name equal to "Juni", using the $set operator to update the cuisine field and the 
// $currentDate operator to update the lastModified field with the current date.
var updateRestaurants = function(db, callback) {
	db.collection('restaurants').updateOne(
		{
			"name": "Juni"
		},
		
		{
			$set: {"cuisine": "American (New)"},
			$currentDate: {"lastModified": true}
		}, 
		
		function(err, results) {
			console.log(results);
			callback();
		});
};

// call updateRestaurants
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	updateRestaurants(db, function() {
		db.close();
	});
});

