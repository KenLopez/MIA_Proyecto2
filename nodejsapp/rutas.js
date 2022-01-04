
/*var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const path = require('path');
const multer = require('multer');

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));*/
var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const { exec } = require("child_process");
const fs = require('fs');

let csvToJson = require('convert-csv-to-json');

const nodemailer = require('nodemailer');
const service = require("./connection.js");
const cors = require("cors");
const { json } = require("body-parser");
const { IdentityStore } = require("aws-sdk");

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

router.use(cors({origin: true, optionSoucessStatus:200}));
router.use(bodyParser.json({limit:"50mb", extended: true}));
router.unsubscribe(bodyParser.urlencoded({limit: "50mb", extended: true}));

/*router.post("/Login", async function (req, res, next) {

    const { nombre, contrasenia } = req.body
    let responseLogin = await service.connect(
      `SELECT * FROM COORDINADOR_REVISOR WHERE Nombre = '${nombre}' AND Contrasenia='${contrasenia}'`
    );
    if (responseLogin.status == 400) {
      res.status(400).json({ message: responseLogin.message });
    } else {
      res
        .status(200)
        .json(responseLogin.data);
    }
  });*/

/*router.post("/Login", async function (req, res, next) {

    //const { nombre, contrasenia } = req.body
    let responseLogin = await service.connect(
      `SELECT * FROM admin_emple;`
    );
    if (responseLogin.status == 400) {
      res.status(400).json({ message: responseLogin.message });
    } else {
      res
        .status(200)
        .json(responseLogin.data);
    }
  });*/
router.get("/", async function(req, res, next){
    
    if(res.status==400){
        res.status(400).json({message: response.message});
    }else{
        res
        .status(200)
        .json({ message: "todo ok" });
    }
});


router.get("/prueba", async function(req, res, next){
    //const {usuario, password} = req.body;
    console.log("response");
    let response = await service.connect(
        //`SELECT * FROM admin_emple WHERE usuario='${usuario}'AND password='${password}'`
        `SELECT * FROM admin_emple`
    );

    console.log(response);

    if(response.status==400){
        res.status(400).json({message: response.message});
    }else{
        res
        .status(200)
        .json({ message: "Credenciales correctas", data: response.data });
    }
});


router.post("/loginAdmin", async function(req, res, next){
  try{
    console.log(req.body)
    const {usuario, password} = req.body;
    
    let response = await service.connect(
      `SELECT * FROM usuario WHERE usuario='${usuario}'AND clave_de_acceso='${password}'`
    );

    if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(200).json({message: "usuario o contraseña incorrecto", correcto: false});
      }else{
          res.status(200).json({message: "usuario correcto", correcto:true, usuario:response.data[0]});
      }
    }

  }catch (err) { 
    next(err);
  }
});


router.post("/loginUsuario", async function(req, res, next){
  try{
    console.log(req.body)
    const {usuario, password} = req.body;
    
    let response = await service.connect(
      `SELECT * FROM usuario WHERE usuario='${usuario}'AND clave_de_acceso='${password}'`
    );

    /*if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(400).json({message: "usuario o contraseña incorrecto"});
      }else{
          res.status(200).json({message: "usuario correcto", data: response.data[0]});
      }
    }*/
    if(response.status==400){
      res.status(400).json({message: "usuario o contraseña incorrecto"});
    }else{
      res.status(200).json({message: "usuario correcto", data: response.data[0]});
    }
  }catch (err) { 
    next(err);
  }

});



router.post("/selectEquipo", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,pais} = req.body;
    
    let response = await service.connect(
      `
      select * from equipo where nombre = '${nombre}' and pais = '${pais}'
      `
    );

    if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(200).json({message: "equipo no encontrado", estado: false});
      }else{
          res.status(200).json({message: "usuario correcto", estado: true,data: response.data[0]});
      }
    }
  }catch (err) { 
    next(err);
  }

});


router.post("/modificarEquipo", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,pais,nombre2,pais2,fecha_fun,foto_logo} = req.body;
    
    let response = await service.connect(
      `
      UPDATE equipo
      SET nombre = '${nombre2}', pais='${pais2}', fecha_fun = '${fecha_fun}', foto_logo= '${foto_logo}' 
      WHERE nombre='${nombre}' and pais='${pais}'

      `
    );

    if(response.status==400){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true});
    }

  }catch (err) { 
    next(err);
  }
});


router.post("/selectJugador", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,pais} = req.body;
    
    let response = await service.connect(
      `
      select * from jugador where  nombre = '${nombre}'
      `
    );

    if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(200).json({message: "equipo no encontrado", estado: false});
      }else{
          res.status(200).json({message: "usuario correcto", estado: true,data: response.data[0]});
      }
    }
  }catch (err) { 
    next(err);
  }

});

router.post("/modificarJugador", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,nombre2,fecha_nac,nacionalidad,posicion,idEquipo} = req.body;
    
    let response = await service.connect(
      `
      UPDATE jugador
      SET nombre = '${nombre2}', fecha_nac='${fecha_nac}', nacionalidad = '${nacionalidad}', posicion= '${posicion}', idEquipo= '${idEquipo}' 
      WHERE nombre='${nombre}'

      `
    );

    if(response.status==400){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true});
    }

  }catch (err) { 
    next(err);
  }

});



router.post("/selectDirector_tecnico", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,pais} = req.body;
    
    let response = await service.connect(
      `
      select * from director_tecnico where nombre = '${nombre}'
      `
    );

    if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(200).json({message: "equipo no encontrado", estado: false});
      }else{
          res.status(200).json({message: "usuario correcto", estado: true,data: response.data[0]});
      }
    }
  }catch (err) { 
    next(err);
  }

});

router.post("/modificarDirector_tecnico", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,nombre2,fecha_nac,pais,nacionalidad,estado,foto} = req.body;
    
    let response = await service.connect(
      `
      UPDATE director_tecnico
      SET nombre = '${nombre2}', fecha_nac='${fecha_nac}', pais='${pais}', nacionalidad ='${nacionalidad}', estado= '${estado}', foto= '${foto}' 
      WHERE nombre='${nombre}'

      `
    );

    if(response.status==400){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true});
    }

  }catch (err) { 
    next(err);
  }

});


router.post("/selectEstadio", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,pais} = req.body;
    
    let response = await service.connect(
      `
      select * from estadio where  nombre = '${nombre}' and pais='${pais}'
      `
    );

    if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(200).json({message: "equipo no encontrado", estado: false});
      }else{
          res.status(200).json({message: "usuario correcto", estado: true,data: response.data[0]});
      }
    }
  }catch (err) { 
    next(err);
  }

});


router.post("/modificarEstadio", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,nombre2,pais,pais2,fecha_ing,capacidad,direccion,estado,foto} = req.body;
    
    let response = await service.connect(
      `
      UPDATE estadio
      SET pais = '${pais2}', nombre='${nombre2}', fecha_ing='${fecha_ing}', capacidad ='${capacidad}', direccion='${direccion}', estado='${estado}', foto='${foto}'  
      WHERE nombre='${nombre}' and pais='${pais}'

      `
    );

    if(response.status==400){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true});
    }

  }catch (err) { 
    next(err);
  }

});



router.post("/selectCompeticion", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,pais} = req.body;
    
    let response = await service.connect(
      `
      select * from competicion where  nombre = '${nombre}' and pais='${pais}'
      `
    );

    if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(200).json({message: "equipo no encontrado", estado: false});
      }else{
          response.data[0].ANIO = response.data[0].año
          res.status(200).json({message: "usuario correcto", estado: true, data: response.data[0]});
      }
    }
  }catch (err) { 
    next(err);
  }

});

router.post("/modificarCompeticion", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,nombre2,pais,pais2,anio,tipo} = req.body;
    
    let response = await service.connect(
      `
      UPDATE competicion
      SET pais = '${pais2}', nombre='${nombre2}', año='${anio}', tipo ='${tipo}'  
      WHERE nombre='${nombre}' and pais='${pais}'

      `
    );

    if(response.status==400){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true});
    }

  }catch (err) { 
    next(err);
  }

});


router.post("/selectPartido", async function(req, res, next){
  try{
    console.log(req.body)
    const {fecha,pais} = req.body;
    
    let response = await service.connect(
      `
      select * from partido where  fecha = '${fecha}' 
      `
    );

    if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(200).json({message: "equipo no encontrado", estado: false});
      }else{
          res.status(200).json({message: "usuario correcto", estado: true,data: response.data[0]});
      }
    }
  }catch (err) { 
    next(err);
  }

});

router.post("/modificarPartido", async function(req, res, next){
  try{
    console.log(req.body)
    const {fecha,fecha2,estado,resultado} = req.body;
    
    let response = await service.connect(
      `
      UPDATE partido
      SET fecha = '${fecha2}', estado='${estado}', resultado= '${resultado}' 
      WHERE fecha='${fecha}' 

      `
    );

    if(response.status==400){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true});
    }

  }catch (err) { 
    next(err);
  }

});


