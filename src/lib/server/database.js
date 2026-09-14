// Create MySQL connection pool
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'htl-datenbank.com',
    user: 'ronvol20',
    password: '1INSY\$data',
    database: 'ronvol20_pdf_management',
    port: 28474
});

export default pool;