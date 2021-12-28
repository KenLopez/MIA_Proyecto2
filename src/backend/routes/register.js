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

router.post('/', async function(req, res, next) {
    let conn;
    let result = {result: [], errors: []};
    const body = req.body;
    let today = new Date();
    today = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        
    try {
        conn = await oracledb.getConnection(config);
        const exists = (await conn.execute(
            `SELECT 
                ID,
                NOMBRE,
                APELLIDOS,
                CORREO
            FROM 
                Usuario
            WHERE 
                CORREO = '${body.CORREO}'    
            `,
            [],
            queryConfig
        ))?.rows.length>0;
        if(exists){
            result.errors.push('Correo ya fue registrado.');
        }else{
            let confirmation = body.TIPO == 'A' || body.TIPO == 'E';
            await conn.execute(
                `INSERT INTO USUARIO(
                    NOMBRE,
                    APELLIDOS,
                    CLAVE,
                    CORREO,
                    TELEFONO,
                    FOTO,
                    GENERO,
                    FECHA_NAC,
                    FECHA_REGISTRO,
                    DIRECCION,
                    PAIS,
                    TIPO,
                    REGISTRADO
                ) VALUES(
                    '${body.NOMBRE}',
                    '${body.APELLIDOS}',
                    '${body.CLAVE}',
                    '${body.CORREO}',
                    ${body.TELEFONO},
                    ${body.FOTO},
                    '${body.GENERO}',
                    TO_DATE('${body.FECHA_NAC}', 'YYYY-MM-DD'),
                    TO_DATE('${today}', 'YYYY-MM-DD'),
                    '${body.DIRECCION}',
                    '${body.PAIS}',
                    '${body.TIPO}',
                    ${Number(confirmation)}
                )`,
                [],
                queryConfig
            );
    
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
                `,
                [],
                queryConfig
            ))?.rows;
        }
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

module.exports = router;

