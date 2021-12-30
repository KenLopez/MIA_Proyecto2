var express = require('express');
var router = express.Router();
const oracledb = require('oracledb')
const settings = require('../public/javascripts/Settings')

router.post('/', async function(req, res) {
  let conn;
  let result = {result: [], errors: []};
  const body = req.body;
      
  try {
    conn = await oracledb.getConnection(settings.conn);
    await conn.execute(
        `INSERT INTO EQUIPO(
            FECHA_FUNDACION,
            PAIS,
            NOMBRE,
            LOGO
        ) VALUES(
            TO_DATE('${body.FECHA_FUNDACION}', 'YYYY-MM-DD'),
            '${body.PAIS}',
            '${body.NOMBRE}',
            ${body.LOGO}
        )`,
        [],
        settings.query
    );
    result.result = { MESSAGE: 'Equipo creado'};
    res.status(200);
  } catch (e) {
      console.log(e);
      result.errors.push(e);
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
  let result = {result: [], errors: []};
  try {
    conn = await oracledb.getConnection(settings.conn)
    await conn.execute(
      `UPDATE EQUIPO SET 
        FECHA_FUNDACION = TO_DATE('${body.FECHA_FUNDACION}', 'YYYY-MM-DD'),
        PAIS = '${body.PAIS}',
        NOMBRE = '${body.NOMBRE}',
        LOGO = ${body.LOGO}
        WHERE 
          ID = ${body.ID}
      `,
      [],
      settings.query
    );
    result.result = { MESSAGE: 'Datos actualizados' }
  } catch (e) {
    console.log(e);
    result.errors.push('Error de conexión con BD');
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
  let result = {result: [], errors: []};
  const id = req.params.id;
  try {
    conn = await oracledb.getConnection(settings.conn)
    await conn.execute(
      `DELETE FROM EQUIPO 
      WHERE 
          ID = ${id}
      `,
      [],
      settings.query
    );
    result.result = { MESSAGE: 'Equipo eliminado' }
  } catch (e) {
    console.log(e);
    result.errors.push('Error de conexión con BD');
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
  let result = {result: [], errors: []};
  try {
    conn = await oracledb.getConnection(settings.conn)
    
    result.result = (await conn.execute(
      `SELECT 
        ID,
        TO_CHAR(FECHA_FUNDACION, 'DD-MM-YYYY') AS FECHA_FUNDACION,
        PAIS,
        NOMBRE,
        LOGO
      FROM 
        EQUIPO
      `,
      [],
      settings.query
    ))?.rows;
    
  } catch (e) {
    console.log(e);
    result.errors.push('Error de conexión con BD');
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
  let result = {result: [], errors: []};
  const id = req.params.id;
  try {
    conn = await oracledb.getConnection(settings.conn)

    result.result = (await conn.execute(
      `SELECT 
        ID,
        TO_CHAR(FECHA_FUNDACION, 'DD-MM-YYYY') AS FECHA_FUNDACION,
        PAIS,
        NOMBRE,
        LOGO
      FROM 
        EQUIPO
      WHERE
        ID = ${Number(id)}
      `,
      [],
      settings.query
    ))?.rows[0];
    
  } catch (e) {
    console.log(e);
    result.errors.push('Error de conexión con BD');
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

module.exports = router;

