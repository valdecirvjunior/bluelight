var promise = require('promise');
var versaoModel = require('../models/versao');

var maintain = function (req) {
	return new promise(function (resolve, reject) {
		versaoModel.maintain(req.body).then(function (result) {
			resolve(result);
		}).catch(function (e) {
			reject(e);
		});
	});
};

var list = function (req) {
	return new promise(function (resolve, reject) {
		versaoModel.list(req.body).then(function (result) {
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