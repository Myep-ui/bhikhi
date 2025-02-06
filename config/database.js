const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'brznrs2uhfucw819pltf-mysql.services.clever-cloud.com',
  user: 'u1a9hlzc3vbezakt',
  password: 'X7dQJvTe4SsyWkjKOItX',
  database: 'brznrs2uhfucw819pltf',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');     

  
});

module.exports = db;
