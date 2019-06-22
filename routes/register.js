var express = require('express');
var router = express.Router();
var registerQueries = require('../queries/registerQueries');

router.post('/', function(req, res, next) {
    //console.log('req: ' + JSON.stringify(req.body));
    registerQueries.createUser(req.body, res);
});

module.exports = router;



