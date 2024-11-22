const express = require('express');
const questionRoutes = require('./question.route');
const unitRoutes = require('./unit.route');
const courseRoutes = require('./course.route');

const router = express.Router();

router.use('/', questionRoutes);
router.use('/', unitRoutes);
router.use('/', courseRoutes);


module.exports = router;