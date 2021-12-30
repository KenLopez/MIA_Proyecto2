const oracledb = require('oracledb');
const settings = {
    conn: {
        user: 'kenneth',
        password: '2109',
        connectString: 'localhost:1521/ORCL18'
    },
    query: {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        autoCommit: true,
    }
}
module.exports = settings;