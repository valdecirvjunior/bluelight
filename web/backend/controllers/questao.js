var promise = require('promise');
var questaoModel = require('../models/questao');

var maintain = function (req) {
	return new promise(function (resolve, reject) {
		questaoModel.maintain(req.body).then(function (result) {
			resolve(result);
		}).catch(function (e) {
			reject(e);
		});
	});
};

var list = function (req) {
	return new promise(function (resolve, reject) {
		questaoModel.list(req.body).then(function (result) {
			resolve(result);
		}).catch(function (e) {
			reject(e);
		});
	});
};

module.exports = {
	maintain: maintain,
	list: list
};