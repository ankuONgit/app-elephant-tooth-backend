// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',  // Replace with your MySQL password
    database: 'userinfo'            // Replace with your DB name
});

connection.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection error:', err);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

module.exports = connection;
