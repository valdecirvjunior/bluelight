var promise = require('promise');
var questionarioModel = require('../models/questionario');

var maintain = function (req) {
	return new promise(function (resolve, reject) {
		questionarioModel.maintain(req.body).then(function (result) {
			resolve(result);
		}).catch(function (e) {
			reject(e);
		});
	});
};

var list = function (req) {
	return new promise(function (resolve, reject) {
		questionarioModel.list(req.body).then(function (result) {
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