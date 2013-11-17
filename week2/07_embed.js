var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    
    //nested documents
    var query2 = { 'media.oembed.type' : 'video' };

    var projection2 = { 'media.oembed.url' : true, 'title' : true, '_id' : false };
    
    db.collection('reddit-front').find(query2, projection2).each(function(err, doc) {
        if(err) throw err;

        if(doc == null){
            return db.close();
        }
        console.dir(doc);
    });



});
