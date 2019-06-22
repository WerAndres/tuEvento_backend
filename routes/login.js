var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

router.post('/', function(req, res, next) {
    var username = req.body.user
    var password = req.body.password

    if( !(username === 'oscar' && password === '1234')){
      res.status(401).send({
        error: 'usuario o contraseña inválidos'
      })
      return
    }
    var tokenData = {
      username: username
      // ANY DATA
    }

    var token = jwt.sign(tokenData, 'Secret Password', {
       expiresIn: 60 * 60 * 24 // expires in 24 hours
    })
    res.send({
       auth: true, token: token 
    })
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;



