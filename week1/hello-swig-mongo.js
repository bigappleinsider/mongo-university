/* *** create db ***
use course
db.hello_mongo_express.insert({'name': 'MongoDB'});
db.hello_mongo_express.find();
{ "_id" : ObjectId("526d8209cad318e34dbe4496"), "name" : "MongoDB" }
*/

var express = require('express'),
    consolidate = require('consolidate'),
    app = express(),
    Server = require('mongodb').Server,
    MongoClient = require('mongodb').MongoClient;

//Integrate templating engine with express
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new Server('localhost', 27017, {'native_parser': true}));
var db = mongoclient.db('course');

//how to handle requests to '/'
app.get('/', function(req, resp) {
    db.collection('hello_mongo_express').findOne({}, function(err, doc){
        resp.render('hello', doc);
    });
});

app.get('*', function(req, resp){
    resp.send('Page not found', 404);
});

mongoclient.open(function(err, mongoclient){
    if(err) throw err;
    app.listen(8080);
    console.log('Express server started on 8080');
});

