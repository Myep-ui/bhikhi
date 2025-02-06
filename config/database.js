const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'brznrs2uhfucw819pltf-mysql.services.clever-cloud.com',
  user: 'u1a9hlzc3vbezakt',
  password: 'X7dQJvTe4SsyWkjKOItX',
  database: 'brznrs2uhfucw819pltf',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    console.error('Error connecting to database:', err);
  }
  if (connection) {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

module.exports = promisePool;
