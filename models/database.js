const mysql = require('mysql2');
var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'resultdb'
});

con.connect((err)=>{
    if(!err){
        console.log('DB Connection Successfull');
    }
    else{
        console.log('DB Connection Failed \n Error :'+JSON.stringify(err,undefined,2));
    }
});

module.exports=con;