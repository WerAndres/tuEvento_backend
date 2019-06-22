var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')


router.get('/', function(req, res, next) {
  res.send({
    message: 'Awwwww yeah!!!!'
  });
});

module.exports = router;



