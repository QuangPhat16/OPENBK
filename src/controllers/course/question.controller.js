const { Question } = require('../../database/models');
const {filterNull, checkNull} = require('../../common/ultis');


const QuestionController = {
    async createQuestion(req, res) {
        try {
            const { courseId } = req.params;
            const { content, explanation, unitId, correctAnswer, answerA, answerB, answerC, answerD } = req.body;
            if(checkNull({ content, unitId, answerA, answerB, answerC, answerD })) return res.status(400).json({message: 'Bad request, some fileds are missing'})
            await Question.create({courseId, content, explanation, unitId, correctAnswer, answerA, answerB, answerC, answerD });
            res.status(201).json({message:'Created question successfully'});

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getAllQuestions(req, res) {
        try {
            const  courseId = req.params;
            const unitId = req.body
            const questions = await Question.findAll(
                { where: { courseId, unitId } }
            );
            res.status(200).json(questions);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    // async getQuestionById(req, res) {
    //     try {
    //         const { courseId, unitId, id } = req.params;
    //         const question = await Question.findByPk(id, {
    //             where: { courseId, unitId },
    //         });
    //         if (!question) return res.status(404).json({ error: 'Question not found' });
    //         res.status(200).json(question);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
  
    async updateQuestion(req, res) {
        try {
            const { questionId, content, explanation, correctAnswer, answerA, answerB, answerC, answerD } = req.body;
            const params = filterNull({ content, explanation, correctAnswer, answerA, answerB, answerC, answerD })
            
            const updated = await Question.update(
                params,
                { where: { questionId, }, }
            );

            if (!updated[0]) return res.status(404).json({ message: 'Question not found' });
            res.status(200).json({ message: 'Question updated successfully' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async deleteQuestion(req, res) {
        try {
            const questionId = req.body
            const deleted = await Question.destroy({ where: { questionId, }, });
            if (!deleted) return res.status(404).json({ message: 'Question not found' });
            res.status(200).json({ message: 'Question deleted successfully' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = QuestionController;