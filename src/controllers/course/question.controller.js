const { Question } = require('../../database/models');

const QuestionController = {
    async createQuestion(req, res) {
        try {
            const { content, explanation, numericalOrder, unitId } = req.body;
            const question = await Question.create({ content, explanation, numericalOrder, unitId });
            res.status(201).json(question);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getAllQuestions(req, res) {
        try {
            const questions = await Question.findAll();
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getQuestionById(req, res) {
        try {
            const { id } = req.params;
            const question = await Question.findByPk(id);
            if (!question) return res.status(404).json({ error: 'Question not found' });
            res.status(200).json(question);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async updateQuestion(req, res) {
        try {
            const { id } = req.params;
            const { content, explanation, numericalOrder } = req.body;
            const updated = await Question.update(
            { content, explanation, numericalOrder },
            { where: { questionId: id } }
            );
            if (!updated[0]) return res.status(404).json({ error: 'Question not found' });
            res.status(200).json({ message: 'Question updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async deleteQuestion(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Question.destroy({ where: { questionId: id } });
            if (!deleted) return res.status(404).json({ error: 'Question not found' });
            res.status(200).json({ message: 'Question deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = QuestionController;