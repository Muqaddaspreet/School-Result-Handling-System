const express = require('express');
const teacherController = require('../controllers/teacherController')
const router = express.Router();

router.get('/login' , teacherController.teacher_login);

//validate teacher from the database
router.post('/teachervalidate', teacherController.teacher_validate);

router.get('/controlcenter' , teacherController.teacher_viewresult);

router.get('/logout' , teacherController.teacher_logout);

router.get('/addrecord' , teacherController.teacher_addrecord);

router.post('/addrecord', teacherController.teacher_postrecord);

router.get('/deleterecord/:id' , teacherController.teacher_deleterecord);

router.get('/updaterecord/:id' , teacherController.teacher_updaterecord);

router.post('/updaterecord1/', teacherController.teacher_postupdate);

module.exports=router;