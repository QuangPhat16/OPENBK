const express = require('express');
const unitRoutes = require('./unit.route');
const courseRoutes = require('./course.route');

const router = express.Router();

router.use('/unit', unitRoutes);
router.use('/course', courseRoutes);


module.exports = router;