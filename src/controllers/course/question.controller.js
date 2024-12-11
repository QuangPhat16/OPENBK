const { Question } = require('../../database/models');

const QuestionController = {
    async createQuestion(req, res) {
        try {
            const { courseId, unitId } = req.params;
            if (isNaN(parseInt(courseId)) || isNaN(parseInt(unitId))) return res.status(400).json({ error: 'Id must be a number' });
            const { content, explanation, numericalOrder } = req.body;
            const question = await Question.create({ content, explanation, numericalOrder, unitId });
            res.status(201).json(question);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getAllQuestions(req, res) {
        try {
            const { courseId, unitId } = req.params;
            if (isNaN(parseInt(courseId)) || isNaN(parseInt(unitId))) return res.status(400).json({ error: 'Id must be a number' });
            const questions = await Question.findAll(
                { where: { unitId } }
            );
            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async getQuestionById(req, res) {
        try {
            const { courseId, unitId, id } = req.params;
            if (isNaN(parseInt(courseId)) || isNaN(parseInt(unitId) || isNaN(parseInt(id)))) return res.status(400).json({ error: 'Id must be a number' });
            const question = await Question.findByPk(id, {
                where: { courseId, unitId },
            });
            if (!question) return res.status(404).json({ error: 'Question not found' });
            res.status(200).json(question);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    async updateQuestion(req, res) {
        try {
            const { courseId, unitId, id } = req.params;
            if (isNaN(parseInt(courseId)) || isNaN(parseInt(unitId) || isNaN(parseInt(id)))) return res.status(400).json({ error: 'Id must be a number' });
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
            const { courseId, unitId, id } = req.params;
            if (isNaN(parseInt(courseId)) || isNaN(parseInt(unitId) || isNaN(parseInt(id)))) return res.status(400).json({ error: 'Id must be a number' });
            const deleted = await Question.destroy({ where: { questionId: id } });
            if (!deleted) return res.status(404).json({ error: 'Question not found' });
            res.status(200).json({ message: 'Question deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
  
module.exports = QuestionController;