router.post("/buscar", async function(req, res, next){
  try{
    console.log(req.body)
    const {tabla} = req.body;
    let response;

    if(tabla == "equipo"){
      response = await service.connect(
        `
        select * from equipo
  
        `
      );
    }else if(tabla == "jugador"){
      response = await service.connect(
        `
        select * from jugador
  
        `
      );
    }else if(tabla == "director"){
      response = await service.connect(
        `
        select * from director_tecnico
  
        `
      );
    }else if(tabla == "estadio"){
      response = await service.connect(
        `
        select * from estadio
  
        `
      );
    }else if(tabla == "competicion"){
      response = await service.connect(
        `
        select * from competicion
  
        `
      );
    }else if(tabla == "partido"){
      response = await service.connect(
        `
        select * from partido
  
        `
      );
    }


    if(response.status==400){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true, data: response.data});
    }

  }catch (err) { 
    next(err);
  }

});

router.post("/eliminar", async function(req, res, next){
  try{
    console.log(req.body)
    const {tabla,indice} = req.body;
    let response;

    if(tabla == "equipo"){
      response = await service.connect(
        `
        delete from equipo where idEquipo='${indice}'  
  
        `
      );
    }else if(tabla == "jugador"){
      response = await service.connect(
        `
        delete from jugador where idJugador='${indice}'
  
        `
      );
    }else if(tabla == "director"){
      response = await service.connect(
        `
        delete from director_tecnico where idDirector_tecnico='${indice}'
  
        `
      );
    }else if(tabla == "estadio"){
      response = await service.connect(
        `
        delete from estadio where idEstadio='${indice}'
  
        `
      );
    }else if(tabla == "competicion"){
      response = await service.connect(
        `
        delete from competicion where idCompeticion='${indice}'
  
        `
      );
    }else if(tabla == "partido"){
      response = await service.connect(
        `
        delete from partido where idPartido='${indice}'
  
        `
      );
    }

    if(response.status==400 || response.data==null){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true, data: response.data});
    }
  }catch (err) { 
    next(err);
  }

});


router.post("/insertEquipo", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,pais,fecha_fun, foto_logo} = req.body;
    
    let response = await service.connect(
      `insert into equipo(nombre,fecha_fun,pais, foto_logo) 
      values ('${nombre}','${fecha_fun}','${pais}','${foto_logo}')`
    );

    if(response.status==400){
      res.status(400).json({message: "error al ingresar equipo", status: false});
    }else{
      res.status(200).json({message: "insersion de equipo exitoso", status: true});
    }
  }catch (err) { 
    next(err);
  }
});


router.post("/insertEstadio", async function(req, res, next){
  try{
    console.log(req.body)
    const {pais,nombre,fecha_ing,capacidad,direccion,estado,foto} = req.body;
    
    let response = await service.connect(
      `
      INSERT INTO estadio (pais,nombre,fecha_ing,capacidad,direccion,estado,foto) VALUES ('${pais}','${nombre}','${fecha_ing}','${capacidad}','${direccion}','${estado}','${foto}')
      `
    );

    if(response.status==400){
      res.status(400).json({message: "error al ingresar estadio"});
    }else{
      res.status(200).json({message: "insersion de estadio exitoso"});
    }
  }catch (err) { 
    next(err);
  }

});


router.post("/insertDirector_tecnico", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,fecha_nac,pais,nacionalidad,estado,foto,idEquipo,pais_equipo,fecha_ini,fecha_fin} = req.body;
    
    let response = await service.connect(
      `INSERT INTO director_tecnico(nombre,fecha_nac,pais,nacionalidad,estado,foto) VALUES ('${nombre}','${fecha_nac}','${pais}','${nacionalidad}','${estado}','${foto}')
      `
    );

    if(response.status==400){
      res.status(400).json({message: "error al ingresar director_tecnico"});
    }else{
      //res.status(200).json({message: "insersion de director_tecnico exitoso"});
      let response2 = await service.connect(
        `INSERT INTO director_equipo(idDirector_tecnico,idEquipo,fecha_ini,fecha_fin) values(
          (SELECT idDirector_tecnico FROM director_tecnico 
            WHERE nombre = '${nombre}' FETCH FIRST 1 ROWS ONLY),
          (SELECT idEquipo FROM equipo 
            WHERE nombre = '${idEquipo}' FETCH FIRST 1 ROWS ONLY),
          '${fecha_ini}',
          '${fecha_fin}'
        )
        `
      );
  
      if(response2.status==400){
        res.status(400).json({message: "error al ingresar director_tecnico"});
      }else{
        res.status(200).json({message: "insersion de director_equipo y director_tecnico exitoso"});
      }
    }
  }catch (err) { 
    next(err);
  }

});


router.post("/insertHistorialjuador", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,fecha_nac,nacionalidad,posicion,pais_equipo,equipo,fecha_ini,fecha_fin} = req.body;
    
    let response = await service.connect(
      `
      INSERT INTO jugador (nombre,fecha_nac,nacionalidad,posicion,idEquipo) VALUES ('${nombre}','${fecha_nac}','${nacionalidad}','${posicion}'
        ,(select idEquipo from equipo where nombre = '${equipo}' FETCH FIRST 1 ROWS ONLY))
      `
    );

    if(response.status==400){
      res.status(400).json({message: "error al ingresar jugador_partido"});
    }else{

      let response2 = await service.connect(
        `
        INSERT INTO HISTORIALJUGADOR(idJugador,posicion, idEquipo,fecha_ini,fecha_fin) values(
            (SELECT idJugador FROM jugador 
              WHERE nombre = '${nombre}' FETCH FIRST 1 ROWS ONLY),
              '${posicion}',
            (SELECT idEquipo FROM equipo 
              WHERE nombre = '${equipo}' FETCH FIRST 1 ROWS ONLY),
              '${fecha_ini}',
              '${fecha_fin}'
        )
        `
      );
  
      if(response2.status==400){
        res.status(400).json({message: "error al ingresar jugador_equipo"});
      }else{
        res.status(200).json({message: "insersion de jugador_equipo y jugador_partido exitoso"});
      }
      //res.status(200).json({message: "insersion de participa_competencia exitoso"});
    }
  }catch (err) { 
    next(err);
  }

});


router.post("/insertParticipa_competencia", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,anio,tipo,campeon,pais,pais_equipo,equipo} = req.body;
    
    let response = await service.connect(
      `
      INSERT INTO competicion (nombre,anio,tipo,pais) VALUES ('${nombre}','${anio}','${tipo}','${pais}')
      `
    );

    if(response.status==400){
      res.status(400).json({message: "error al ingresar competicion"});
    }else{

      let response2 = await service.connect(
        `
        INSERT INTO participa_competencia(campeon,idEquipo,idCompeticion) values(
            (SELECT idEquipo FROM equipo 
              WHERE nombre = '${campeon}' FETCH FIRST 1 ROWS ONLY),
            (SELECT idEquipo FROM equipo 
              WHERE nombre = '${equipo}' FETCH FIRST 1 ROWS ONLY),
            (SELECT idCompeticion FROM competicion 
              WHERE nombre = '${nombre}' FETCH FIRST 1 ROWS ONLY)
        )
        `
      );
  
      if(response2.status==400){
        res.status(400).json({message: "error al ingresar participa_competencia"});
      }else{
        res.status(200).json({message: "insersion de competicion y participa_competencia exitoso"});
      }
      //res.status(200).json({message: "insersion de participa_competencia exitoso"});
    }
  }catch (err) { 
    next(err);
  }

});


router.post("/insertPartido_inscidensia", async function(req, res, next){
  try{
    console.log(req.body)
    const {idEmpleado, fecha,Estadio,estado,asistencia,pais_local,equipo_local,pais_visita,equipo_visita,resultado,incidencia,minuto,equipo_incidencia,jugador} = req.body;
    
    let response3 = await service.connect(
      `
      CREATE OR REPLACE TRIGGER noticiaE
      AFTER INSERT ON PARTIDO_INCIDENCIA 
      FOR EACH ROW 
      BEGIN 
        INSERT INTO noticiaEmpleado(idUsuario,idEquipo,cant) values(
        ${idEmpleado},
        (SELECT idEquipo FROM equipo 
        WHERE nombre = '${equipo_incidencia}' FETCH FIRST 1 ROWS ONLY),
        1
        );
      END;
      
      `
    );


    let response = await service.connect(
      `
      INSERT INTO partido_incidencia (fecha,asistencia,incidencia,minuto,equipo_incidencia,idJugador) VALUES ('${fecha}','${asistencia}','${incidencia}',${minuto},
      (SELECT idEquipo FROM equipo 
        WHERE nombre = '${equipo_incidencia}' FETCH FIRST 1 ROWS ONLY),
      (SELECT idJugador FROM jugador 
        WHERE nombre = '${jugador}' FETCH FIRST 1 ROWS ONLY)
      )
      `
    );

    if(response.status==400){
      res.status(400).json({message: "error al ingresar partido_incidencia"});
    }else{

      let response2 = await service.connect(
        `
        INSERT INTO partido(fecha,idEstadio,estado,idPartido_incidencia,equipo_local,equipo_visita,resultado) values(
          '${fecha}',
          (SELECT idEstadio FROM estadio 
            WHERE nombre = '${Estadio}' FETCH FIRST 1 ROWS ONLY),
          '${estado}',
          (SELECT idPartido_incidencia FROM partido_incidencia 
            WHERE fecha = '${fecha}' and incidencia = '${incidencia}' and minuto = ${minuto} FETCH FIRST 1 ROWS ONLY),
          (SELECT idEquipo FROM equipo 
            WHERE pais = '${pais_local}' and nombre = '${equipo_local}' FETCH FIRST 1 ROWS ONLY),
          (SELECT idEquipo FROM equipo 
            WHERE pais = '${pais_visita}' and nombre = '${equipo_visita}' FETCH FIRST 1 ROWS ONLY),
          '${resultado}'
        )
        `
      );
  
      if(response2.status==400){
        res.status(400).json({message: "error al ingresar partido"});
      }else{
        res.status(200).json({message: "insersion de partido_incidencia y partido exitoso"});
      }
      //res.status(200).json({message: "insersion de participa_competencia exitoso"});
    }
  }catch (err) { 
    next(err);
  }

});

