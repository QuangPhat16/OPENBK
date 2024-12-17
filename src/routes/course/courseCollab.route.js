const express = require('express')
const router = express.Router()
const CourseCollab = require('../../controllers/course/courseCollab.controller');

router.get('/', CourseCollab.getAllLearners)
// router.get('/', getAllCollabs)
router.delete('/:id', CourseCollab.deleteLearnerFromCourse)

module.exports = router