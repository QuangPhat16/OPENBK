const { Question } = require('../../database/models');
const {filterNull, checkNull} = require('../../common/ultis');


const QuestionController = {
    async createQuestion(req, res) {
        try {
            const { courseID } = req.params;
            const { content, explanation, unitID, correctAnswer, answerA, answerB, answerC, answerD } = req.body;
            if(checkNull({ content, unitID, answerA, answerB, answerC, answerD })) return res.status(400).json({message: 'Bad request, some fileds are missing'})

            const course = await Question.findOne({ where: { courseID } });
            if (!course) return res.status(404).json({ error: 'Course not found' });

            await Question.create({courseID, content, explanation, unitID, correctAnswer, answerA, answerB, answerC, answerD });
            res.status(201).json({message:'Created question successfully'});

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getAllQuestions(req, res) {
        try {
            const { courseID } = req.params;
            const unitID = req.body
            const questions = await Question.findAll(
                { where: { courseID, unitID } }
            );
            res.status(200).json(questions);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    // async getQuestionByID(req, res) {
    //     try {
    //         const { courseID, unitID, id } = req.params;
    //         const question = await Question.findByPk(id, {
    //             where: { courseID, unitID },
    //         });
    //         if (!question) return res.status(404).json({ error: 'Question not found' });
    //         res.status(200).json(question);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
  
    async updateQuestion(req, res) {
        try {
            const { questionID, content, explanation, correctAnswer, answerA, answerB, answerC, answerD } = req.body;
            const params = filterNull({ content, explanation, correctAnswer, answerA, answerB, answerC, answerD })
            
            const updated = await Question.update(
                params,
                { where: { questionID, }, }
            );

            if (!updated[0]) return res.status(404).json({ message: 'Question not found' });
            res.status(200).json({ message: 'Question updated successfully' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async deleteQuestion(req, res) {
        try {
            const questionID = req.body
            const deleted = await Question.destroy({ where: { questionID, }, });
            if (!deleted) return res.status(404).json({ message: 'Question not found' });
            res.status(200).json({ message: 'Question deleted successfully' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = QuestionController;