const express = require('express')
const router = express.Router()
const {addCourseCollab, deleteCourseCollab, getAllCollabs} = require('../../controllers/course/courseCollabController')

router.post('/',addCourseCollab)
router.get('/', getAllCollabs)
router.delete('./', deleteCourseCollab)

module.exports = router