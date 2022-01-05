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
        `INSERT INTO DIRECTOR_TECNICO(
            NOMBRE,
            APELLIDO,
            FECHA_NAC,
            NACIONALIDAD,
            ESTADO,
            FOTO
        ) VALUES(
            '${body.NOMBRE}',
            '${body.APELLIDO}',
            TO_DATE('${body.FECHA_NAC}', 'YYYY/MM/DD'),
            '${body.NACIONALIDAD}',
            'ACTIVO',
            ${body.FOTO}
        )`,
        [],
        settings.query
    );
    result = 'DT creado';
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
      `UPDATE DIRECTOR_TECNICO SET 
        NOMBRE = '${body.NOMBRE}',
        APELLIDO = '${body.APELLIDO}',
        FECHA_NAC = '${body.FECHA_NAC}',
        NACIONALIDAD = '${body.NACIONALIDAD}',
        ESTADO = '${body.ESTADO}',
        FOTO = '${body.FOTO}
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
      `UPDATE DIRECTOR_TECNICO
      SET ESTADO = 'BORRADO'
      WHERE 
          ID = ${id}
      `,
      [],
      settings.query
    );
    result = 'DT eliminado';
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
        NOMBRE,
        APELLIDO,
        TO_CHAR(FECHA_NAC, 'YYYY/MM/DD') AS FECHA_NAC,
        NACIONALIDAD,
        ESTADO,
        FOTO
      FROM 
        DIRECTOR_TECNICO
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
        NOMBRE,
        APELLIDO,
        TO_CHAR(FECHA_NAC, 'YYYY/MM/DD') AS FECHA_NAC,
        NACIONALIDAD,
        ESTADO,
        FOTO
      FROM 
        DIRECTOR_TECNICO
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

