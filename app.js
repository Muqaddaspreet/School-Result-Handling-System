const express = require('express');
const bodyParser = require('body-parser');
const student = require('./routes/student');
const teacher = require('./routes/teacher');
const session = require('express-session');
const mysql = require('mysql');
const { extend } = require('lodash');
const app = express();
const port = 5000;


app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/student" , student);
app.use("/teacher" , teacher);
app.use(session(
    {secret:"MyProject",
     resave:false,
    saveUninitialized:false
    }
    ));

app.get('/' , (req, res) =>{
    res.render("home");
});

app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}.`)
});
