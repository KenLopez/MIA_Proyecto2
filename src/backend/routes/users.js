var express = require('express');
var router = express.Router();
const oracledb = require('oracledb')
const config = {
  user: 'kenneth',
  password: '2109',
  connectString: 'localhost:1521/ORCL18'
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let conn
  let result

  try {
    conn = await oracledb.getConnection(config)

    result = await conn.execute(
      `SELECT 
        ID,
        NOMBRE,
        APELLIDOS,
        CLAVE,
        TO_CHAR(FECHA_NAC, 'DD-MM-YYYY') AS FECHA_NAC
      FROM 
        Usuario`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    )
    
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
  res.send(result?result.rows:[]);
});

module.exports = router;
