var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

router.post('/', function(req, res, next) {
    res.send({
      "message": "OhgfhK"
    });
});

module.exports = router;



