var pad = require('pad-left');

var convertDate = function(date){
    var s = date.split("-");
	return s[2] + "-" + pad(s[1], 2, '0') + "-" + pad(s[0], 2, '0');
};

module.exports = {
	convertDate: convertDate
};