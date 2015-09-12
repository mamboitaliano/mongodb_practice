var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var dropRestaurants = function(db, callback) {
	db.collection('restaurants').drop(function(err, response) {
		console.log(response);
		callback();
	});
};

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	dropRestaurants(db, function() {
		db.close();
	});
});

