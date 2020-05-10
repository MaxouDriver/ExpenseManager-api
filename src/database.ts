import mysql from 'mysql';
import dotenv from 'dotenv';

let envValue = dotenv.config();

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

connection.connect(function(err: Error) {
    if (err) throw err;

    console.log("Connected to database");
});

export default connection;