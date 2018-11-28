var config = {
	dev: {
		mongo: {
			//url: "mongodb://localhost:27017/"
			url: "mongodb://admin:adminadmin1@ds044577.mlab.com:44577/bluelight"
		},
		port: 8080
	}
};
module.exports = function(mode) {
	return config[mode || process.argv[2] || 'dev'] || config.dev;
}