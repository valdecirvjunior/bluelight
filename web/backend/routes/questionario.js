var express = require('express');
var questionario = require('../controllers/questionario');

var router = function () {
    var routerQuestionario = express.Router();
    routerQuestionario.route('/maintain').post(function (req, res) {
        questionario.maintain(req).then(function (result) {
            res.json(result);
        }).catch(function (e) {
            res.json(e);
        });
    });

    routerQuestionario.route('/list').post(function (req, res) {
        questionario.list(req).then(function (result) {
            res.json(result);
        }).catch(function (e) {
            res.json(e);
        });
    });

    return routerQuestionario;
};

module.exports = {
    router: router
};