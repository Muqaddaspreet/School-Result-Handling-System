const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')


router.get('/',studentController.student_login);

router.get('/logout' , studentController.student_logout);

router.get('/showresult' , studentController.student_result);

router.post('/showresult' , studentController.student_postresult);

module.exports=router;