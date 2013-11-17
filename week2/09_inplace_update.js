var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    
    var query = { 'assignment' : 'hw1' };
    var operator = { '$set' : { 'date_returned' : new Date() } };
    var options = { 'multi': true };


        db.collection('grades').update(query, operator, options, function(err, updated) {
            if(err) throw err;

            console.dir(updated);

            return db.close();
        });

});

//upsert example - creating doc if it doesn't exist
MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    
    var query = { 'student' : 'mongo', 'assignment' : 'hw1' };
    var operator = { 'student' : 'mongo', 'assignment' : 'hw1', 'grade' : 100 };
    var options = { 'upsert': true };


        db.collection('grades').update(query, operator, options, function(err, upserted) {
            if(err) throw err;

            console.dir(upserted);

            return db.close();
        });

});


//findAndModify - automically finds and updates the doc
MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    
    var query = { 'student' : 'Joe' };
    var sort = []; //if the query is not scpecific enough
    var operator = { '$inc' : { 'grade' : 10 } };
    var options = { 'upsert': true };


        db.collection('grades').findAndModify(query, sort, operator, options, function(err, upserted) {
            if(err) throw err;

            console.dir(upserted);

            return db.close();
        });

});
