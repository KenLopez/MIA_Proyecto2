var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
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

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'soccerstatsteam@gmail.com',
      pass: 'Soc_Stats2021',
    },
  });
const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

router.post('/', async function(req, res) {
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

            jwt.sign(
                {
                  user: id?.ID,
                },
                EMAIL_SECRET,
                {
                  expiresIn: '1d',
                },
                (err, emailToken) => {
                  const url = `http://localhost:3000/confirmation/${emailToken}`;
            
                  transporter.sendMail({
                    from: 'Soccer Statistics ⚽ <soccerstatsteam@gmail.com>',
                    to: body.CORREO,
                    subject: 'Confirm Email',
                    html: confirmation
                    ?`<p>¡Bienvenido al equipo de Soccer Statistics!</p><br/>
                    <p>Tu cuenta de ${body.TIPO == 'A'?'ADMINISTRADOR':'EMPLEADO'} ha sido registrada con éxito.</p><br/>
                    
                    <p>Tus credenciales de acceso son las siguientes:</p><br/>
                    <p>Correo: <b>${body.CORREO}</b></p>
                    <p>Clave: <b>${body.CLAVE}</b></p><br/>
                    
                    <p>¡Recuerda cambiar tu clave de acceso en tu primera visita a la página!</p>`
                    :`<p>¡Gracias por crear tu cuenta en Soccer Stats!</p>
                    <p>Para confirmar tu registro, haz click en el siguiente link:</p>
                    <a href="${url}">${url}</a><br/>
                    <p>Si usted no ha realizado ningún registro, puede ignorar este mensaje.</p>
                    <p>Nota: No podrá iniciar sesión hasta haber confirmado el correo proporcionado en la creación de su cuenta.</p>`
                    ,
                  });
                },
            );
            result.result = { Message: 'Correo enviado'};
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

