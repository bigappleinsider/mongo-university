var express = require('express'),
    app = express();

//how to handle requests to '/'
app.get('/', function(req, resp) {
    resp.send('Hello, World!');
});

app.get('*', function(req, resp){
    resp.send('Page not found', 404);
});

app.listen(8080);
console.log('Express server started on 8080');
