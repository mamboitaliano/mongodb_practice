var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


// Specify a logical disjunction (OR) for a list of query conditions by using the $or query operator;
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find(
       { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
   );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
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