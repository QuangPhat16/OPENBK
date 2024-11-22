const express = require('express');
const courseRoutes = require('./course/course.route');
const userRoutes = require('./user/user.route');
const router = express.Router();


router.use('/course', courseRoutes);
router.use('/user', userRoutes)

module.exports = router;
