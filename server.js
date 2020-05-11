const express = require('express')
const app = express()
const mysql = require('mysql')

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

app.get('/createdb',(req, res) => {
    const sql= 'CREATE DATABASE nodedb'
    db.query(sql, (err, result) => {
        if(err) return err;
        console.log(result)
        res.send('Database created');
    })
})

app.get('/createtableteam', (req,res) => {
    const sql = "CREATE TABLE Teams (ID int NOT NULL AUTO_INCREMENT,Title varchar(255) NOT NULL,Summary varchar(255),PRIMARY KEY (ID))"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Team Table created');
    })
})
app.listen(3000, () => {
    console.log("Running on port 3000")
})