router.get("/noticias", async function(req, res, next){
  try{
    console.log(req.body)
    const {fecha,fecha2,estado,resultado} = req.body;
    
    let response = await service.connect(
      `
      SELECT PARTIDO_INCIDENCIA.fecha,PARTIDO_INCIDENCIA.asistencia,PARTIDO_INCIDENCIA.incidencia,PARTIDO_INCIDENCIA.minuto,(equipo.nombre) AS equipo,(jugador.nombre) AS jugador FROM PARTIDO_INCIDENCIA
      JOIN equipo ON equipo.idEquipo = partido_incidencia.equipo_incidencia 
      JOIN jugador ON jugador.idJugador = partido_incidencia.idJugador

      `
    );

    if(response.status==400 || response.data.length==0){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true, data: response.data});
    }

  }catch (err) { 
    next(err);
  }
});


router.get("/resultados", async function(req, res, next){
  try{
    console.log(req.body)
    const {fecha,fecha2,estado,resultado} = req.body;
    
    let response = await service.connect(
      `
      WITH B AS (
        SELECT fecha,equipo_local,equipo_visita,resultado FROM partido
      ), L AS (
        SELECT B.fecha,equipo.nombre,B.equipo_visita,B.resultado FROM equipo,B 
        WHERE B.equipo_Local=equipo.idEquipo
      )
      SELECT L.fecha,(L.nombre) AS local,(equipo.nombre) AS visita,L.resultado FROM equipo,L 
      WHERE L.equipo_visita=equipo.idEquipo

      `
    );

    if(response.status==400 || response.data.length==0){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true, data: response.data});
    }

  }catch (err) { 
    next(err);
  }

});

router.post("/Dat_Est", async function(req, res, next){
  try{
    console.log(req.body)
    const {consulta,dat1,dat2,dat3,dat4} = req.body;

    let response;

    if(consulta=='consulta1'){
      if(dat1 == 'jugador'){
        response = await service.connect(
          `
        ------------1
        ---select jugador
        SELECT distinct jugador.nombre FROM jugador 
        JOIN equipo ON (equipo.idEquipo=jugador.idEquipo AND equipo.nombre='${dat2}')
        `
        );
      }else if(dat1 == 'director'){
        response = await service.connect(
          `
        ------------1
        ----select director
        SELECT distinct director_tecnico.nombre FROM DIRECTOR_EQUIPO
        JOIN director_tecnico ON director_equipo.idDirector_tecnico=director_tecnico.idDirector_tecnico 
        JOIN equipo ON equipo.nombre='${dat2}'
        `
        );
      }

    }else if(consulta=='consulta2'){
      if(dat1 == 'jugador'){
        response = await service.connect(
          `
        -------------2
        ---select jugador
        SELECT nombre, (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_nac,'DD/MM/YYYY'))) AS anios FROM jugador 
        WHERE (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_nac,'DD/MM/YYYY')))>'${dat2}'
        `
        );
      }else if(dat1 == 'director'){
        response = await service.connect(
          `
        -------------2
        ----select director
        SELECT nombre, (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_nac,'DD/MM/YYYY'))) AS anios FROM director_tecnico
        WHERE (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_nac,'DD/MM/YYYY')))>'${dat2}'
        `
        );
      }
    }else if(consulta=='consulta3'){
      if(dat1 == 'jugador'){
        response = await service.connect(
          `
        -------------3
        ---select jugador
        SELECT DISTINCT nombre, (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_nac,'DD/MM/YYYY'))) AS anios FROM jugador 
        WHERE (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_nac,'DD/MM/YYYY')))<'${dat2}' 
        `
        );
      }else if(dat1 == 'director'){
        response = await service.connect(
          `
        -------------3
        ----select director
        SELECT distinct nombre, (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_nac,'DD/MM/YYYY'))) AS anios FROM director_tecnico
        WHERE (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_nac,'DD/MM/YYYY')))<'${dat2}'
        `
        );
      }
    }else if(consulta=='consulta4'){
      response = await service.connect(
        `
        -------------4
        with PC as(
          SELECT participa_competencia.idEquipo FROM participa_competencia
          JOIN competicion ON (PARTICIPA_COMPETENCIA.idCompeticion=competicion.IDCOMPETICION AND competicion.nombre='${dat1}')
        )
        SELECT distinct equipo.nombre FROM equipo,PC
        WHERE PC.idEquipo=equipo.idEquipo
        `
      );
    }else if(consulta=='consulta5'){
      response = await service.connect(
        `
        -------------5
        SELECT distinct nombre FROM EQUIPO
        WHERE pais = '${dat1}'
        `
      );
    }else if(consulta=='consulta6'){
      response = await service.connect(
        `
        -------------6
        SELECT distinct nombre, (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_fun,'DD/MM/YYYY'))) as anios FROM equipo
        WHERE (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_fun,'DD/MM/YYYY')))='${dat1}'
        `
      );
    }else if(consulta=='consulta7'){
      response = await service.connect(
        `
        -------------7
        SELECT distinct nombre FROM estadio
        WHERE pais = '${dat1}'

        `
      );
    }else if(consulta=='consulta8'){
      response = await service.connect(
        `
        -------------8
        SELECT distinct nombre FROM estadio
        WHERE capacidad <='${dat1}'
        `
      );
    }else if(consulta=='consulta9'){
      response = await service.connect(
        `
        -------------9
        WITH E AS (
          SELECT idEquipo FROM equipo WHERE nombre='${dat1}'
        ), B AS (
          SELECT fecha,equipo_local, equipo_visita FROM partido,E 
          WHERE equipo_local=E.idEquipo OR equipo_visita=E.idEquipo
        ), L AS (
          SELECT B.fecha,equipo.nombre,B.equipo_visita FROM equipo,B 
          WHERE B.equipo_Local=equipo.idEquipo
        )
        SELECT L.fecha,(L.nombre) AS local,(equipo.nombre) AS visita FROM equipo,L 
        WHERE L.equipo_visita=equipo.idEquipo
        `
      );
    }else if(consulta=='consulta10'){
      if(dat1 == 'jugador'){
        response = await service.connect(
          `
          -------------10
          SELECT EQUIPO.NOMBRE
          FROM JUGADOR JOIN HISTORIALJUGADOR
          ON JUGADOR.IDJUGADOR = HISTORIALJUGADOR.IDJUGADOR 
          JOIN EQUIPO
          ON HISTORIALJUGADOR.IDEQUIPO = EQUIPO.IDEQUIPO
          WHERE JUGADOR.NOMBRE = '${dat2}'
        `
        );
      }else if(dat1 == 'director'){
        response = await service.connect(
          `
          -------------10
          -------2 director
          SELECT EQUIPO.NOMBRE
          FROM DIRECTOR_EQUIPO JOIN DIRECTOR_TECNICO
          ON DIRECTOR_EQUIPO.IDDIRECTOR_TECNICO = DIRECTOR_TECNICO.IDDIRECTOR_TECNICO 
          JOIN EQUIPO
          ON DIRECTOR_EQUIPO.IDEQUIPO = EQUIPO.IDEQUIPO
          WHERE DIRECTOR_TECNICO .NOMBRE = '${dat2}'
        `
        );
      }
    }else if(consulta=='consulta11'){
      response = await service.connect(
        `
        --------------11
        WITH B AS (
          SELECT row_number() over(partition by partido.fecha,partido.equipo_local,partido.equipo_visita ORDER BY partido.fecha) as partido_juego, partido.fecha,partido.equipo_local,partido.equipo_visita,count(partido.idPartido_incidencia) AS gol FROM partido
          JOIN partido_incidencia ON partido_incidencia.idPartido_incidencia=partido.idPartido_incidencia AND partido_incidencia.fecha=partido.fecha and UPPER(partido_incidencia.incidencia) LIKE ('%GOL%')
          GROUP BY (partido.fecha,partido.equipo_local,partido.equipo_visita)
        ), L AS (
          SELECT B.fecha,equipo.nombre,B.equipo_visita,B.gol FROM equipo,B 
          WHERE B.equipo_Local=equipo.idEquipo
        )
        SELECT L.fecha,(L.nombre) AS local,(equipo.nombre) AS visita,L.gol FROM equipo,L 
        WHERE L.equipo_visita=equipo.idEquipo AND L.gol>='${dat1}'
        `
      );
    }else if(consulta=='consulta12'){
      response = await service.connect(
        `
        --WITH A as(
          SELECT jugador.nombre, count(incidencia) as incidencias FROM partido_incidencia 
          JOIN jugador ON jugador.idJugador=partido_incidencia.idJugador
          WHERE upper(incidencia) LIKE UPPER('%${dat1}%')
          GROUP BY jugador.nombre 
          ORDER BY incidencias DESC 
          --FETCH FIRST 1 ROWS ONLY
          --)
          --SELECT * FROM A WHERE A.incidencias = 1
        `
      );
    }else if(consulta=='consulta13'){
      response = await service.connect(
        `
        --------------13
        --WITH A as(
          SELECT count(partido_incidencia.idJugador) AS incidencias, jugador.nombre FROM partido_incidencia 
          JOIN jugador ON jugador.idJugador=partido_incidencia.idJugador AND EXTRACT(YEAR FROM TO_DATE(partido_incidencia.fecha,'DD/MM/YYYY'))= '${dat2}'
          WHERE upper(incidencia) LIKE UPPER('%${dat1}%')
          GROUP BY jugador.nombre
          ORDER BY incidencias DESC
          --FETCH FIRST 1 ROWS ONLY
          --)
          --SELECT * FROM A WHERE A.incidencias = 1
        `
      );
    }else if(consulta=='consulta14'){
      response = await service.connect(
        `
        --------------14 
        WITH A as(
          SELECT count(campeon) AS total,campeon,IDCOMPETICION FROM PARTICIPA_COMPETENCIA
          GROUP BY campeon,idCompeticion
          ORDER BY total DESC
        )
        SELECT A.total, competicion.nombre  AS competicion ,equipo.nombre FROM A,equipo,competicion
        WHERE A.campeon=equipo.idEquipo AND A.idCompeticion=competicion.idCompeticion AND equipo.nombre='${dat1}' AND competicion.nombre = '${dat2}'
        `
      );
    }else if(consulta=='consulta15'){
      response = await service.connect(
        `
        --------------15
        WITH B AS (
          SELECT fecha,equipo_local,equipo_visita,resultado FROM partido
        ), L AS (
          SELECT B.fecha,equipo.nombre,B.equipo_visita,B.resultado FROM equipo,B 
          WHERE B.equipo_Local=equipo.idEquipo
        )
        SELECT L.fecha,(L.nombre) AS local,(equipo.nombre) AS visita,L.resultado FROM equipo,L 
        WHERE L.equipo_visita=equipo.idEquipo AND EXTRACT(YEAR FROM TO_DATE(L.fecha,'DD/MM/YYYY'))='${dat1}'
        `
      );
    }else if(consulta=='consulta16'){
      response = await service.connect(
        `
        ---------------16
        WITH B AS (
          SELECT fecha,equipo_local,equipo_visita,resultado FROM partido
        ), L AS (
          SELECT B.fecha,equipo.nombre,B.equipo_visita,B.resultado FROM equipo,B 
          WHERE B.equipo_Local=equipo.idEquipo
        ), C AS(
          SELECT L.fecha,(L.nombre) AS local,(equipo.nombre) AS visita,L.resultado FROM equipo,L 
          WHERE L.equipo_visita=equipo.idEquipo
        )
        SELECT C.fecha,C.local,C.visita,C.resultado FROM C
        WHERE (C.local='${dat1}' or C.LOCAL='${dat2}') AND (C.visita='${dat1}' or C.visita='${dat2}')
        `
      );
    }else if(consulta=='consulta17'){
      response = await service.connect(
        `
        ----------------17
        WITH E AS (
          SELECT idEquipo FROM equipo WHERE nombre='${dat1}'
        ), B AS (
          SELECT fecha,equipo_local, equipo_visita FROM partido,E 
          WHERE equipo_local=E.idEquipo OR equipo_visita=E.idEquipo
        ), L AS (
          SELECT B.fecha,equipo.nombre,B.equipo_visita FROM equipo,B 
          WHERE B.equipo_Local=equipo.idEquipo
        )
        SELECT L.fecha,(L.nombre) AS local,(equipo.nombre) AS visita FROM equipo,L 
        WHERE L.equipo_visita=equipo.idEquipo
        `
      );
    }


    /*else if(consulta=='consulta5'){
      response = await service.connect(
        `
  
        `
      );
    }*/


    

    if(response.status==400 || response.data.length==0){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true, data: response.data});
    }

  }catch (err) { 
    next(err);
  }

});


