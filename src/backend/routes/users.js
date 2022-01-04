var express = require('express');
var router = express.Router();
const oracledb = require('oracledb')
const config = {
  user: 'kenneth',
  password: '2109',
  connectString: 'localhost:1521/ORCL18'
}
const queryConfig = {
  outFormat: oracledb.OUT_FORMAT_OBJECT,
  autoCommit: true,
};

router.get('/', async function(req, res, next) {
  let conn;
  var result;

  try {
    conn = await oracledb.getConnection(config)

    result = (await conn.execute(
      `SELECT 
        ID,
        NOMBRE,
        APELLIDOS,
        CORREO,
        TELEFONO,
        GENERO,
        TO_CHAR(FECHA_NAC, 'YYYY/MM/DD') AS FECHA_NAC,
        DIRECCION,
        PAIS,
        TIPO,
        REGISTRADO
      FROM 
        Usuario`,
      [],
      queryConfig
    ))?.rows;

    res.status(200);
  } catch (err) {
    result = 'Error de conexión';
    res.status(500);
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
  res.send(result);
});

module.exports = router;
