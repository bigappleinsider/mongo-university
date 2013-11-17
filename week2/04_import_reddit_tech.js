var MongoClient = require('mongodb').MongoClient,
    request = require('request');

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    //download json
    request('http://www.reddit.com/r/technology/.json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            //extract strories
            var stories = obj.data.children.map(function (story) {
                return story.data;
            });
        
            //insert into reddit collection
            db.collection('reddit').insert(stories, function(err, data) {
                if(err) throw err;
                console.dir(data);
                db.close();
            });
        }
    });
});
