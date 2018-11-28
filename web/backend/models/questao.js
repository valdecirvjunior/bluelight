var promise = require('promise');
var mongoose = require('mongoose');
var mo = require('./mo');

var maintain = function(questao){
	return new promise(function(resolve,reject) {
        gablBase.cleanObj(questao);
        if (questao._id == undefined){
            mo.Questao.create(
                questao,
                function (err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc.toObject());
                    }
                }
            );
        } else {
            mo.Questao.update(
                {_id: questao._id},
                questao,
                function (err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(questao);
                    }
                }
            );
        }           
    });	
};

var list = function(filter, limit){
	return new promise(function(resolve,reject) {
        gablBase.cleanObj(filter);
        mo.Questao.find(filter)
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