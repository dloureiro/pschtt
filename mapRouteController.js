exports.mapRoute = function(app, prefix) {

   prefix = '/' + prefix;

   var prefixObj = require('./controllers/' + prefix);

   // collection : get
   app.get(prefix, prefixObj.collection_get);
/*
   // collection : create
   app.post(prefix + "s", prefixObj.collection_create);

   // collection : update
   app.put(prefix + "s", prefixObj.collection_update);

   // collection : delete
   app.del(prefix + "s", prefixObj.collection_delete);
*/
   // get
   app.get(prefix + '/:_id', prefixObj.item_get);

    // show
//    app.get(prefix + '/:_id/show', prefixObj.item_show);

    // create
//    app.get(prefix + '/create', prefixObj.item_new);


    // create
   app.post(prefix, prefixObj.item_create);

   // update
   app.put(prefix + '/:_id', prefixObj.item_update);

   // destroy
   app.del(prefix + '/:_id', prefixObj.item_delete);

};