const mysql = require("mysql2/promise");
const {MYSQL_HOST,MYSQL_PASS,MYSQL_USER,MYSQL_DATABASE}=require('../config/server.config.js');
const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;