var express = require('express');
var router = express.Router();
var loginQueries = require('../queries/loginQueries');

router.post('/', function(req, res, next) {
    loginQueries.getUserAuth(req.body, res);
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;



