const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Create connection
const connection = mysql.createConnection({
  host: 'brznrs2uhfucw819pltf-mysql.services.clever-cloud.com',
  user: 'u1a9hlzc3vbezakt',
  password: 'X7dQJvTe4SsyWkjKOItX',
  database: 'brznrs2uhfucw819pltf',
  port: 3306
});

// Read SQL file
const sqlPath = path.join(__dirname, 'migrations', '20240128_add_changes_column.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

// Execute SQL
connection.query(sql, (err) => {
  if (err) {
    console.error('Error executing SQL:', err);
    process.exit(1);
  }
  console.log('Changes column added successfully!');
  connection.end();
});
