var promise = require('promise');
var feedbackModel = require('../models/feedback');

var maintain = function (req) {
	return new promise(function (resolve, reject) {
		feedbackModel.maintain(req.body).then(function (result) {
			resolve(result);
		}).catch(function (e) {
			reject(e);
		});
	});
};

var list = function (req) {
	return new promise(function (resolve, reject) {
		feedbackModel.list(req.body).then(function (result) {
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