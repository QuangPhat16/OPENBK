const express = require('express');
const courseRoutes = require('./course.route');
const contentRoutes = require('./content')
const courseCollabRoutes = require('./courseCollab.route')

const router = express.Router();

router.use('/', courseRoutes);
router.use('/:courseId/collab', courseCollabRoutes);
router.use('/:courseId/content', contentRoutes);

module.exports = router;