router.get("/insertUsuario", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,usuario,contrasenia,correo,telefono,foto,genero,fecha_nac,fecha_reg,direccion,pais,membresia,tipo,estado} = JSON.parse(localStorage.getItem('respaldo'));;
    
    let response = await service.connect(
      `
      INSERT INTO usuario(nombre,usuario,CLAVE_DE_ACCESO,CORREO,TELEFONO,FOTOGRAFIA,GENERO,FECHA_DE_NACIMIENTO,FECHA_DE_REGISTRO,DIRECCION,pais,cant_mem,cant_din,membresia,estado, TIPO)
      values ('${nombre}','${usuario}','${contrasenia}','${correo}','${telefono}','${foto}','${genero}','${fecha_nac}','${fecha_reg}','${direccion}','${pais}',0,0,0,1,'${tipo}')
      `
    );

    if(response.status==400){
      res.status(200).json({message: "error al ingresar equipo", status: false});
    }else{
      res.status(200).json({message: "insersion de equipo exitoso", status: true});
    }
  }catch (err) { 
    next(err);
  }
});


/*
router.get("/insertUsuario", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,usuario,clave_de_acceso,correo,telefono,fotografia,genero,fecha_de_nacimiento,fecha_de_registro,direccion,pais,tipo} = JSON.parse(localStorage.getItem('respaldo'));
    
    let response = await service.connect(
      `insert into usuario (nombre,usuario,clave_de_acceso,correo,telefono,fotografia,genero,fecha_de_nacimiento,fecha_de_registro,direccion,pais,tipo)
      values ('${nombre}','${usuario}','${clave_de_acceso}','${correo}','${telefono}','${fotografia}','${genero}','${fecha_de_nacimiento}','${fecha_de_registro}','${direccion}','${pais}','${tipo}')`
    );

    if(response.status==400){
      res.status(400).json({message: "error al ingresar usuario", status: false});
    }else{
      res.status(200).json({message: "insersion de usuario exitoso", status: true});
    }
  }catch (err) { 
    next(err);
  }

});
*/

router.post("/insertMembresia", async function(req, res, next){
  try{
    console.log(req.body)
    const {fecha,id,equipo} = req.body;
    
    let response = await service.connect(
      `
      INSERT INTO USUARIO_EQUIPO(fecha_suscrip,tiempo,idusuario,idequipo) VALUES (
        '${fecha}',
        30,
        '${id}',
        (SELECT idEquipo FROM EQUIPO
          WHERE nombre = '${equipo}')
      )
      `
    );
    let response2 = await service.connect(
      `
      UPDATE usuario
      set membresia=1, CANT_MEM=(CANT_MEM+1), CANT_DIN=(CANT_DIN+15)
      WHERE idUsuario = '${id}' and tipo='usuario'

      `
    );

    if(response.status==400){
      res.status(200).json({message: "error al ingresar equipo", status: false});
    }else{
      res.status(200).json({message: "insersion de equipo exitoso", status: true});
    }
  }catch (err) { 
    next(err);
  }
});


router.post("/getUsuario", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,usuario,contrasenia} = req.body;
    
    let response = await service.connect(
      `
      SELECT * FROM usuario WHERE nombre='${nombre}' and usuario='${usuario}' AND CLAVE_DE_ACCESO='${contrasenia}'
      `
    );

    if(response.status==400){
      res.status(400).json({message: response.message});
    }else{
      if(response.data.length==0){
          res.status(200).json({message: "equipo no encontrado", estado: false});
      }else{
          res.status(200).json({message: "usuario correcto", estado: true,data: response.data[0]});
      }
    }
  }catch (err) { 
    next(err);
  }

});


router.post("/modificaUsuario", async function(req, res, next){
  try{
    const {perfil, idUsuario,nombre,usuario,clave_de_acceso,CORREO,telefono,fotografia,genero,cant_mem,cant_din,estado,pais,fecha_de_nacimiento,membresia,tipo,fecha_admin,descripcion,id_admin} = req.body;
  
    let response;
    
    if (perfil == false) {
      response = await service.connect(
          `

          UPDATE usuario
          set nombre='${nombre}',CLAVE_DE_ACCESO='${clave_de_acceso}',TELEFONO=${telefono},FOTOGRAFIA='${fotografia}',
          GENERO='${genero}',pais='${pais}',cant_mem=${cant_mem},cant_din=${cant_din},estado=${estado},tipo='${tipo}'
          where idUsuario=${idUsuario} and tipo='${tipo}'
          `
      );
      let response2 = await service.connect(
        `
        BEGIN 
          uppdateUsuario('${fecha_admin}','${descripcion}',${id_admin});
        END;
        `
    );
    }else {
      response = await service.connect(
        `
        UPDATE usuario
        set nombre='${nombre}',CLAVE_DE_ACCESO='${clave_de_acceso}',TELEFONO=${telefono},FOTOGRAFIA='${fotografia}',
        GENERO='${genero}', fecha_de_nacimiento='${fecha_de_nacimiento}',pais='${pais}',cant_mem=${cant_mem},cant_din=${cant_din},estado=${estado},tipo='${tipo}'
        where idUsuario=${idUsuario} and tipo='${tipo}'
        `
      );
    }

    if(response.status==400){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true});
    }

  }catch (err) { 
    next(err);
  }
});



