var request = require('request');
var Promise = require('promise');

var options = {
	json: true
};

var post = function(url, headers, data){
	return new Promise(function(resolve,reject) {
		headers['Content-Type'] = 'application/json';
		options.headers = headers;
  		options.url = url;
		options.body = data;
		request.post(options, function(error, response, body) {
			try {
				if (!error && response.statusCode == 200) {
					body.statusCode = response.statusCode;
					resolve(body);
				} else {
					reject(error);
				} 
			} catch (err){
				reject(err);
			}
  		});
	});
};

var get = function(url, headers){
	return new Promise(function(resolve,reject) {
		headers['Content-Type'] = 'application/json';
		options.headers = headers;
  		options.url = url;
		request.get(options, function(error, response, body) {
			try {
				if (!error && response.statusCode == 200) {
					body.statusCode = response.statusCode;
					resolve(body);
				} else {
					reject("Falha de comunicação");
				} 
			} catch (err){
				reject(err);
			}
  		});
	});
};

var cleanObj = function(obj) {
	for (var propName in obj) { 
	  if (obj[propName] === null || obj[propName] === undefined) {
		delete obj[propName];
	  }
	}
};

var objError = function(msg){
	return {
		error: msg
	};
}

var constants = {
	CREDIT: "credit",
	DEBIT: "debit",
	STATUS: { 
		WAIT: 0,
		STARTED: 1,
		FINISHED: 2,
		ERROR: 3
	},
	DEBITTYPE: {
		TAX: "tax",
		DRAWOUT: "drawOut"
	}
}

module.exports = {
	post: post,
	get: get,
	cleanObj: cleanObj,
	objError: objError,
	constants: constants
};
