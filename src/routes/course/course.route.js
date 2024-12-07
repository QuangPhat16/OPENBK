const express = require('express');
const {createCourse, getCourse, updateCourse, deleteCourse, getAllCourses} = require('../../controllers/course/courseController');
const contentRoutes = require('./content.route')
const courseCollabRoutes = require('./courseCollab.route')
const router = express.Router();
router.post('/', createCourse); 
router.get('/', getAllCourses);
router.get('/:courseId', getCourse); 
router.put('/:courseId', updateCourse);
router.delete('/:courseId', deleteCourse); 

router.use('/:courseId/collab', courseCollabRoutes);
router.use('/:courseId/content', contentRoutes);


module.exports = router;