router.post("/reportes", async function(req, res, next){
  try{
    console.log(req.body)
    const {reporte,dat1,dat2,dat3,dat4} = req.body;

    let response;

    if(reporte=='reporte1'){
      response = await service.connect(
        `
        --------------------1
        SELECT usuario.nombre,usuario.usuario FROM usuario_equipo 
        JOIN usuario ON usuario.idusuario = usuario_equipo.idUsuario 
        JOIN equipo ON equipo.idequipo = usuario_equipo.idequipo 
        WHERE equipo.nombre = '${dat1}' AND usuario.tipo = 'usuario'
      `
      );

    }else if(reporte=='reporte2'){
      if(dat1 == 'con'){
        response = await service.connect(
          `
          --------------------2
          SELECT nombre,usuario FROM usuario 
          WHERE CANT_MEM  > 0 AND tipo = 'usuario'
        `
        );
      }else if(dat1 == 'sin'){
        response = await service.connect(
          `
        --------------------2
        SELECT nombre,usuario FROM usuario 
        WHERE CANT_MEM  = 0  AND tipo = 'usuario' ---0/sin
        `
        );
      }
    }else if(reporte=='reporte3'){
      response = await service.connect(
          `
          --------------------3
          SELECT CANT_MEM, nombre, usuario FROM usuario
          WHERE tipo = 'usuario'
          ORDER BY CANT_MEM DESC
          FETCH FIRST 10 ROWS ONLY
        `
        );
    }else if(reporte=='reporte4'){
      response = await service.connect(
        `
        --------------------4
        SELECT CANT_DIN , nombre, usuario FROM usuario
        WHERE tipo = 'usuario'
        ORDER BY CANT_DIN DESC
        FETCH FIRST 10 ROWS ONLY
        `
      );
    }else if(reporte=='reporte5'){
      response = await service.connect(
        `
        --------------------5
        SELECT nombre,usuario FROM USUARIO
        WHERE pais = '${dat1}' AND tipo = 'usuario'
        `
      );
    }else if(reporte=='reporte6'){
      response = await service.connect(
        `
        --------------------6
        SELECT nombre,usuario FROM usuario
        WHERE genero = '${dat1}' AND tipo = 'usuario'
        `
      );
    }else if(reporte=='reporte7'){
      response = await service.connect(
        `
        --------------------7
        SELECT nombre,usuario,(EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_de_nacimiento,'DD/MM/YYYY'))) AS anios FROM usuario 
        WHERE (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_de_nacimiento,'DD/MM/YYYY'))) >= '${dat1}' AND tipo='usuario'
        ORDER BY anios ASC 

        `
      );
    }else if(reporte=='reporte8'){
      if(dat1 == 'menos'){
        response = await service.connect(
          `
          --------------------8
          SELECT usuario.nombre,usuario.usuario, count(noticiaEmpleado.idUsuario) AS cant_noticias FROM noticiaEmpleado
          JOIN usuario ON usuario.IDUSUARIO = noticiaEmpleado.idUsuario AND usuario.tipo != 'usuario'
          GROUP BY (usuario.nombre,usuario.usuario)
          ORDER BY cant_noticias ASC
          FETCH FIRST 10 ROWS ONLY      
        `
        );
      }else if(dat1 == 'mas'){
        response = await service.connect(
          `
          --------------------8
          SELECT usuario.nombre,usuario.usuario, count(noticiaEmpleado.idUsuario) AS cant_noticias FROM noticiaEmpleado
          JOIN usuario ON usuario.IDUSUARIO = noticiaEmpleado.idUsuario AND usuario.tipo != 'usuario'
          GROUP BY (usuario.nombre,usuario.usuario)
          ORDER BY cant_noticias DESC
          FETCH FIRST 10 ROWS ONLY       
        `
        );
      }
    } else if(reporte=='reporte9'){
      if(dat1 == 'menos'){
        response = await service.connect(
          `
          --------------------9
          SELECT usuario.nombre,usuario.usuario, count(noticiaEmpleado.idUsuario) AS cant_noticias FROM noticiaEmpleado
          JOIN usuario ON usuario.IDUSUARIO = noticiaEmpleado.idUsuario AND usuario.tipo != 'usuario'
          JOIN equipo ON equipo.IDEQUIPO = noticiaEmpleado.idEquipo AND equipo.nombre = '${dat2}'
          GROUP BY (usuario.nombre,usuario.usuario)
          ORDER BY cant_noticias ASC 
          FETCH FIRST 10 ROWS ONLY         
        `
        );
      }else if(dat1 == 'mas'){
        response = await service.connect(
          `
          --------------------9
          SELECT usuario.nombre,usuario.usuario, count(noticiaEmpleado.idUsuario) AS cant_noticias FROM noticiaEmpleado
          JOIN usuario ON usuario.IDUSUARIO = noticiaEmpleado.idUsuario AND usuario.tipo != 'usuario'
          JOIN equipo ON equipo.IDEQUIPO = noticiaEmpleado.idEquipo AND equipo.nombre = '${dat2}'
          GROUP BY (usuario.nombre,usuario.usuario)
          ORDER BY cant_noticias DESC 
          FETCH FIRST 10 ROWS ONLY            
        `
        );
      }
    }else if(reporte=='reporte10'){
      response = await service.connect(
        `
        SELECT bitacoraAdmin.fecha, usuario.nombre,usuario.usuario, bitacoraAdmin.descripcion FROM bitacoraAdmin 
        JOIN usuario ON usuario.idUsuario = bitacoraAdmin.idUsuario AND usuario.tipo = 'administrador'

      `
      );
    }

    if(response.status==400 || response.data.length==0){
      res.status(200).json({message: "datos no modificados de la tabla equipo", estado: false});
    }else{
      res.status(200).json({message: "datos modificados de la tabla equipo", estado: true, data: response.data});
    }

  }catch (err) { 
    next(err);
  }

});

router.post("/enviarCorreo", async function(req, res, next){
  try{
    console.log(req.body)
    localStorage.setItem('respaldo', JSON.stringify(req.body))

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: 'correoarchviosvacas@gmail.com',
        pass: 'archivosvacas'
      }
    });
    
    let texto_correo = 'bienvenido \nusuario: '+req.body.usuario +'\ncontraseña: '+ req.body.contrasenia+'\n\ningresa a esta ruta para validar tu usuario\nhttp://localhost:9000/insertUsuario';
    let correo2 = req.body.correo
    let conf_usurario = `Confimar usuario: ${req.body.usuario}`

    let mailOptions = {
      from: 'correoarchviosvacas@gmail.com',
      to: correo2,
      subject: conf_usurario,
      text: texto_correo,
    }
    
    
    transporter.sendMail(mailOptions, function(err,data){
      if(err){
        console.log('Error ocurrido', err);
      }else {
        console.log('todo bien');
      }
    });
  }catch (err) { 
    next(err);
  }

});



router.post("/cargarEstadio", async function(req, res, next){
  const {ruta,dat1,dat2,dat3,dat4} = req.body;
    let path = './archivos/'+`${ruta}`
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);
    let consulta,result 
    console.log(json);

    let response;
    for(let i=0;i<json.length;i++){
      //const datosJson = [json[i].Pais,json[i].Nombre,json[i].Fecha_ing,json[i].Capacidad,json[i].Direccion,json[i].Estado];
      //console.log(datosJson);
      try{
        response = await service.connect(
          `
          INSERT INTO estadio (pais,nombre,fecha_ing,capacidad,direccion,estado) VALUES ('${json[i].Pais}','${json[i].Nombre}','${json[i].Fecha_ing}','${json[i].Capacidad}','${json[i].Direccion}','${json[i].Estado}')
          `
        );

      }catch(err){
        console.error(err)
        return{estado: false,err}
      }finally{
        if(consulta){
          consulta.release((err)=>{
            if(err){
              console.error(err)
            }
          })
        }
      }
    }
    if(response.status==400){
      res.status(200).json({message: "datos no ingresados", estado: false});
    }else{
      res.status(200).json({message: "datos ingresados", estado: true});
    }
    //return {estado:true}
});



