const express = require('express');
const {createCourse, getCourse, updateCourse, deleteCourse, getAllCourses} = require('../../controllers/course/course.controller');

const router = express.Router();
router.post('/', createCourse); 
router.get('/', getAllCourses);
router.get('/:courseId', getCourse); 
router.put('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse); 

module.exports = router;
