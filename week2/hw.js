var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var query = {};


    var cursor = db.collection('data').find(query);
    cursor.sort([['State', 1], ['Temperature', -1]]);

    //we can skip(5), limit(2), and sort('grade', 1) on the cursor
    //sort([['grade', 1], ['student', -1]])
    //or pass options as a third argument in find
    //var options = { 'skip' : 1, 'limit' : 4, 'sort' : [['grade', 1], ['student', -1]] };
    //var cursor = grades.find({}, {}, options);
    
    var temp;
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        if(temp == null || temp.State != doc.State){
/*
        if(temp == null){
            temp = doc;
            console.dir(doc.State);
        }
*/
            console.dir(doc.State);
            console.dir(doc.Temperature);
            console.dir(doc._id);
            var update = { '$set' : { 'month_high': true}};
            query['_id'] = doc['_id'];
            doc['month_high'] = true;
            
            db.collection('data').update(query, update, function(err, updated) {
                if(err) throw err;

            console.dir(doc._id);
                console.dir( 'updated :'+updated);
            });
        }
       temp = doc;
        //console.dir(doc);
    });


});
