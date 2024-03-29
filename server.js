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
    host    : 'db',
    user    : 'root',
    password    : 'Root@123',
    database    : 'nodedb'
})
const PORT=process.env.PORT||5000;
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
    console.log(req.body)
    let team = {Title: req.body.title, Summary: req.body.summary}
    const sql = "INSERT INTO Teams SET ?";
    db.query(sql, team, (err, result) => {
        if (err) throw err;
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
        res.render('view',{table : result});
    })
})

app.post('/delete', (req, res) => {
    const sql = "DELETE FROM Teams WHERE ID=?";
    db.query(sql, req.body.teamid, (err, result) => {
        if (err) throw err;
        res.status(400);
    })
})

app.get('/delete', (req, res) =>{
    const sql = "SELECT ID FROM Teams";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('delete',{ids : result});
    })
})

app.get('/update', (req, res) => {
    const sql = "SELECT ID FROM Teams";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('update',{ids : result});
    })
})

app.post('/update', (req,res) => {
    const sql = `UPDATE Teams SET Title='${req.body.title}', Summary='${req.body.summary}' WHERE ID='${req.body.teamid}'`;
    // console.log(req.body)
    // console.log(sql);
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
    const sqlid = "SELECT ID FROM Teams";
    db.query(sqlid, (err, result) => {
        if (err) throw err;
        res.render('update',{ids : result});
    })
})

app.listen(PORT, () => {
    console.log("Running on port " + PORT)
})
