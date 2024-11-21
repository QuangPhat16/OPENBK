const express = require('express');
const QuestionController = require('../../../../controllers/course/question.controller');

const router = express.Router();

router.post('/', QuestionController.createQuestion); 
router.get('/', QuestionController.getAllQuestions); 
router.get('/:id', QuestionController.getQuestionById);
router.put('/:id', QuestionController.updateQuestion); 
router.delete('/:id', QuestionController.deleteQuestion); 

module.exports = router;
