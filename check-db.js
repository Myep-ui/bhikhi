const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'brznrs2uhfucw819pltf-mysql.services.clever-cloud.com',
    user: 'u1a9hlzc3vbezakt',
    password: 'X7dQJvTe4SsyWkjKOItX',
    database: 'brznrs2uhfucw819pltf',
    port: 3306
});

// Check database connection and tables
async function checkDatabase() {
    try {
        // Test connection
        db.connect((err) => {
            if (err) {
                console.error('❌ Database connection failed:', err);
                return;
            }
            console.log('✅ Database connection successful');
        });

        // Check users table
        db.query('DESCRIBE users', (err, results) => {
            if (err) {
                console.error('❌ Users table error:', err);
            } else {
                console.log('✅ Users table structure:');
                console.table(results);
            }
        });

        // List some users (without passwords)
        db.query('SELECT id, name, email, role, department FROM users', (err, results) => {
            if (err) {
                console.error('❌ Error fetching users:', err);
            } else {
                console.log('\n✅ Current users in database:');
                console.table(results);
            }
            db.end();
        });

    } catch (error) {
        console.error('Error:', error);
        db.end();
    }
}

checkDatabase();
