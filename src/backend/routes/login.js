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
}

router.get('/', async function(req, res, next) {
  let conn;
  const body = req.body;
  let result = {result: [], errors: []};

  try {
    conn = await oracledb.getConnection(config)

    result.result = (await conn.execute(
        `SELECT 
            ID,
            NOMBRE,
            APELLIDOS,
            CORREO
        FROM 
            Usuario
        WHERE 
            CORREO = '${body.CORREO}'
            AND CLAVE = '${body.CLAVE}'    
        `,
        [],
        queryConfig
    ))?.rows;
    res.status(200);
    if(result.result.length==0){
        result.errors.push('Credenciales incorrectas');
        res.status(500);
    }
  } catch (err) {
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

module.exports = router;
