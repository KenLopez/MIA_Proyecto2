var oracledb = require("oracledb");
oracledb.autoCommit = true;

var connAttrs = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

async function connect(consulta) {
  console.log(consulta);
  let conn;

  try {
    conn = await oracledb.getConnection(connAttrs);
    let result = await conn.execute(
      consulta,
      [], // no binds
      {
        outFormat: oracledb.OBJECT
      }
    );

    //console.log(result.rows);
    console.log(result)
    return { "status": 200, "data": result.rows };
  } catch (error) {
    return { "status": 400, "message": error.message }
  }
}

module.exports = {
  connect,
};

/*const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "1234"  // set mypw to the hr schema password

async function run() {

  let connection;
  
  try {
    connection = await oracledb.getConnection( {
      user          : "TEST",
      password      : mypw,
      connectString : "localhost:1521/ORCL18"
    });
    console.log("entra");
    const result = await connection.execute(
      `SELECT *
       FROM admin_emple
       WHERE idAdmin_emple = :id`,
      [1],  // bind value for :id
    );
    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();*/