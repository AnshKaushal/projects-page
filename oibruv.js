require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.query('SELECT * FROM projects', (error, results) =>{
    if(error){
        res.status(500).json({error: "Unknown error"})
        console.log(error)
    } else {
        console.log(results)
    }
})
connection.end()