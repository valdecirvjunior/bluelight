var express = require('express');
var versao = require('../controllers/versao');

var router = function () {
    var routerVersao = express.Router();
    routerVersao.route('/maintain').post(function (req, res) {
        versao.maintain(req).then(function (result) {
            res.json(result);
        }).catch(function (e) {
            res.json(e);
        });
    });

    routerVersao.route('/list').post(function (req, res) {
        versao.list(req).then(function (result) {
            res.json(result);
        }).catch(function (e) {
            res.json(e);
        });
    });

    return routerVersao;
};

module.exports = {
    router: router
};