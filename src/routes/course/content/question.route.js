const express = require('express');
const QuestionController = require('../../../controllers/course/question.controller');

const router = express.Router();
const basepath = '/:courseId/unit/:unitId/question/';

router.post(`${basepath}`, QuestionController.createQuestion); 
router.get(`${basepath}`, QuestionController.getAllQuestions); 
// router.get(`${basepath}:id`, QuestionController.getQuestionById);
router.put(`${basepath}:id`, QuestionController.updateQuestion); 
router.delete(`${basepath}:id`, QuestionController.deleteQuestion); 

module.exports = router;
