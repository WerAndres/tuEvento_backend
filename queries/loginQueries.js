var jwt = require('jsonwebtoken');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tuevento',
  password: 'postgres',
  port: 5433,
})

const getUserAuth = (req, res) => {
  const {
    email_usuario,
    pass_usuario
  } = req
  try{
    pool.query('SELECT id_usuario, tipo_usuario, identificacion_usuario, tipo_identificacion, nombre_usuario, email_usuario, pass_usuario, fecha_nacimiento_usuario, url_foto_usuario FROM tuev.usuarios where email_usuario = $1 and pass_usuario = $2;',
    [
      email_usuario,
      pass_usuario
    ], (error, results) => {
      if (error) {
        res.status(401).send({
          error: 'usuario o contraseña inválidos'
        })
      }else{
        if(results.rowCount == 1){
          var tokenData = {
            username: results.rows[0].tipo_usuario + results.rows[0].email_usuario + "tuevento" + results.rows[0].identificacion_usuario
          }
          var token = jwt.sign(tokenData, 'Secret Password', {
             expiresIn: 60 * 60 * 24 // expires in 24 hours
          })
          results.rows[0].pass_usuario = ''
          res.json({
             auth: true, token: token, data: results.rows[0]
          })
        }else{
          res.status(401).send({
            error: 'usuario o contraseña inválidos'
          })
        }
      }
    })
  }
  catch(error) {
    console.error(error);
  }
}

module.exports = {
  getUserAuth
}