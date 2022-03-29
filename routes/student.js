const express = require('express');
const router = express.Router();
// const mysql = require('mysql');
var currstudent=[];
var wronginput=false;
const con = require('../routes/database')
// var con=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:'resultdb'
// });

// con.connect((err)=>{
//     if(!err){
//         console.log('DB Connection Successfull');
//     }
//     else{
//         console.log('DB Connection Failed \n Error :'+JSON.stringify(err,undefined,2));
//     }
// });


router.get('/',(req,res)=>{
    res.render("studentcorner");
});

router.get('/showresult' , (req,res)=>{
    console.log(currstudent);
    res.render('resultpage',{
        sr:currstudent
    });
});

router.post('/showresult' , (req,res)=>{
    const rollnumber=req.body.rollnumber;
    const dob = req.body.dob;
    const sqlquery ='SELECT * FROM student WHERE rollnumber=? and dob=?';
    con.query(sqlquery,[rollnumber,dob] , (err,rows,fields)=>{
        if(!err){
            console.log(rows);
            currstudent=rows;
            res.redirect('/student/showresult');
        }
        else{
            res.redirect('/student')
        }
    })

});


module.exports=router;