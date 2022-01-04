var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
const oracledb = require('oracledb');
const settings = require('../public/javascripts/Settings');

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
    var result;
    const body = req.body;
    let today = new Date();
    today = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        
    try {
        conn = await oracledb.getConnection(settings.conn);
        const exists = (await conn.execute(
            `SELECT 
                ID,
                NOMBRE,
                APELLIDOS,
                CORREO
            FROM 
                USUARIO
            WHERE 
                CORREO = '${body.CORREO}' 
                AND REGISTRADO <> -1   
            `,
            [],
            settings.query
        ))?.rows.length>0;
        if(exists){
            result = 'Correo ya fue registrado.';
            res.status(500)
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
                    TO_DATE('${body.FECHA_NAC}', 'YYYY/MM/DD'),
                    TO_DATE('${today}', 'YYYY/MM/DD'),
                    '${body.DIRECCION}',
                    '${body.PAIS}',
                    '${body.TIPO}',
                    ${Number(confirmation)}
                )`,
                [],
                settings.query
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
                settings.query
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
                  const url = `http://localhost:4200/confirmation/${emailToken}`;
            
                  transporter.sendMail({
                    from: 'Soccer Statistics ⚽ <soccerstatsteam@gmail.com>',
                    to: body.CORREO,
                    subject: 'Confirmación de cuenta',
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

            if(body.AUTOR){
              await conn.execute(
                `CALL ENTRADA_BITACORA(
                  ${body.AUTOR.ID}, 
                  ${Number(id.ID)}, 
                  '${AUTOR.DESCRIPCION}', 
                  'Creación cuenta ${
                    body.TIPO == 'A'
                    ?'ADMINISTRADOR'
                    : body.TIPO == 'E'
                    ?'EMPLEADO'
                    : body.TIPO == 'P'
                    ?'PREMIUM'
                    :'NORMAL'
                  }'
                )`,
                [],
                settings.query
              )
            }
            result = 'Correo enviado';
            res.status(200);
        }
    } catch (err) {
        result = err;
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
  var result;
  try {
    conn = await oracledb.getConnection(settings.conn)
    await conn.execute(
      `UPDATE USUARIO 
      SET NOMBRE = '${cuenta.NOMBRE}',
      APELLIDOS = '${cuenta.APELLIDOS}',
      TELEFONO = ${cuenta.TELEFONO},
      FOTO = ${cuenta.FOTO},
      GENERO = '${cuenta.GENERO}',
      FECHA_NAC = TO_DATE('${cuenta.FECHA_NAC}', 'YYYY/MM/DD'),
      DIRECCION = '${cuenta.DIRECCION},
      PAIS = '${cuenta.PAIS}',
      TIPO = '${cuenta.TIPO}',
      REGISTRADO = ${cuenta.REGISTRADO}
      WHERE 
          ID = ${body.ID}
      `,
      [],
      settings.query
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
        settings.query
      )
    }
    result = 'Datos actualizados';
  } catch (e) {
    console.log(e);
    result = 'Token no válido';
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
  var result;
  try {
    conn = await oracledb.getConnection(settings.conn)
    await conn.execute(
      `UPDATE USUARIO
      SET REGISTRADO = -1 
      WHERE 
          ID = ${cuenta}
      `,
      [],
      settings.query
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
        settings.query
      )
    }
    result = 'Cuenta eliminada';
  } catch (e) {
    console.log(e);
    result = 'Token no válido';
    res.status(500);
  } finally {
    if (conn) { 
      await conn.close()
    }
  }
  res.send(result);
});

module.exports = router;

