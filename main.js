var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var cors = require('cors');
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sakila'
});

app.get('/',(req, res)=>{
    res.send('Hello from Node')
});

app.get('/movies/all',(req, res)=>{
   const filmId = req.query.id;
    const query = `SELECT * FROM FILM ${filmId ? 'WHERE film_id = ?':''}  LIMIT 100`;
    con.query(query,[filmId],(err,result,fields)=>{
        if(err) res.status(500).send(err);
        res.status(200).json(result);
    });
});

app.get('/movies/:title',(req, res)=>{
    const title = req.params.title;
     const query = `SELECT * FROM FILM WHERE UPPER(TITLE) LIKE '${title.toUpperCase()}%' LIMIT 100`;
     con.query(query,(err,result)=>{
         if(err) res.status(500).send(err);
         res.status(200).json(result);
     });
 });


app.post('/movie', (req,res)=> {

    const {title,rating,length,description} = req.body;
    const query = `INSERT INTO FILM (title,language_id,rating,length,description) values(?,?,?,?,?)`;
    con.query(query,[title,1,rating,length,description],(err,result)=>{
        if(err) res.status(500).send(err);
        res.status(200).json({
            message:'Uspjesno spremljen film',
            id:result.insertId
        });
    });

    res.json({msg:'Uspjesno spremljeno'})
});

con.connect((err) => {
    if(err) throw err;
    console.log('Uspjesno logovani')
});

app.listen(PORT, () => console.log(`Movies app started on port: ${PORT}`));