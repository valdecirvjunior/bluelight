var express = require('express');
var questao = require('../controllers/questao');

var router = function () {
    var routerQuestao = express.Router();
    routerQuestao.route('/maintain').post(function (req, res) {
        questao.maintain(req).then(function (result) {
            res.json(result);
        }).catch(function (e) {
            res.json(e);
        });
    });

    routerQuestao.route('/list').post(function (req, res) {
        questao.list(req).then(function (result) {
            res.json(result);
        }).catch(function (e) {
            res.json(e);
        });
    });

    return routerQuestao;
};

module.exports = {
    router: router
};