const mysql = require('mysql2');

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: 'brznrs2uhfucw819pltf-mysql.services.clever-cloud.com',
      user: 'u1a9hlzc3vbezakt',
      password: 'X7dQJvTe4SsyWkjKOItX',
      database: 'brznrs2uhfucw819pltf',
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: false,
      ssl: {
        rejectUnauthorized: true
      }
    });
  }
  return pool;
}

// Get a promise-based pool
const promisePool = getPool().promise();

// Export a function that returns the promise pool
module.exports = promisePool;
