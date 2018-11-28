var promise = require('promise');
var mongoose = require('mongoose');
var mo = require('./mo');

var maintain = function(questionario){
	return new promise(function(resolve,reject) {
        gablBase.cleanObj(questionario);
        if (questionario._id == undefined){
            mo.Questionario.create(
                questionario,
                function (err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.toObject());
                    }
                }
            );
        } else {
            mo.Questionario.update(
                {_id: questionario._id},
                questionario,
                function (err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(questionario);
                    }
                }
            );
        }           
    });	
};

var list = function(filter, limit){
	return new promise(function(resolve,reject) {
        gablBase.cleanObj(filter);
        mo.Questionario.find(filter)
            .limit(limit).lean()
            .exec(function (err, res) {
                if (err) {
                    reject([]);
                } else {
                    resolve(res);
                }
            });
	});
};

module.exports = {
	maintain: maintain,
    list: list
};