var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    

    //db.reddit.find({ 'title' : { '$regex' : 'Facebook' } }).pretty()
    var query = { 'title' : { '$regex' : 'Facebook'} };
    var projections = {'author' : true, 'score' : true, 'url' : true, 'title' : true, 'num_comments' : true, '_id' : false};

    db.collection('reddit').find(query, projections).toArray(function(err, docs) {
        if(err) throw err;
        
       docs.forEach(function(doc){
            console.dir(doc);
        });
        db.close();
    });

});
