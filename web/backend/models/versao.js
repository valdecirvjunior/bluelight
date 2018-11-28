var promise = require('promise');
var mongoose = require('mongoose');
var mo = require('./mo');

var maintain = function(versao){
	return new promise(function(resolve,reject) {
        gablBase.cleanObj(versao);
        if (versao._id == undefined){
            mo.Versao.create(
                versao,
                function (err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.toObject());
                    }
                }
            );
        } else {
            mo.Versao.update(
                {_id: versao._id},
                versao,
                function (err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(versao);
                    }
                }
            );
        }           
    });	
};

var list = function(filter, limit){
	return new promise(function(resolve,reject) {
        gablBase.cleanObj(filter);
        mo.Versao.find(filter)
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