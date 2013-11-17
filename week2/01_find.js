var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : 100 };

    db.collection('grades').findOne(query, function(err, doc) {
        if(err) throw err;
        
        console.dir(doc);
        
        //db.close();
    });
    db.collection('grades').find(query).toArray(function(err, docs) {
        if(err) throw err;
        
        console.dir(docs);
        
        //db.close();
    });

    var cursor = db.collection('grades').find(query);

    //we can skip(5), limit(2), and sort('grade', 1) on the cursor
    //sort([['grade', 1], ['student', -1]])
    //or pass options as a third argument in find
    //var options = { 'skip' : 1, 'limit' : 4, 'sort' : [['grade', 1], ['student', -1]] };
    //var cursor = grades.find({}, {}, options);
    

    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        console.dir(doc.student + " got a good grade!");
    });


});
