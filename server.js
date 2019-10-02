// Express package
var express = require("express");
var app = express();

//////////////////////////////////////////////////////////////////////

// set the view engine to ejs
app.set('view engine', 'ejs');

//////////////////////////////////////////////////////////////////////

// Method Override Package
var methodOverride = require('method-override')

app.use(methodOverride('_method'))

//////////////////////////////////////////////////////////////////////

// dotenv package
// add dotenv package for hiding private data
// require("dotenv").config();
// var keys = require("./keys.js");

//////////////////////////////////////////////////////////////////////

// path package
var path = require("path");

//////////////////////////////////////////////////////////////////////

// making static assets
app.use(express.static("public"));

//////////////////////////////////////////////////////////////////////

//Body Parser package
//to be able to use app.post
//body-parser allows us to access the body of a request, which we need when doing a post route	
var bodyParser = require('body-parser')

//integrate body-parser with express

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//////////////////////////////////////////////////////////////////////

//MySQL package
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlpassword',
    database: 'friends_db'
});

connection.connect();

//////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
    res.render('pages/home');
});

app.get('/survey', function (req, res) {
    res.render('pages/survey');
});

app.get('/scores', function (req, res) {
    connection.query('SELECT friend_id, question_id, answer FROM scores ORDER BY friend_id, question_id;', function (error, results, fields) {
        if (error) res.send(error)
        else res.json(results);
    });
});

app.get('/questions', function (req, res) {
    connection.query('SELECT * FROM questions;', function (error, results, fields) {
        if (error) res.send(error)
        else res.json(results);
    });
});

app.get('/friends', function (req, res) {
    connection.query('SELECT * FROM friends;', function (error, results, fields) {
        if (error) res.send(error)
        else res.json(results);
    });
});

app.post('/insert', function (req, res) {

    if (req.body.name.length > 1) {
        connection.query('INSERT INTO friends (name) VALUES (?)', [req.body.name], function (error, results, fields) {
            if (error) res.send(error)
            else res.redirect('/');
        });
    } else {
        res.send('invalid name')
    }


});

app.listen(3000, function () {
    console.log('listening on 3000');
});