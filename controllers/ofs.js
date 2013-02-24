var OF = require("../models/ofs.js");

/*
 Collection management
 */

// get collection
exports.collection_get = function (req, res) {
    OF.ofs.find({}, function (err, docs) {
        //var myOfsList= { ofs: docs };
        //console.log(myOfsList);
        res.send(docs);
    });

};

// update the collection
exports.collection_update = function (req, res) {

}

// create the collection
exports.collection_create = function (req, res) {

}

// destroy the collection
exports.collection_delete = function (req, res) {

}

// ---------

/*
 Item management
 */

// get a item
exports.item_get = function (req, res) {
    var indx = req.params._id;
    OF.ofs.findOne({_id: indx}, function (err, doc) {
        if (err)
            res.send('There is no OF with _id of ' + indx);
        else {
            //var myOF = {of:doc};
            res.send(doc);
        }
    });
};


// add a item
exports.item_create = function (req, res) {
    var of =
    {
        code: parseInt(req.body.code),
        title: req.body.title,
        description: req.body.description,
        state: req.body.state,
        type: req.body.type,
        changeable: !!((req.body.changeable == "true")),
        cir: !!((req.body.cir == "true"))

    };
    var OfObj = new OF.ofs(of);

    OfObj.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            console.log(data);
            res.send(data);
        }
    });
};

// delete a item
exports.item_delete = function (req, res) {
    var indx = req.params._id;

    OF.ofs.remove({_id: indx}, function (err) {
        if (err) {
            res.send('There is no OF with _id of ' + indx);
        } else {
            console.log('deleted ' + indx);
            res.send('deleted ' + indx);
        }
    });

    console.log('deleted ' + req.params._id);
    res.send('deleted ' + req.params._id);
};

exports.checkDB = function (req, res) {
    OF.checkDB(function(data){
        res.send({state:data});
    });

};

exports.dropDB = function (req, res) {
    OF.dropDB(function(data){
        res.send({state:data});
    });

};

exports.initDB = function (req, res) {
    OF.initDB(function(data){
        res.send({state:data});
    });


}

// update a item
exports.item_update = function (req, res) {
    var indx = req.params._id;
    var of =
    {    id: indx,
        code: parseInt(req.body.code),
        title: req.body.title,
        description: req.body.description,
        state: req.body.state,
        type: req.body.type,
        changeable: !!((req.body.changeable == "true")),
        cir: !!((req.body.cir == "true"))
    };
    OF.ofs.update({_id: indx}, of, function (err) {
        if (err)
            res.send('Problem occured with update' + err)
        else
            res.send(of)
    });
};