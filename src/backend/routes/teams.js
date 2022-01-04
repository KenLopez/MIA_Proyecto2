var express = require('express');
var router = express.Router();
const oracledb = require('oracledb')
const settings = require('../public/javascripts/Settings')

router.post('/', async function(req, res) {
  let conn;
  var result;
  const body = req.body;
      
  try {
    conn = await oracledb.getConnection(settings.conn);
    await conn.execute(
        `INSERT INTO EQUIPO(
            FECHA_FUNDACION,
            PAIS,
            NOMBRE,
            LOGO,
            ESTADO
        ) VALUES(
            TO_DATE('${body.FECHA_FUNDACION}', 'YYYY/MM/DD'),
            '${body.PAIS}',
            '${body.NOMBRE}',
            ${body.LOGO},
            'ACTIVO'
        )`,
        [],
        settings.query
    );
    result = 'Equipo creado';
    res.status(200);
  } catch (e) {
      console.log(e);
      result = e;
      res.status(500);
  } finally {
      if (conn) { 
          await conn.close()
      }
  }
  res.send(result);
});

router.put('/', async function(req, res) {
  let conn;
  const body = req.body;
  var result;
  try {
    conn = await oracledb.getConnection(settings.conn)
    await conn.execute(
      `UPDATE EQUIPO SET 
        FECHA_FUNDACION = TO_DATE('${body.FECHA_FUNDACION}', 'YYYY/MM/DD'),
        PAIS = '${body.PAIS}',
        NOMBRE = '${body.NOMBRE}',
        LOGO = ${body.LOGO},
        ESTADO = '${body.ESTADO}'
        WHERE 
          ID = ${body.ID}
      `,
      [],
      settings.query
    );
    result = 'Datos actualizados';
  } catch (e) {
    console.log(e);
    result = 'Error de conexión con BD';
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

router.delete('/:id', async function(req, res) {
  let conn;
  var result;
  const id = req.params.id;
  try {
    conn = await oracledb.getConnection(settings.conn)
    await conn.execute(
      `UPDATE EQUIPO 
      SET ESTADO = 'BORRADO' 
      WHERE 
          ID = ${id}
      `,
      [],
      settings.query
    );
    result = 'Equipo eliminado';
  } catch (e) {
    console.log(e);
    result = 'Error de conexión con BD';
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

router.get('/', async function(req, res) {
  let conn;
  var result;
  try {
    conn = await oracledb.getConnection(settings.conn)
    
    result = (await conn.execute(
      `SELECT 
        ID,
        TO_CHAR(FECHA_FUNDACION, 'YYYY/MM/DD') AS FECHA_FUNDACION,
        PAIS,
        NOMBRE,
        LOGO,
        ESTADO
      FROM 
        EQUIPO
      WHERE 
        ESTADO <> 'BORRADO'
      `,
      [],
      settings.query
    ))?.rows;
    
  } catch (e) {
    console.log(e);
    result = 'Error de conexión con BD';
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

router.get('/:id', async function(req, res) {
  let conn;
  var result;
  const id = req.params.id;
  try {
    conn = await oracledb.getConnection(settings.conn)

    result = (await conn.execute(
      `SELECT 
        ID,
        TO_CHAR(FECHA_FUNDACION, 'YYYY/MM/DD') AS FECHA_FUNDACION,
        PAIS,
        NOMBRE,
        LOGO,
        ESTADO
      FROM 
        EQUIPO
      WHERE
        ID = ${Number(id)}
        AND ESTADO <> 'BORRADO'
      `,
      [],
      settings.query
    ))?.rows[0];
    
  } catch (e) {
    console.log(e);
    result = 'Error de conexión con BD';
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

module.exports = router;

