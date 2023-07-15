require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const path = require('path')
const app = express()

app.set("view engine", "ejs")
app.use(express.static("views/partials"))
app.use(express.static("public"))
app.set("views", path.join(__dirname, "views"))
const port = 3000
const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/projects', (req,res) => {
    connection.query('SELECT * FROM projects', (error, results) =>{
        if(error){
            res.status(500).json({error: "Unknown error"})
            console.log(error)
        } else {
            res.render('projects', {projects : results})
        }
    })
})

app.get('/project/:id', (req,res) => {
    const projectId = req.params.id
    connection.query('SELECT * FROM projects WHERE id = ?', [projectId], (error, results) => {
        if(error){
            res.status(500).json({error: "Unknown error"})
            console.log(error)
        } else {
            res.render('project', {project : results})
        }
    })
})

app.listen(process.env.PORT || port, () => {
    console.log('Open http://localhost:3000')
})