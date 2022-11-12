const express = require('express');
const router = express.Router();
var currstudent=[];
var wronginput=false;
 const con = require('../models/database')

const student_login = (req,res) => {
    res.render("studentcorner")
}

const student_logout = (req,res) => {
    validated=false;
    res.redirect('/');
}

const student_result = (req,res) => {
    console.log(currstudent);
    res.render('resultpage',{
        sr:currstudent
    });
}

const student_postresult = (req,res) => {
    const rollnumber=req.body.rollnumber;
    const dob = req.body.dob;
    const sqlquery ='SELECT * FROM student WHERE rollnumber=? and dob=?';
    con.query(sqlquery,[rollnumber,dob] , (err,rows,fields)=>{
        if(!err && Object.keys(rows).length!=0){
            console.log(rows);
            currstudent=rows;
            res.redirect('/student/showresult');
        }
        else{
            res.redirect('/student/')
        }
    })
}

module.exports = {
    student_login,
    student_logout,
    student_result,
    student_postresult,
}