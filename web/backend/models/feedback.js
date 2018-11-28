var promise = require('promise');
var mongoose = require('mongoose');
var mo = require('./mo');

var maintain = function(feedback){
	return new promise(function(resolve,reject) {
        gablBase.cleanObj(feedback);
        if (feedback._id == undefined){
            mo.Feedback.create(
                feedback,
                function (err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.toObject());
                    }
                }
            );
        } else {
            mo.Feedback.update(
                {_id: feedback._id},
                feedback,
                function (err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(feedback);
                    }
                }
            );
        }           
    });	
};

var list = function(filter, limit){
	return new promise(function(resolve,reject) {
        gablBase.cleanObj(filter);
        mo.Feedback.find(filter)
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