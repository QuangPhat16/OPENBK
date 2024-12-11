const express = require('express');
const questionRoutes = require('./question.route');
const unitRoutes = require('./unit.route');
const courseRoutes = require('./course.route');
const commentRoutes = require('./comment.route');
const previewRoutes = require('./preview.route');

const router = express.Router();

router.use('/', questionRoutes);
router.use('/', unitRoutes);
router.use('/', courseRoutes);
router.use('/', commentRoutes);
router.use('/', previewRoutes);

module.exports = router;