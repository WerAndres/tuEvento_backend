const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tuevento',
  password: 'postgres',
  port: 5433,
})

const createEvent = (req, res) => {
  const {
    nombre_evento,
    lugar_evento,
    numero_boletas
  } = req
  try{
    pool.query('INSERT INTO tuev.eventos (nombre_evento, lugar_evento, numero_boletas, numero_compradas_boletas, id_estado_evento) VALUES($1, $2, $3, 0, 1);',
    [
      nombre_evento,
      lugar_evento,
      numero_boletas
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

const updateEvent = (req, res) => {
  const {
    id_evento,
    nombre_evento,
    lugar_evento,
    numero_boletas,
    numero_compradas_boletas,
    id_estado_evento,
  } = req
  try{
    pool.query('UPDATE tuev.eventos SET nombre_evento=$2, lugar_evento=$3, numero_boletas=$4, numero_compradas_boletas=$5, id_estado_evento=$6 WHERE id_evento=$1;',
    [
      id_evento,
      nombre_evento,
      lugar_evento,
      numero_boletas,
      numero_compradas_boletas,
      id_estado_evento,
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

const listEvent = (req, res) => {
  try{
    pool.query('SELECT id_evento, nombre_evento, lugar_evento, numero_boletas, numero_compradas_boletas, id_estado_evento FROM tuev.eventos;',
    [], (error, results) => {
      if (error) {
        res.status(401).send({
          error
        })
      }else{
        if(results.rowCount > 0){
          res.status(200).json({
             data: results.rows
          })
        }else{
          res.status(401).send({
            error: results
          })
        }
      }
    })
  }
  catch(error) {
    console.error(error);
  }
}

const buytTicket = (req, res) => {
  const {
    id_usuario,
    id_evento
  } = req
  try{
    pool.query('INSERT INTO tuev.boletas (id_evento, id_usuario, id_estado_boleta) VALUES($2, $1, 1);',
    [
      id_usuario,
      id_evento
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

const listEventByUser = (req, res) => {
  let id_usuario = req.idUsuario
  try{
    pool.query('select e.nombre_evento, count(e.nombre_evento) as total_compradas from tuev.boletas b join tuev.eventos e on e.id_evento = b.id_evento where b.id_usuario = $1 group by e.nombre_evento',
    [
      id_usuario,
    ], (error, results) => {
      if (error) {
        res.status(401).send({
          error
        })
      }else{
        if(results.rowCount > 0){
          res.status(200).json({
             data: results.rows
          })
        }else{
          res.status(401).send({
            error: results
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
  createEvent,
  listEvent,
  updateEvent,
  buytTicket,
  listEventByUser
}