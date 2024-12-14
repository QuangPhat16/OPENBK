const express = require('express');
const courseRoutes = require('./course');
const userRoutes = require('./user/user.route');
const uploadRoutes = require('./upload/upload.route')
const router = express.Router();

router.use('/course', courseRoutes);
router.use('/user', userRoutes);
router.use('/upload', uploadRoutes)

module.exports = router;
