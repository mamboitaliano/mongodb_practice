var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

// updates all documents that have address.zipcode field equal to "10016" and cuisine field equal to "Other", setting the 
// cuisine field to "Category To Be Determined" and the lastModified field to the current date:
var updateRestaurants = function(db, callback) {
	db.collection('restaurants').updateMany(
		{ 
			"address.zipcode": "10016", "cuisine": "Other" 
		},
		{
			$set: { cuisine: "TBD" },
			$currentDate: { "lastModified": true }
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