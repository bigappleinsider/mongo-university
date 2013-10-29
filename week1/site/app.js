
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require( 'mongoose' )
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//export NODE_ENV=production
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect( 'mongodb://localhost/nycdata' );
var Store = new mongoose.Schema({
    "address_location" : String,
    "address_street_name" : String,
    "address_zip_code" : Number,
    "camis_trade_name" : String,
    "entity_name" : String,
    "entity_type" : String,
    "license_number" : Number,
    "location_1" : String,
    "location_2" : String,
    "location_3" : String,
    "telephone_number" : Number
});

var StoreModel = mongoose.model( 'electronic_stores', Store );


app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

StoreModel.findOne( function( err, stores ) {
    
    if( !err ) {
        console.log(stores);
        //return stores ;
    } else {
        //return [];
        console.log('dffff');
    }
});


});
