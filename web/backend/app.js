// _log = require('./abl/log');
// _config = require('./config')(); //global var, first run
// var compression = require('compression');
// var express = require('express');        // call express
// var app = express();                 // define our app using express
// var bodyParser = require('body-parser');
// var db = require('./models/db')

// app.use(compression());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var router = express.Router();

// router.get('/', function (req, res) {
// 	res.json({ message: 'TresaPdv !' });
// });
// app.use('/', router);

// app.use('/feedback', require('./routes/feedback').router());
// app.use('/questao', require('./routes/questao').router());
// app.use('/questionario', require('./routes/questionario').router());
// app.use('/versao', require('./routes/versao').router());

// app.use(function (err, req, res, next) {
// 	_log.error(err.stack);
// 	console.error("Erro express");
// 	res.status(500).send('Serviço indisponível');
// });

// app.listen(_config.port);
// console.log('Listen ' + _config.port);







_log = require('./abl/log');
_config = require('./config')(); //global var, first run
var compression = require('compression');
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var db = require('./models/db')

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname + '/release'));
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/release/index.html'));
  });

app.use('/feedback', require('./routes/feedback').router());
app.use('/questao', require('./routes/questao').router());
app.use('/questionario', require('./routes/questionario').router());
app.use('/versao', require('./routes/versao').router());

app.use(function (err, req, res, next) {
	_log.error(err.stack);
	console.error("Erro express");
	res.status(500).send('Serviço indisponível');
});

app.listen(process.env.PORT || _config.port);
console.log('Listen ' + _config.port);