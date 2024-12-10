const express = require('express');
const {createCourse, getCourse, updateCourse, deleteCourse, getAllCourses} = require('../../controllers/course/course.controller');

const router = express.Router();
router.post('/', createCourse); 
router.get('/', getAllCourses);
router.get('/:courseID', getCourse); 
router.put('/:courseID', updateCourse);
router.delete('/:courseID', deleteCourse); 

module.exports = router;
