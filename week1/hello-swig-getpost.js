var express = require('express'),
    consolidate = require('consolidate'),
    app = express();

//Integrate templating engine with express
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(app.router);

function errorHandler(err, req, res, next){
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error', {error: err});

}
app.use(errorHandler);
//how to handle requests to '/'
app.get('/', function(req, resp) {
    resp.render('hello', {'name': 'Swig'});
});
app.post('/submit', function(req, res, next){
    var name = req.body.name;
    if(typeof name == 'undefined' || name == ''){
        next(Error('Name is required'));
    }
    else{
        res.send("Author " + name + " is added to the database");
    }
});
app.get('/view/:name', function(req, resp, next){
    var name = req.params.name;
    var count = req.query.count;
    resp.render('getpost', {'name': name, 'count': count});
});


app.listen(8080);
console.log('Express server started on 8080');
