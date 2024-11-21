const express = require('express');
const CourseController = require('../../controllers/course/course.controller');

const router = express.Router();

router.post('/', CourseController.createCourse); 
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById); 
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse); 

module.exports = router;
