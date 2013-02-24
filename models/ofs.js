/**
 * Created with IntelliJ IDEA.
 * User: dloureiro
 * Date: 22/02/13
 * Time: 08:16
 * To change this template use File | Settings | File Templates.
 */
var csv = require('csv');
var fs = require('fs');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/pschttDB');

mongoose.connection.on('open', function () {
    console.log('Connected to Mongoose');
});

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

// create Widget model
var OF = new Schema({
    code: {type: Number, require: true, trim: true, unique: true},
    title: {type: String, required: true, trim: true},
    state: {type: String, required: true, trim: true},
    type: {type: String, required: true, trim: true},
    changeable: {type: Boolean, required: true},
    cir: {type: Boolean, required: true},
    description: {type: String}
});

var OF = mongoose.model('OF', OF);

exports.ofs = OF;


exports.checkDB = function (callback) {
    OF.count({}, function (err, count) {
        if (err) {
            console.log(err);
            callback(false);
        } else {
            console.log("number of elements in the database " + count);
            callback((count > 0) ? true : false);
        }
    });
}


exports.dropDB = function (callback) {
    OF.remove({}, function (err) {
        if (err) {
            console.log(err);
            callback(false);
        }
        else{
            console.log('collection removed');
            callback(true);
        }

    });
}

exports.initDB = function (callback) {

    csv().from.stream(fs.createReadStream(__dirname + '/liste-of_new.csv'), {columns: true, delimiter: ";"})
        .on('record', function (row, index) {

            row.changeable = (row.changeable == "FAUX") ? false : true;
            row.cir = (row.cir == "FAUX") ? false : true;

            var anOF = {
                code: parseInt(row.code),
                title: row.title,
                state: row.state,
                type: row.type,
                changeable: row.changeable,
                cir: row.cir,
                description: row.description
            }
            //console.log(anOF);
            var widgetObj = new OF(anOF);

            widgetObj.save(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(data);
                }
            });
        })
        .on('end', function (count) {
            console.log("Database pschttDB initialized.");
            console.log('Number of lines: ' + count);
            callback((count > 0) ? true : false);
        })
        .on('error', function (error) {
            console.log(error.message);
            callback(false);
        });
}