router.post("/cargarEquipo", async function(req, res, next){
  const {ruta,dat1,dat2,dat3,dat4} = req.body;
    let path = './archivos/'+`${ruta}`
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);
    let consulta,result 
    console.log(json);

    let response;
    for(let i=0;i<json.length;i++){
      //const datosJson = [json[i].Pais,json[i].Nombre,json[i].Fecha_ing,json[i].Capacidad,json[i].Direccion,json[i].Estado];
      //console.log(datosJson);
      try{
        response = await service.connect(
          `
          insert into equipo(nombre,fecha_fun,pais) 
          values ('${json[i].Nombre}','${json[i].Fecha_Fun}','${json[i].Pais}')
          `
        );

      }catch(err){
        console.error(err)
        return{estado: false,err}
      }finally{
        if(consulta){
          consulta.release((err)=>{
            if(err){
              console.error(err)
            }
          })
        }
      }
    }
    if(response.status==400){
      res.status(200).json({message: "datos no ingresados", estado: false});
    }else{
      res.status(200).json({message: "datos ingresados", estado: true});
    }
    //return {estado:true}
});

router.post("/cargarDirector", async function(req, res, next){
  const {ruta,dat1,dat2,dat3,dat4} = req.body;
    let path = './archivos/'+`${ruta}`
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);
    let consulta,result 
    console.log(json);

    let response;
    for(let i=0;i<json.length;i++){
      //const datosJson = [json[i].Pais,json[i].Nombre,json[i].Fecha_ing,json[i].Capacidad,json[i].Direccion,json[i].Estado];
      //console.log(datosJson);
      try{
        response = await service.connect(
          `INSERT INTO director_tecnico(nombre,fecha_nac,pais,estado) VALUES ('${json[i].Nombres}','${json[i].Fecha_Nac}','${json[i].Pais}','${json[i].Estado}')
          `
        );

        let response2 = await service.connect(
          `INSERT INTO director_equipo(idDirector_tecnico,idEquipo,fecha_ini,fecha_fin) values(
            (SELECT idDirector_tecnico FROM director_tecnico 
              WHERE nombre = '${json[i].Nombres}' FETCH FIRST 1 ROWS ONLY),
            (SELECT idEquipo FROM equipo 
              WHERE nombre = '${json[i].Equipo}' FETCH FIRST 1 ROWS ONLY),
            '${json[i].Fecha_Ini}',
            '${json[i].Fecha_Fin}'
          )
          `
        );

      }catch(err){
        console.error(err)
        return{estado: false,err}
      }finally{
        if(consulta){
          consulta.release((err)=>{
            if(err){
              console.error(err)
            }
          })
        }
      }
    }
    if(response.status==400){
      res.status(200).json({message: "datos no ingresados", estado: false});
    }else{
      res.status(200).json({message: "datos ingresados", estado: true});
    }
    //return {estado:true}
});

router.post("/cargarJugador", async function(req, res, next){
  const {ruta,dat1,dat2,dat3,dat4} = req.body;
    let path = './archivos/'+`${ruta}`
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);
    let consulta,result 
    console.log(json);

    let response;
    for(let i=0;i<json.length;i++){
      //const datosJson = [json[i].Pais,json[i].Nombre,json[i].Fecha_ing,json[i].Capacidad,json[i].Direccion,json[i].Estado];
      //console.log(datosJson);
      try{
        response = await service.connect(
          `
          INSERT INTO jugador (nombre,fecha_nac,nacionalidad,posicion,idEquipo) VALUES ('${json[i].Nombre}','${json[i].Fecha_Nac}','${json[i].Nacionalidad}','${json[i].Posicion}'
            ,(select idEquipo from equipo where nombre = '${json[i].Equipo}' FETCH FIRST 1 ROWS ONLY))
          `
        );


        let response2 = await service.connect(
          `
          INSERT INTO HISTORIALJUGADOR(idJugador,posicion, idEquipo,fecha_ini,fecha_fin) values(
              (SELECT idJugador FROM jugador 
                WHERE nombre = '${json[i].Nombre}' FETCH FIRST 1 ROWS ONLY),
                '${json[i].Posicion}',
              (SELECT idEquipo FROM equipo 
                WHERE nombre = '${json[i].Equipo}' FETCH FIRST 1 ROWS ONLY),
                '${json[i].Fecha_Ini}',
                '${json[i].FEcha_Fin}'
          )
          `
        );


      }catch(err){
        console.error(err)
        return{estado: false,err}
      }finally{
        if(consulta){
          consulta.release((err)=>{
            if(err){
              console.error(err)
            }
          })
        }
      }
    }
    if(response.status==400){
      res.status(200).json({message: "datos no ingresados", estado: false});
    }else{
      res.status(200).json({message: "datos ingresados", estado: true});
    }
    //return {estado:true}
});

router.post("/cargarCompeticion", async function(req, res, next){
  const {ruta,dat1,dat2,dat3,dat4} = req.body;
    let path = './archivos/'+`${ruta}`
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);
    let consulta,result 
    console.log(json);

    let response;
    for(let i=0;i<json.length;i++){
      //const datosJson = [json[i].Pais,json[i].Nombre,json[i].Fecha_ing,json[i].Capacidad,json[i].Direccion,json[i].Estado];
      //console.log(datosJson);
      try{
        response = await service.connect(
          `
          INSERT INTO competicion (nombre,anio,tipo,pais) VALUES ('${json[i].Nombre}',${json[i].Año},'${json[i].Tipo}','${json[i].Pais}')
          `
        );
        

        let response2 = await service.connect(
          `
          INSERT INTO participa_competencia(campeon,idEquipo,idCompeticion) values(
              (SELECT idEquipo FROM equipo 
                WHERE nombre = '${json[i].Campeon}' FETCH FIRST 1 ROWS ONLY),
              (SELECT idEquipo FROM equipo 
                WHERE nombre = '${json[i].Equipo}' FETCH FIRST 1 ROWS ONLY),
              (SELECT idCompeticion FROM competicion 
                WHERE nombre = '${json[i].Nombre}' FETCH FIRST 1 ROWS ONLY)
          )
          `
        );



      }catch(err){
        console.error(err)
        return{estado: false,err}
      }finally{
        if(consulta){
          consulta.release((err)=>{
            if(err){
              console.error(err)
            }
          })
        }
      }
    }
    if(response.status==400){
      res.status(200).json({message: "datos no ingresados", estado: false});
    }else{
      res.status(200).json({message: "datos ingresados", estado: true});
    }
    //return {estado:true}
});


router.post("/cargarIncidencias", async function(req, res, next){
  const {ruta,dat1,dat2,dat3,dat4} = req.body;
    let path = './archivos/'+`${ruta}`
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);
    let consulta,result 
    console.log(json);

    let response;
    for(let i=0;i<json.length;i++){
      //const datosJson = [json[i].Pais,json[i].Nombre,json[i].Fecha_ing,json[i].Capacidad,json[i].Direccion,json[i].Estado];
      //console.log(datosJson);
      try{
        let response3 = await service.connect(
          `
          CREATE OR REPLACE TRIGGER noticiaE
          AFTER INSERT ON PARTIDO_INCIDENCIA 
          FOR EACH ROW 
          BEGIN 
            INSERT INTO noticiaEmpleado(idUsuario,idEquipo,cant) values(
            ${dat1},
            (SELECT idEquipo FROM equipo 
            WHERE nombre = '${json[i].Equipo_Incidencia}' FETCH FIRST 1 ROWS ONLY),
            1
            );
          END;
          
          `
        );

        response = await service.connect(
          `
          INSERT INTO partido_incidencia (fecha,asistencia,incidencia,minuto,equipo_incidencia,idJugador) VALUES ('${json[i].Fecha}','${json[i].Asistencia}','${json[i].Incidencia}',${json[i].Minuto},
          (SELECT idEquipo FROM equipo 
            WHERE nombre = '${json[i].Equipo_Incidencia}' FETCH FIRST 1 ROWS ONLY),
          (SELECT idJugador FROM jugador 
            WHERE nombre = '${json[i].Jugador}' FETCH FIRST 1 ROWS ONLY)
          )
          `
        );
    
        let response2 = await service.connect(
          `
          INSERT INTO partido(fecha,idEstadio,estado,idPartido_incidencia,equipo_local,equipo_visita,resultado) values(
            '${json[i].Fecha}',
            (SELECT idEstadio FROM estadio 
              WHERE nombre = '${json[i].Estadio}' FETCH FIRST 1 ROWS ONLY),
            '${json[i].Estado}',
            (SELECT idPartido_incidencia FROM partido_incidencia 
              WHERE fecha = '${json[i].Fecha}' and incidencia = '${json[i].Incidencia}' and minuto = ${json[i].Minuto} FETCH FIRST 1 ROWS ONLY),
            (SELECT idEquipo FROM equipo 
              WHERE pais = '${json[i].Pais_Local}' and nombre = '${json[i].Equipo_Local}' FETCH FIRST 1 ROWS ONLY),
            (SELECT idEquipo FROM equipo 
              WHERE pais = '${json[i].Pais_Visita}' and nombre = '${json[i].Equipo_Visita}' FETCH FIRST 1 ROWS ONLY),
            '${json[i].Resultado}'
          )
          `
        );
        





      }catch(err){
        console.error(err)
        return{estado: false,err}
      }finally{
        if(consulta){
          consulta.release((err)=>{
            if(err){
              console.error(err)
            }
          })
        }
      }
    }
    if(response.status==400){
      res.status(200).json({message: "datos no ingresados", estado: false});
    }else{
      res.status(200).json({message: "datos ingresados", estado: true});
    }
    //return {estado:true}
});


