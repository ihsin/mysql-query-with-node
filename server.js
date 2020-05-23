const express = require('express')
const app = express()
const mysql = require('mysql')
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password    : 'Root@123',
    database    : 'nodedb'
})

//connect
db.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL database')
})

app.get('/',(req, res) => {
    res.render('index')
})

//Create Database
app.get('/createdb',(req, res) => {
    const sql= 'CREATE DATABASE nodedb'
    db.query(sql, (err, result) => {
        if(err) return err;
        console.log(result)
        res.send('Database created');
    })
})

//Create Table
app.get('/createtableteam', (req,res) => {
    const sql = "CREATE TABLE Teams (ID int NOT NULL AUTO_INCREMENT,Title varchar(255) NOT NULL,Summary varchar(255),PRIMARY KEY (ID))"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Team Table created');
    })
})

//Insert
app.post('/add', (req,res) => {
    let team = {Title: req.body.title, Summary: req.body.summary}
    const sql = "INSERT INTO Teams SET ?";
    db.query(sql, team, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('add');
    })
})

app.get('/add', (req,res) => {
    res.render('add');
})

//Select
app.get('/view', (req,res) => {
    const sql = "SELECT * FROM Teams";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result[0].Title);
        res.render('view',{table : result});
    })
})

app.get('/delete', (req, res) =>{
    res.render('delete');
})

app.listen(3000, () => {
    console.log("Running on port 3000")
})