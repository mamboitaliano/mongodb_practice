exports.url = function() {
	return 'mongodb://localhost:27017/test';
}

exports.MongoClient = function() {
	return require('mongodb').MongoClient;
}

exports.assert = function() {
	return require('assert');
}

exports.ObjectId = function() {
	return require('mongodb').ObjectID;
}
	// url: function() {
	// 	return 'mongodb://localhost:27017/test';
	// }