router.post("/cargar", async function(req, res, next){
  const {ruta,dat1,dat2,dat3,dat4} = req.body;
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(`${ruta}`);
    let consulta,result 
    console.log(json);

    let response;
    for(let i=0;i<json.length;i++){
      //const datosJson = [json[i].Pais,json[i].Nombre,json[i].Fecha_ing,json[i].Capacidad,json[i].Direccion,json[i].Estado];
      //console.log(datosJson);
      try{
        /*response = await service.connect(
          `
          insert into equipo(nombre,fecha_fun,pais, foto_logo) 
          values ('${nombre}','${fecha_fun}','${pais}','${foto_logo}')
          `
        );*/

      }catch(err){
        console.error(err)
        return{estado: false,err}
      }finally{
        if(consulta){
          consulta.release((err)=>{
            if(err){
              console.error(err)
            }
          })
        }
      }
    }
    /*if(response.status==400){
      res.status(200).json({message: "datos no ingresados", estado: false});
    }else{
      res.status(200).json({message: "datos ingresados", estado: true});
    }*/
    //return {estado:true}
});



router.get("/reiniciarDB", async function(req, res, next){
  try{
    console.log(req.body)
    const {nombre,pais,fecha_fun, foto_logo} = req.body;
    
      response = await service.connect(`drop table usuario_equipo`);
      response = await service.connect(`DROP TABLE NOTICIAEMPLEADO`);
      response = await service.connect(`DROP TABLE BITACORAADMIN`);
      response = await service.connect(`drop table usuario`);
      response = await service.connect(`drop table director_equipo`);
      response = await service.connect(`drop table director_tecnico`);
      response = await service.connect(`drop table participa_competencia`);
      response = await service.connect(`drop table competicion`);
      response = await service.connect(`drop table Historialjugador`);
      response = await service.connect(`drop table partido`);
      response = await service.connect(`drop table partido_incidencia`);
      response = await service.connect(`drop table estadio`);
      response = await service.connect(`drop table jugador`);
      response = await service.connect(`drop table equipo`);

      response = await service.connect(`CREATE TABLE equipo(
        idEquipo NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        nombre varchar(200),
        pais varchar(200),
        fecha_fun varchar(200), ---fundacion
        foto_logo varchar(200)
        --idDirector_tecnico int,
        --FOREIGN KEY (idDirector_tecnico) REFERENCES director_tecnico (idDirector_tecnico)
      )`);
      response = await service.connect(`CREATE TABLE director_tecnico(
        idDirector_tecnico NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        nombre varchar(200),
        fecha_nac varchar(200),
        pais varchar(200),
        nacionalidad varchar(200),
        estado varchar(200),
        foto varchar(200)
        --pais_equipo varchar(200),
        --idEquipo int, --------fk
        --fecha_ini varchar(200),
        --fecha_fin varchar(200),
        --FOREIGN KEY (idEquipo) REFERENCES equipo(idEquipo)
      )`);
      response = await service.connect(`CREATE TABLE director_equipo(
        idDirector_equipo NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        idDirector_tecnico int,
        idEquipo int,
        --pais_equipo varchar(200),
        fecha_ini varchar(200),
        fecha_fin varchar(200),
        FOREIGN KEY (idDirector_tecnico) REFERENCES director_tecnico(idDirector_tecnico),
        FOREIGN KEY (idEquipo) REFERENCES equipo(idEquipo)
      )`);
      response = await service.connect(`CREATE TABLE jugador(
        idJugador NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        nombre varchar(200),
        fecha_nac varchar(200),
        nacionalidad varchar(200),
        posicion varchar(200), ---(portero, defensa, medio, delantero)
        --pais_equipo varchar(200),
        idEquipo int, ------fk
        --fecha_ini varchar(200),
        --fecha_fin varchar(200),
        FOREIGN KEY (idEquipo) REFERENCES equipo (idEquipo)
        --FOREIGN KEY (idEquipo) REFERENCES equipo (idEquipo)
      )`);
      response = await service.connect(`CREATE TABLE historialJugador(
        idHistorialjugador NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        idJugador int,
        posicion varchar(200), ---(portero, defensa, medio, delantero)
        idEquipo int, ------fk
        fecha_ini varchar(200),
        fecha_fin varchar(200),
        FOREIGN KEY (idJugador) REFERENCES jugador (idJugador),
        FOREIGN KEY (idEquipo) REFERENCES equipo (idEquipo)
      )`);
      response = await service.connect(`CREATE TABLE competicion(
        idCompeticion NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        nombre varchar(200),
        anio int,
        tipo varchar(200),
        --compeon int, -------fk
        pais varchar(200)
      )`);
      response = await service.connect(`CREATE TABLE participa_competencia(
        idParticipa_competencia NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        campeon int, --- si/no
        --pais_equipo varchar(200),
        idEquipo int,
        idCompeticion int,
        FOREIGN KEY (campeon) REFERENCES equipo(idEquipo),
        FOREIGN KEY (idEquipo) REFERENCES equipo(idEquipo),
        FOREIGN KEY (idCompeticion) REFERENCES competicion(idCompeticion)
      )`);
      response = await service.connect(`CREATE TABLE estadio(
        idEstadio NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        pais varchar(200),
        nombre varchar(200),
        fecha_ing varchar(200),
        capacidad int,
        direccion varchar(200),
        estado varchar(200),
        foto varchar(200)
      )`);
      response = await service.connect(`CREATE TABLE partido_incidencia(
        idPartido_incidencia NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        fecha varchar(200),
        asistencia varchar(200),
        incidencia varchar(200),
        minuto int,
        equipo_incidencia int, ------fk
        idJugador int, ----fk
        FOREIGN KEY (equipo_incidencia) REFERENCES equipo(idEquipo),
        FOREIGN KEY (idJugador) REFERENCES jugador(idJugador)
      )`);
      response = await service.connect(`CREATE TABLE partido(
        idPartido NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        fecha varchar(200),
        idEstadio int,-----------fk
        estado varchar(200), --(sin iniciar, en curso, finalizado, suspendido)
        idPartido_incidencia int, ----# cantidad de personas que llegan al partido
        --pais_local varchar(200),
        equipo_local int, -------fk
        --pais_visita varchar(200),
        equipo_visita int,------fk
        resultado varchar(200),
        ---idPartido_incidencia int,
        --idEquipo int,-----fk
        FOREIGN KEY (idEstadio) REFERENCES estadio(idEstadio),
        FOREIGN KEY (idPartido_incidencia) REFERENCES partido_incidencia(idPartido_incidencia),
        FOREIGN KEY (equipo_visita) REFERENCES equipo(idEquipo),
        FOREIGN KEY (equipo_local) REFERENCES equipo(idEquipo)
      )`);
      response = await service.connect(`create table usuario (
        idUsuario NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        nombre varchar(200) NOT null,
        --pellidos varchar,
        usuario varchar(2000),
        clave_de_acceso varchar(200) NOT null,
        correo varchar(200) NOT null,
        telefono int NOT null,
        fotografia varchar(200) NOT null,
        genero varchar(200) NOT null,
        fecha_de_nacimiento varchar(200) NOT null,
        fecha_de_Registro varchar(200) NOT null,
        direccion varchar(200) NOT null,
        pais varchar(200) NOT null,
        cant_mem int,
        cant_din int,
        membresia int,
        estado int,------1/activo, 0/suspendido, 2/congelado
        tipo varchar(200) --(Explicado en el módulo de Clientes)
      )`);
      response = await service.connect(`CREATE TABLE bitacoraAdmin(
        idBitacora NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        fecha varchar(200),
        descripcion varchar(200),
        idUsuario int,
        FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
      )`);
      response = await service.connect(`CREATE TABLE usuario_equipo(
        idUsuario_equipo NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        fecha_suscrip varchar(200),
        tiempo int,
        idUsuario int,
        idEquipo int,
        FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
        FOREIGN KEY (idEquipo) REFERENCES equipo(idEquipo)
      )`);
      response = await service.connect(`CREATE TABLE noticiaEmpleado(
        idNOticia NUMBER GENERATED ALWAYS AS identity(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
        idUsuario int,
        idEquipo int,
        cant int,
        FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
        FOREIGN KEY (idEquipo) REFERENCES equipo(idEquipo)
      )`);
      response = await service.connect(`INSERT INTO usuario(nombre,usuario,CLAVE_DE_ACCESO,CORREO,TELEFONO,FOTOGRAFIA,GENERO,FECHA_DE_NACIMIENTO,FECHA_DE_REGISTRO,DIRECCION,pais,cant_mem,cant_din,membresia,estado,TIPO)
      VALUES ('admin','admin','1234','prueba@gmail.com',12345678,'foto.png','M','06/06/1998','06/06/2001','zona 14','guatemala',0,0,0,1,'administrador')
      `);

    if(response.status==400){
      res.status(200).json({message: "error al ingresar equipo", status: false});
    }else{
      res.status(200).json({message: "insersion de equipo exitoso", status: true});
    }
  }catch (err) { 
    next(err);
  }
});


