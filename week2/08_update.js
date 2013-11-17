var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    
    var query = { 'assignment' : 'hw1' };

    db.collection('grades').findOne(query, function(err, doc) {
        if(err) throw err;

        if(!doc){
            console.og('not found')
            return db.close();
        };

        query['_id'] = doc['_id'];
        doc['date_returned'] = new Date();

        db.collection('grades').update(query, doc, function(err, updated) {
            if(err) throw err;

            console.dir(updated);

            return db.close();
        });
        
    });

});
