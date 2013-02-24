var express = require("express")
  , http = require("http")
  , map = require("./mapRouteController")
  , app = express();

app.configure(function(){
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.staticCache({maxObjects: 100, maxLength: 512}));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.directory(__dirname + '/public'));
  app.use(function(req, res, next){
    throw new Error(req.url + ' not found');
  });
  app.use(function(err, req, res, next) {
    console.log(err);
    res.send(err.message);
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var prefixes = ['ofs'];

//map route to controller
prefixes.forEach(function(prefix){
   map.mapRoute(app,prefix); 
});

var pschttParameters = require("./controllers/pschtt");

app.get("/pschttParameters",pschttParameters.index);

var OF = require("./controllers/ofs");

app.get("/ofsDB/init", OF.initDB);
app.get("/ofsDB/check", OF.checkDB);
app.get("/ofsDB/drop", OF.dropDB);

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");