router.post("/nuevaContrasenia", async function(req, res, next){
  let response;
  try{
    console.log(req.body)
    const {usuario,correo,nombre2,pais2,fecha_fun,foto_logo} = req.body;

    response = await service.connect(
      `
      UPDATE usuario
      set CLAVE_DE_ACCESO='152$distinct'
      WHERE usuario = '${req.body.usuario}' and tipo='usuario'

      `
    );



    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: 'correoarchviosvacas@gmail.com',
        pass: 'archivosvacas'
      }
    });
    
    let texto_correo = 'RECUPERAR CONTRASEÑA \nusuario: '+req.body.usuario +'\nnueva contraseña: 152$distinct'+'\n\nPuedes cambiar la contraseña dentro de tu perfil';
    let correo2 = req.body.correo
    let conf_usurario = `Recuperar contraseña de ${req.body.usuario}`

    let mailOptions = {
      from: 'correoarchviosvacas@gmail.com',
      to: correo2,
      subject: conf_usurario,
      text: texto_correo,
    }
    
    
    transporter.sendMail(mailOptions, function(err,data){
      if(err){
        console.log('Error ocurrido', err);
      }else {
        console.log('todo bien');
      }
    });
  }catch (err) { 
    next(err);
  }

  if(response.status==400){
    res.status(200).json({message: "Correo no enviado", estado: false});
  }else{
    res.status(200).json({message: "correo enviado", estado: true});
  }

});


router.post("/descargaReporte1", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta = await service.connect(
    `
    --------------------1
    SELECT usuario.nombre,usuario.usuario FROM usuario_equipo 
    JOIN usuario ON usuario.idusuario = usuario_equipo.idUsuario 
    JOIN equipo ON equipo.idequipo = usuario_equipo.idequipo 
    WHERE equipo.nombre = '${dat1}' AND usuario.tipo = 'usuario'
  `
  );

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 

});


router.post("/descargaReporte2", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta;
  
  if(dat1 == 'con'){
    consulta = await service.connect(
      `
      --------------------2
      SELECT nombre,usuario FROM usuario 
      WHERE CANT_MEM  > 0 AND tipo = 'usuario'
    `
    );
  }else if(dat1 == 'sin'){
    consulta = await service.connect(
      `
    --------------------2
    SELECT nombre,usuario FROM usuario 
    WHERE CANT_MEM  = 0  AND tipo = 'usuario' ---0/sin
    `
    );
  }

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 

});


router.post("/descargaReporte3", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta;
  
  
  consulta = await service.connect(
    `
    --------------------3
    SELECT CANT_MEM, nombre, usuario FROM usuario
    WHERE tipo = 'usuario'
    ORDER BY CANT_MEM DESC
    FETCH FIRST 10 ROWS ONLY
  `
  );

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Cantidad de membresias </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += `<td> ${registro.CANT_MEM} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 

});


router.post("/descargaReporte4", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta;
  
  
  consulta = await service.connect(
    `
    --------------------4
    SELECT CANT_DIN , nombre, usuario FROM usuario
    WHERE tipo = 'usuario'
    ORDER BY CANT_DIN DESC
    FETCH FIRST 10 ROWS ONLY
    `
  );

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Dinero gastado </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += `<td> ${registro.CANT_DIN} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 

});


router.post("/descargaReporte5", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta;
  
  
  consulta = await service.connect(
    `
    --------------------5
    SELECT nombre,usuario FROM USUARIO
    WHERE pais = '${dat1}' AND tipo = 'usuario'
    `
  );

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 

});


router.post("/descargaReporte6", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta;
  
  
  consulta = await service.connect(
    `
    --------------------6
    SELECT nombre,usuario FROM usuario
    WHERE genero = '${dat1}' AND tipo = 'usuario'
    `
  );

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 

});

router.post("/descargaReporte7", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta;
  
  
  consulta = await service.connect(
    `
    --------------------7
    SELECT nombre,usuario,(EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_de_nacimiento,'DD/MM/YYYY'))) AS anios FROM usuario 
    WHERE (EXTRACT(YEAR FROM TO_DATE('12/12/2021','DD/MM/YYYY')) - EXTRACT(YEAR FROM TO_DATE(fecha_de_nacimiento,'DD/MM/YYYY'))) >= '${dat1}' AND tipo='usuario'
    ORDER BY anios ASC 

    `
  );

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Años </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += `<td> ${registro.ANIOS} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 

});


router.post("/descargaReporte8", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta;
  
  
  if(dat1 == 'menos'){
    consulta = await service.connect(
      `
      --------------------8
      SELECT usuario.nombre,usuario.usuario, count(noticiaEmpleado.idUsuario) AS cant_noticias FROM noticiaEmpleado
      JOIN usuario ON usuario.IDUSUARIO = noticiaEmpleado.idUsuario AND usuario.tipo != 'usuario'
      GROUP BY (usuario.nombre,usuario.usuario)
      ORDER BY cant_noticias ASC
      FETCH FIRST 10 ROWS ONLY      
    `
    );
  }else if(dat1 == 'mas'){
    consulta = await service.connect(
      `
      --------------------8
      SELECT usuario.nombre,usuario.usuario, count(noticiaEmpleado.idUsuario) AS cant_noticias FROM noticiaEmpleado
      JOIN usuario ON usuario.IDUSUARIO = noticiaEmpleado.idUsuario AND usuario.tipo != 'usuario'
      GROUP BY (usuario.nombre,usuario.usuario)
      ORDER BY cant_noticias DESC
      FETCH FIRST 10 ROWS ONLY       
    `
    );
  }

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Cantidad de noticias publicadas </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += `<td> ${registro.CANT_NOTICIAS} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 

});

router.post("/descargaReporte9", async function(req, res, next){

  console.log(req.body)
  const {reporte,dat1,dat2,dat3,dat4} = req.body;
  let consulta;
  
  
  if(dat1 == 'menos'){
    consulta = await service.connect(
      `
      --------------------9
      SELECT usuario.nombre,usuario.usuario, count(noticiaEmpleado.idUsuario) AS cant_noticias FROM noticiaEmpleado
      JOIN usuario ON usuario.IDUSUARIO = noticiaEmpleado.idUsuario AND usuario.tipo != 'usuario'
      JOIN equipo ON equipo.IDEQUIPO = noticiaEmpleado.idEquipo AND equipo.nombre = '${dat2}'
      GROUP BY (usuario.nombre,usuario.usuario)
      ORDER BY cant_noticias ASC 
      FETCH FIRST 10 ROWS ONLY         
    `
    );
  }else if(dat1 == 'mas'){
    consulta = await service.connect(
      `
      --------------------9
      SELECT usuario.nombre,usuario.usuario, count(noticiaEmpleado.idUsuario) AS cant_noticias FROM noticiaEmpleado
      JOIN usuario ON usuario.IDUSUARIO = noticiaEmpleado.idUsuario AND usuario.tipo != 'usuario'
      JOIN equipo ON equipo.IDEQUIPO = noticiaEmpleado.idEquipo AND equipo.nombre = '${dat2}'
      GROUP BY (usuario.nombre,usuario.usuario)
      ORDER BY cant_noticias DESC 
      FETCH FIRST 10 ROWS ONLY            
    `
    );
  }

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Cantidad de noticias publicadas </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += `<td> ${registro.CANT_NOTICIAS} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 
});


router.post("/descargaReporte10", async function(req, res, next){
  let consulta = await service.connect(
    `
    SELECT bitacoraAdmin.fecha, usuario.nombre,usuario.usuario, bitacoraAdmin.descripcion FROM bitacoraAdmin 
    JOIN usuario ON usuario.idUsuario = bitacoraAdmin.idUsuario AND usuario.tipo = 'administrador'

  `
  );

  let registros = consulta.data;

  let dot_text = "digraph { \n"
  dot_text += "tabla [ \n"
  dot_text += "shape=plaintext \n"
  dot_text += "label=<  \n"
  dot_text += "<table border='0' cellborder='1'  cellspacing='0'>  \n"

  // Encabezado
  dot_text += "<tr> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Fecha </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Nombre </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Usuario </td> \n"
  dot_text += "<td BGCOLOR=\"gray\"> Descripcion </td> \n"
  dot_text += "</tr> \n"

  // Filas
  registros.forEach(registro => {
    dot_text += "<tr> \n"
    dot_text += `<td> ${registro.FECHA} </td> \n`
    dot_text += `<td> ${registro.NOMBRE} </td> \n`
    dot_text += `<td> ${registro.USUARIO} </td> \n`
    dot_text += `<td> ${registro.DESCRIPCION} </td> \n`
    dot_text += "</tr> \n"
  })

  dot_text += "</table> \n"
  dot_text += ">] \n"
  dot_text += "}"

  fs.writeFile('./reportes/rep.dot', dot_text, (err) => {
    if (err) {
      console.log("Error: creando rep.dot")
    } else {
      exec("dot -Tjpg ./reportes/rep.dot -o ./reportes/rep.jpg", (err2)  => {
        if (err2) {
          console.log("Error: jpg del .dot")
        } else {
          const base64 = fs.readFileSync("./reportes/rep.jpg", "base64");
          res.status(200).json({base64: base64})
        }
      })
    }
  }) 
});

module.exports = router;