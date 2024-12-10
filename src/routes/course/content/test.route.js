const express = require('express');
const TestController = require('../../../controllers/test/test.controller');

const router = express.Router();
const basepath = '/:courseID/test/';

router.get(`${basepath}`, TestController.generateTest);
router.post(`${basepath}`, TestController.saveResults);
router.get(`${basepath}`, TestController.getTestResults);

module.exports = router;