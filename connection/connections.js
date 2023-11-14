require('dotenv').config();
const Mysql = require('mysql2');

const DataBase = Mysql.createConnection(
{
host: 'localhost',
user: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
},
console.log("connected successfully to the employees_db database!!" )
);

module.exports = DataBase;
