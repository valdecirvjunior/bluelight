var express = require('express');
var feedback = require('../controllers/feedback');

var router = function () {
    var routerFeedback = express.Router();
    routerFeedback.route('/maintain').post(function (req, res) {
        feedback.maintain(req).then(function (result) {
            res.json(result);
        }).catch(function (e) {
            res.json(e);
        });
    });

    routerFeedback.route('/list').post(function (req, res) {
        feedback.list(req).then(function (result) {
            res.json(result);
        }).catch(function (e) {
            res.json(e);
        });
    });

    return routerFeedback;
};

module.exports = {
    router: router
};