var widgets = [
   { id : 1,
     name : "The Great Widget",
     price : 1000.00
   }
]

// index listing of widgets at /widgets/
exports.index = function(req, res) {
    var myWidgetsList= { widgets: widgets };
   res.send(myWidgetsList);
};

// display new widget form
exports.new = function(req, res) {
   //res.send('displaying new widget form');
   // display new widget form
    var filePath = require('path').normalize(__dirname + "/../public/widgets/new.html");
    res.sendfile(filePath);
};

// show widget form
exports.show = function(req, res) {
    var filePath = require('path').normalize(__dirname + "/../public/widgets/show.html");
    res.sendfile(filePath);
};

// get a widget
exports.get = function(req, res) {
   var indx = parseInt(req.params.id) - 1;
   if (!widgets[indx])
      res.send('There is no widget with id of ' + req.params.id);
   else
    var aWidget = {widget:widgets[indx]};
    res.send(aWidget);
    //var filePath = require('path').normalize(__dirname + "/../public/widgets/show.html");
    //res.sendfile(filePath);
};


// add a widget
exports.create = function(req, res) {
  var indx = widgets.length + 1;
  widgets[widgets.length] =
   { id : indx,
     name : req.body.widgetname,
     price : parseFloat(req.body.widgetprice) };
  console.log(widgets[indx-1]);
  var myWidget={widget:widgets[indx-1]};
  console.log("Sending " + indx);
  res.send(myWidget);
    //req.params.id=indx;
    //exports.show(req,res);
};

// delete a widget
exports.destroy = function(req, res) {
   var indx = req.params.id - 1;
   delete widgets[indx];

   console.log('deleted ' + req.params.id);
   res.send('deleted ' + req.params.id);
};

// display edit form
exports.edit = function(req, res) {
   res.send('displaying edit form');
};


// update a widget
exports.update = function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  widgets[indx] =
   { id : indx,
     name : req.body.widgetname,
     price : parseFloat(req.body.widgetprice)}
  console.log(widgets[indx]);
  res.send ('Updated ' + req.params.id);
};