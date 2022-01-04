
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


const service = require("./connection.js");
const cors = require("cors");
const { json } = require("body-parser");
const { IdentityStore } = require("aws-sdk");

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
      `SELECT * FROM admin_emple WHERE usuario='${usuario}'AND clave_de_acceso='${password}'`
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
            WHERE nombre = '${nombre}'),
          (SELECT idEquipo FROM equipo 
            WHERE nombre = '${idEquipo}'),
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
        ,(select idEquipo from equipo where nombre = '${equipo}' ))
      `
    );

    if(response.status==400){
      res.status(400).json({message: "error al ingresar jugador_partido"});
    }else{

      let response2 = await service.connect(
        `
        INSERT INTO jugador_equipo(idJugador,posicion,,idEquipo,fecha_ini,fecha_fin) values(
            (SELECT idJugador FROM jugador 
              WHERE nombre = '${nombre}'),
              '${posicion}',
            (SELECT idEquipo FROM equipo 
              WHERE nombre = '${equipo}'),
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
              WHERE nombre = '${campeon}'),
            (SELECT idEquipo FROM equipo 
              WHERE nombre = '${equipo}'),
            (SELECT idCompeticion FROM competicion 
              WHERE nombre = '${nombre}')
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
    const {fecha,Estadio,estado,asistencia,pais_local,equipo_local,pais_visita,equipo_visita,resultado,incidencia,minuto,equipo_incidencia,jugador} = req.body;
    
    let response = await service.connect(
      `
      INSERT INTO partido_incidencia (fecha,asistencia,incidencia,minuto,equipo_incidencia,idJugador) VALUES ('${fecha}','${asistencia}','${incidencia}','${minuto}',
      (SELECT idEquipo FROM equipo 
        WHERE nombre = '${equipo_incidencia}'),
      (SELECT idJugador FROM jugador 
        WHERE nombre = '${jugador}')
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
            WHERE nombre = '${Estadio}'),
          '${estado}',
          (SELECT idPartido_incidencia FROM partido_incidencia 
            WHERE fecha = '${fecha}' and incidencia = '${incidencia}' and minuto = '${minuto}'),
          (SELECT idEquipo FROM equipo 
            WHERE pais = '${pais_local}' and nombre = '${equipo_local}'),
          (SELECT idEquipo FROM equipo 
            WHERE nombre = '${pais_visita}' and nombre = '${equipo_visita}'),
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
          --------1 jugador
          WITH A AS (
            SELECT idEquipo FROM equipo 
            WHERE nombre = '${dat2}'
          )
          SELECT nombre FROM jugador,A
          JOIN Historialjugador on (Historialjugador.idJugador=idJugador AND  Historialjugador.idEquipo=A.idEquipo)
        `
        );
      }else if(dat1 == 'director'){
        response = await service.connect(
          `
          -------------10
          -------2 director
          WITH A AS (
            SELECT idEquipo FROM equipo 
            WHERE nombre = '${dat2}'
          )
          SELECT nombre FROM director_tecnico,A
          JOIN director_equipo on (director_equipo.idDirector_tecnico=idDirector_tecnico AND  director_equipo.idEquipo=A.idEquipo)
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

module.exports = router;