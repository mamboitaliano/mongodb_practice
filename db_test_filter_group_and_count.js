var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


// This pipeline uses $match to query the restaurants collection for documents with borough equal to "Queens" and cuisine equal to 
// Brazilian. Then the $group stage groups the matching documents by the address.zipcode field and uses the $sum accumulator 
// to calculate the count. $group accesses fields by the field path, which is the field name prefixed by a dollar sign $.
var aggregateRestaurants = function(db, callback) {
	db.collection('restaurants').aggregate(
		[
			{ $match: 
				{ 
					"borough": "Queens", "cuisine": "Brazilian" 
				} 
			},
			{ $group: 
				{
					"_id": "$address.zipcode", "count": { $sum: 1 }
				}
			}
		]
	).toArray(function(err, result) {
		assert.equal(err, null);
		console.log(result);
		callback(result);
	});
}

// call aggregateRestaurants
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	aggregateRestaurants(db, function() {
		db.close();
	});
});