var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
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
const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

router.post('/', async function(req, res) {
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
            CORREO, 
            TIPO
        FROM 
            Usuario
        WHERE 
            CORREO = '${body.CORREO}'
            AND CLAVE = '${body.CLAVE}'
            AND REGISTRADO = 1   
        `,
        [],
        queryConfig
    ))?.rows;
    res.status(200);
    if(result.result.length==0){
        result.errors.push('Credenciales incorrectas');
        res.status(500);
    }
    result.result = result.result[0];
  } catch (err) {
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

router.get('/confirmation/:token', async function(req, res) {
  let conn;
  let result = {result: [], errors: []};
  try {
    conn = await oracledb.getConnection(config)
    const {user: id} = jwt.verify(req.params.token, EMAIL_SECRET);
    console.log(id);
    await conn.execute(
      `UPDATE USUARIO 
      SET REGISTRADO = 1
      WHERE 
          ID = ${id}
      `,
      [],
      queryConfig
    );

    result.result = (await conn.execute(
      `SELECT 
          ID,
          NOMBRE,
          APELLIDOS,
          CORREO, 
          TIPO
      FROM 
          Usuario
      WHERE 
          ID = ${id}  
      `,
      [],
      queryConfig
    ))?.rows[0];
  } catch (e) {
    console.log(e);
    result.errors.push('Token no válido');
    res.status(500);
  }
  res.send(result);
});

module.exports = router;
