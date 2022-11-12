const express = require('express');
const router = express.Router();
var slist = [];
var singlerecord=[];
let validated=false;
const con = require('../models/database')

const teacher_login= (req,res) =>
{
    res.render("teacherlogin");
}

const teacher_validate =(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    con.query('SELECT * FROM teacher WHERE temail=? AND tpass=?' , [email,password] , (err,rows,fields)=>{
        if(!err && Object.keys(rows).length!=0){
            console.log(rows!=null);
            console.log(typeof(rows));
            res.redirect('/teacher/controlcenter');
            console.log('teacher validated');
            validated=true;
            con.query('SELECT * FROM student' , (err,rows,fields)=>{
                console.log(rows);
                slist=rows;
            })
        }
        else{
            console.log(err);
            res.redirect('/teacher/login');
        }
    });
}

const teacher_viewresult = (req,res) => {
    //consol.log(req.session.slist);
    if(validated){
        con.query('SELECT * FROM student' , (err,rows,fields)=>{
            console.log(rows);
            slist=rows;
        });
        setTimeout(()=>{
            res.render('teachercontrol',{
                slist:slist
            });
        },1000);
    }
    else{
        res.redirect('/teacher/login');
    }
}

const teacher_logout = (req,res) => {
    validated=false;
    res.redirect('/');
}

const teacher_addrecord = (req,res) => {
    if(validated){
        res.render('addrecord')
    }
    else{
        res.redirect('/teacher/login');
    }
}

const teacher_postrecord = (req,res) => {
    var params=req.body;
    const sname=req.body.sname;
    const rollnumber=req.body.rollnumber;
    const dob=req.body.dob;
    const score=req.body.score;
    let sqlquery='insert into student set ?'
    con.query(sqlquery,params,(err,rows,fields)=>{
        if(!err){
            console.log("record added successfully");
            res.redirect('/teacher/controlcenter');
        }
        else{
            console.log(err);
        }
    })
}

const teacher_deleterecord = (req,res) => {
    let rollnumber = req.params.id;
    let sqlquery='delete from student where rollnumber=?';
    con.query(sqlquery,[rollnumber],(err,rows,fields)=>{
        if(!err){
            console.log('record deleted');
            res.redirect('/teacher/controlcenter');
        }
        else{
            console.log(err);
        }
    })
}

const teacher_updaterecord = (req,res) => {
    let rollnumber=req.params.id;
    let sqlquery = 'select * from student where rollnumber=?';
    
    con.query(sqlquery,[rollnumber],(err,rows,fields)=>{
        console.log(rows+"helloworld");
        if(!err){
            singlerecord = rows;
            res.render('updaterecord' , {
                sr:singlerecord
            })
        }
    })
}

const teacher_postupdate = (req,res) => {
    var params=req.body;
    const sname=req.body.sname;
    const rollnumber=req.body.rollnumber;
    const dob=req.body.dob;
    const score=req.body.score;
    let sqlquery='update student set ? where rollnumber='+rollnumber;
    con.query(sqlquery,params,(err,rows,fields)=>{
        if(!err){
            console.log("record updated successfully");
            res.redirect('/teacher/controlcenter');
        }
        else{
            console.log(err);
        }
    });
}
module.exports = {
    teacher_login,
    teacher_validate,
    teacher_viewresult,
    teacher_logout,
    teacher_addrecord,
    teacher_postrecord,
    teacher_deleterecord,
    teacher_updaterecord,
    teacher_postupdate,
}