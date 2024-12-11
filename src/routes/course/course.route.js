const express = require('express');
const CourseController = require('../../controllers/course/course.controller');
const verifyJWT = require('../../middleware/verifyJWT');

const router = express.Router();

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);

router.use(verifyJWT)
router.post('/', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.delete('/', CourseController.deleteAllCourses);

module.exports = router;
