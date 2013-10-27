var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/test', function(err, db){
    
    if(err) throw err;
    db.collection('coll').findOne({}, function(err, doc){
        console.dir(doc);
        db.close();
    });
    console.log("Called find One!");
});
