var express = require('express');
var router = express.Router();
const oracledb = require('oracledb')
const config = {
  user: 'kenneth',
  password: '2109',
  connectString: 'localhost:1521/ORCL18'
};
const queryConfig = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    autoCommit: true,
};

router.post('/', async function(req, res) {
  let conn;
  let result = {result: [], errors: []};
  const body = req.body;
      
  try {
    await conn.execute(
        `INSERT INTO USUARIO(
            FECHA_FUNDACION,
            PAIS,
            LOGO
        ) VALUES(
            TO_DATE('${body.FECHA_FUNDACION}', 'YYYY-MM-DD'),
            '${body.PAIS}',
            ${body.LOGO}
        )`,
        [],
        queryConfig
    );

    let id = (await conn.execute(
        `SELECT 
            ID
        FROM 
            Usuario
        WHERE 
            CORREO = '${body.CORREO}'    
        `,
        [],
        queryConfig
    ))?.rows[0];
    result.result = { MESSAGE: 'Correo enviado'};
    res.status(200);
  } catch (err) {
      result.errors.push(err);
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
  const cuenta = body.CUENTA;
  let result = {result: [], errors: []};
  try {
    conn = await oracledb.getConnection(config)
    await conn.execute(
      `UPDATE USUARIO 
      SET NOMBRE = '${cuenta.NOMBRE}',
      APELLIDOS = '${cuenta.APELLIDOS}',
      TELEFONO = ${cuenta.TELEFONO},
      FOTO = ${cuenta.FOTO},
      GENERO = '${cuenta.GENERO}',
      FECHA_NAC = TO_DATE('${cuenta.FECHA_NAC}', 'YYYY-MM-DD'),
      DIRECCION = '${cuenta.DIRECCION},
      PAIS = '${cuenta.PAIS}',
      TIPO = '${cuenta.TIPO}',
      REGISTRADO = ${cuenta.REGISTRADO}
      WHERE 
          ID = ${body.ID}
      `,
      [],
      queryConfig
    );
    
    if(body.AUTOR){
      await conn.execute(
        `CALL ENTRADA_BITACORA(
          ${body.AUTOR.ID}, 
          ${number(body.ID)}, 
          '${AUTOR.DESCRIPCION}', 
          'Actualización de cuenta'
        )`,
        [],
        queryConfig
      )
    }
    result.result = { MESSAGE: 'Datos actualizados' }
  } catch (e) {
    console.log(e);
    result.errors.push('Token no válido');
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

router.delete('/:admin/:cuenta/:desc', async function(req, res) {
  let conn;
  let admin = Number(req.params.admin);
  let cuenta = Number(req.params.cuenta);
  let descripcion = req.params.desc.replace("_", " ");
  let result = {result: [], errors: []};
  try {
    conn = await oracledb.getConnection(config)
    await conn.execute(
      `UPDATE USUARIO
      SET REGISTRADO = -1 
      WHERE 
          ID = ${cuenta}
      `,
      [],
      queryConfig
    );
    
    if(admin){
      await conn.execute(
        `CALL ENTRADA_BITACORA(
          ${admin}, 
          ${cuenta}, 
          '${descripcion}', 
          'Eliminación de cuenta'
        )`,
        [],
        queryConfig
      )
    }
    result.result = { MESSAGE: 'Cuenta eliminada' }
  } catch (e) {
    console.log(e);
    result.errors.push('Token no válido');
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

module.exports = router;

