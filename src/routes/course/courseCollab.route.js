const express = require('express')
const router = express.Router()
const {addCourseCollab, deleteCourseCollab, getAllCollabs} = require('../../controllers/course/courseCollab.controller')

router.post('/',addCourseCollab)
router.get('/', getAllCollabs)
router.delete('./', deleteCourseCollab)

module.exports = router