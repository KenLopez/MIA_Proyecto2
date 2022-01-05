var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');
const settings = require('../public/javascripts/Settings');

const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

router.post('/', async function(req, res) {
  let conn;
  const body = req.body;
  let result = {result: [], errors: []};
    conn = await oracledb.getConnection(settings.conn)
    console.log(req.body);
    let tipo = req.body.tipo;
    let consulta = "";
    if (tipo === 1){
      let equipo = req.body.equipo;
      consulta = 'SELECT J.NOMBRE , J.POSICION, J.NACIONALIDAD ' +
          'FROM CONTRATO_JUGADOR INNER JOIN JUGADOR J on J.ID = CONTRATO_JUGADOR.ID_JUGADOR ' +
          'WHERE CONTRATO_JUGADOR.ID_EQUIPO = ' + equipo + ' AND CONTRATO_JUGADOR.FIN IS NULL';
    } else if (tipo === 2){
      let equipo = req.body.equipo;
      consulta = 'SELECT D.NOMBRE, D.ESTADO, D.NACIONALIDAD ' +
          'FROM CONTRATO_TECNICO INNER JOIN DIRECTOR_TECNICO D on D.ID = CONTRATO_TECNICO.ID_DIRECTOR ' +
          'WHERE CONTRATO_TECNICO.ID_EQUIPO =' + equipo + ' AND CONTRATO_TECNICO.FINAL IS NULL';
    } else if (tipo === 3){
      let signo = req.body.signo;
      let anio = req.body.anio;
      consulta = 'SELECT * ' +
          'FROM JUGADOR J WHERE (CURRENT_DATE - J.FECHA_NAC)/365 ' + signo + ' ' + anio;
    } else if (tipo === 4){
      let signo = req.body.signo;
      let anio = req.body.anio;
      consulta = 'SELECT * ' +
          'FROM DIRECTOR_TECNICO D WHERE (CURRENT_DATE - D.FECHA_NAC)/365 ' + signo + ' ' + anio;
    } else if (tipo === 5){
      let competencia = req.body.competencia;
      consulta = 'SELECT E.NOMBRE, to_char(E.FECHA_FUNDACION,\'DD-MM-YYYY\'), ' +
          'E.PAIS FROM EQUIPO E ' +
          'INNER JOIN PARTICIPACION P on E.ID = P.ID_EQUIPO WHERE P.ID_COMPETENCIA = ' + competencia ;
    } else if (tipo === 6){
      let pais = req.body.pais;
      consulta = 'SELECT * FROM EQUIPO E ' +
          'WHERE E.PAIS = \'' + pais + '\'';
    } else if (tipo === 7){
      let anio = req.body.anio;
      consulta = 'SELECT E.NOMBRE, to_char(E.FECHA_FUNDACION, \'DD-MM-YYYY\'), E.PAIS FROM EQUIPO E ' +
          'WHERE (CURRENT_DATE - E.FECHA_FUNDACION)/365 >' + anio;
    } else if (tipo === 8){
      let pais = req.body.pais;
      consulta = 'SELECT * FROM ESTADIO E ' +
          'WHERE E.PAIS =\'' + pais + '\'';
    } else if (tipo === 9){
      let capacidad = req.body.capacidad;
      consulta = 'SELECT * FROM ESTADIO E ' +
          'WHERE E.CAPACIDAD <=' + capacidad;
    }else if (tipo === 10){
      let equipo = req.body.equipo;
      consulta = 'SELECT to_char(P.FECHA,\'DD-MM-YYYY\'), P.RESULTADO, ' +
          '(SELECT NOMBRE FROM EQUIPO WHERE ID = P.LOCAL), (SELECT NOMBRE FROM EQUIPO WHERE ID = P.VISITA)' +
          'FROM PARTIDO P' +
          'WHERE (VISITANTE = ' + equipo + ' OR LOCAL = ' + equipo + ')';
    } else if (tipo === 11){
      let jugador = req.body.jugador;
      consulta = 'SELECT E.NOMBRE, to_char(E.FECHA_FUNDACION,\'DD-MM-YYYY\'), E.PAIS FROM EQUIPO E ' +
          '    INNER JOIN CONTRATO_JUGADOR F on E.ID = F.ID_EQUIPO ' +
          'WHERE F.JUGADOR = ' + jugador;
    } else if (tipo === 12){
      let director = req.body.director;
      consulta = 'SELECT E.NOMBRE, to_char(E.FECHA_FUNDACION,\'DD-MM-YYYY\'), E.PAIS, FROM EQUIPO E ' +
          '    INNER JOIN CONTRATO_TECNICO D on E.ID = D.ID_EQUIPO ' +
          'WHERE D.ID_DIRECTOR = ' + director;
    } else if (tipo === 13){
      let equipo = req.body.equipo;
      let tipo = req.body.tipo;
      consulta = 'SELECT C.NOMBRE, C.ANIO, C.PAIS FROM COMPETENCIA C ' +
          'WHERE TIPO = \'' + tipo + '\' AND CAMPEON = ' + equipo;
    } else if (tipo === 14){
      let anio = req.body.anio;
      consulta = 'SELECT to_char(P.FECHA,\'DD-MM-YYYY\'), P.RESULTADO, ' +
      '(SELECT NOMBRE FROM EQUIPO WHERE ID = P.LOCAL), (SELECT NOMBRE FROM EQUIPO WHERE ID = P.VISITA)' +
      'FROM PARTIDO P' +
          'WHERE EXTRACT(YEAR FROM P.FECHA) = ' + anio;
    } else if (tipo === 15){
      let equipo = req.body.equipo;
      let equipo2 = req.body.equipo2;
      consulta = 'SELECT to_char(P.FECHA,\'DD-MM-YYYY\'), P.RESULTADO, ' +
      '(SELECT NOMBRE FROM EQUIPO WHERE ID = P.LOCAL), (SELECT NOMBRE FROM EQUIPO WHERE ID = P.VISITA)' +
      'FROM PARTIDO P' +
          'WHERE (P.LOCAL = ' + equipo + ' OR P.LOCAL = ' + equipo2 + ') AND ' +
          '(P.VISITANTE = ' + equipo + ' OR P.VISITANTE = ' + equipo2 + ')';
    } else if (tipo === 16){
      let equipo = req.body.equipo;
      consulta = 'SELECT to_char(P.FECHA,\'DD-MM-YYYY\'), P.RESULTADO, ' +
      '(SELECT NOMBRE FROM EQUIPO WHERE ID = P.LOCAL), (SELECT NOMBRE FROM EQUIPO WHERE ID = P.VISITA)' +
      'FROM PARTIDO P' +
          'WHERE (VISITANTE = ' + equipo + ' OR LOCAL = ' + equipo + ')';
    }
  
    console.log(consulta);
    let respuesta = await conne.connect(consulta);
    res.send({"data" :respuesta.data});
});

module.exports = router;
