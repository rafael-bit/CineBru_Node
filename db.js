const mysql = require('mysql2');

const connection = mysql.createConnection({
    MYSQLHOST: 'monorail.proxy.rlwy.net',
    MYSQLPORT: '52305',
    MYSQLUSER: 'root',
    MYSQLPASSWORD: '64C-Ef2BaaGFcd-d3DHF2b5hgcB6AhF1',
    MYSQLDATABASE: 'railway',
    MYSQL_URL: 'mysql://root:64C-Ef2BaaGFcd-d3DHF2b5hgcB6AhF1@monorail.proxy.rlwy.net:52305/railway',
    MYSQL_PRIVATE_URL: 'mysql://root:64C-Ef2BaaGFcd-d3DHF2b5hgcB6AhF1@mysql-abbz.railway.internal:3306/railway'
});

module.exports = connection;
