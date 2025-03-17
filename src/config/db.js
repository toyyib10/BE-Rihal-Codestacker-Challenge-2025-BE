const {Pool} = require("pg");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

console.log(process.env.DB_USER)
console.log(process.env.DB_HOST);


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_DBPORT
});

pool.on("connect",() => {
    console.log("Connection pool established with database")
});

module.exports = pool;