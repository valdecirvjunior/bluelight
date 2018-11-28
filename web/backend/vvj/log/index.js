var log4js = require('log4js');

try {
	require('fs').mkdirSync('./logFile');
} catch (e) {
	if (e.code != 'EEXIST') {
		console.error("Could not set up log directory, error was: ", e);
		process.exit(1);
	}
}
//log4js.configure('./config/log4js.json');

var loggerError = log4js.getLogger("error");
var loggerAll = log4js.getLogger("all");

var debug = function(logMsg){
	loggerAll.debug(logMsg);
}
var info = function(logMsg){
	loggerAll.info(logMsg);
}
var error = function(logMsg){
	loggerAll.error(logMsg);
	loggerError.error(logMsg);
}
module.exports = {
  debug: debug,
  info: info,
  error: error
}