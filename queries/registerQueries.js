const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tuevento',
  password: 'postgres',
  port: 5433,
})

const createUser = (req, res) => {
  const {
    tipo_usuario,
    identificacion_usuario,
    tipo_identificacion,
    nombre_usuario,
    email_usuario,
    pass_usuario,
    fecha_nacimiento_usuario,
    url_foto_usuario
  } = req
  try{
    pool.query('INSERT INTO tuev.usuarios(tipo_usuario, identificacion_usuario, tipo_identificacion, nombre_usuario, email_usuario, pass_usuario, fecha_nacimiento_usuario, url_foto_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
    [
      tipo_usuario,
      identificacion_usuario,
      tipo_identificacion,
      nombre_usuario,
      email_usuario,
      pass_usuario,
      fecha_nacimiento_usuario,
      url_foto_usuario
    ], (error, results) => {
      if (error) {
        res.json({error: error});
      }else{
        res.json({results: results.rowCount});
      }
    })
  }
  catch(error) {
    console.error(error);
  }
}

module.exports = {
  createUser
}