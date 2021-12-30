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
        `INSERT INTO JUGADOR(
            NOMBRE,
            FECHA_NAC,
            NACIONALIDAD,
            POSICION,
            ESTADO
        ) VALUES(
            '${body.NOMBRE}',
            TO_DATE('${body.FECHA_NAC}', 'YYYY-MM-DD'),
            '${body.NACIONALIDAD}',
            '${body.POSICION}',
            'ACTIVO'
        )`,
        [],
        settings.query
    );
    result.result = { MESSAGE: 'Jugador creado'};
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
      `UPDATE JUGADOR SET 
        FECHA_NAC = TO_DATE('${body.FECHA_NAC}', 'YYYY-MM-DD'),
        NACIONALIDAD = '${body.NACIONALIDAD}',
        NOMBRE = '${body.NOMBRE}',
        POSICION = '${body.POSICION}',
        ESTADO = '${body.ESTADO}'
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
      `UPDATE JUGADOR
      SET ESTADO = 'BORRADO' 
      WHERE 
          ID = ${id}
      `,
      [],
      settings.query
    );
    result.result = { MESSAGE: 'Jugador eliminado' }
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
        TO_CHAR(FECHA_NAC, 'DD-MM-YYYY') AS FECHA_NAC,
        NACIONALIDAD,
        NOMBRE,
        POSICION,
        ESTADO
      FROM 
        JUGADOR
      WHERE
        ESTADO <> 'BORRADO'
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
        TO_CHAR(FECHA_NAC, 'DD-MM-YYYY') AS FECHA_NAC,
        NACIONALIDAD,
        NOMBRE,
        POSICION,
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

