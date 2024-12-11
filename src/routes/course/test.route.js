const express = require('express');
const TestController = require('../../controllers/course/test.controller');

const router = express.Router();
const basepath = '/:courseId/test/';

router.get(`${basepath}`, TestController.generateTest);
router.post(`${basepath}:userId`, TestController.saveResults);
router.get(`${basepath}:userId`, TestController.getTestResults);

module.exports = router;