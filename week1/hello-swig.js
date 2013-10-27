var express = require('express'),
    consolidate = require('consolidate'),
    app = express();

//Integrate templating engine with express
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//how to handle requests to '/'
app.get('/', function(req, resp) {
    resp.render('hello', {'name': 'Swig'});
});

app.get('*', function(req, resp){
    resp.send('Page not found', 404);
});

app.listen(8080);
console.log('Express server started on 8080');
