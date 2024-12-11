const { Test, User, Question, Course } = require('../../database/models');
const sequelize = require('../../database/config/database'); // Ensure you have the correct path to your sequelize instance

const TestController = {
    async generateTest(req, res) {
        try {
            const { courseId, numberOfQuestions, timeLimit } = req.query;
            if (isNaN(parseInt(courseId)) || isNaN(parseInt(numberOfQuestions)) || isNaN(parseInt(timeLimit))) {
                return res.status(400).json({ error: 'courseId, numberOfQuestions, and timeLimit must be numbers' });
            }
            const questions = await Question.findAll({
                where: { courseId },
                order: sequelize.random(),
                limit: parseInt(numberOfQuestions)
            });
            if (questions.length < numberOfQuestions) {
                const allQuestions = await Question.findAll({
                    where: { courseId },
                    order: sequelize.random()
                });
                return res.status(200).json({ questions: allQuestions, timeLimit });
            }

            res.status(200).json({ questions, timeLimit });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async saveResults(req, res) {
        try {
            const { userId, courseId } = req.params;
            if (isNaN(parseInt(userId)) || isNaN(parseInt(courseId))) return res.status(400).json({ error: 'userId and courseId must be numbers' });
            const { answers, takenTime, numberOfQuestions } = req.body;

            const questions = await Question.findAll({
                where: { courseId },
                order: sequelize.random(),
                limit: numberOfQuestions
            });

            let correctAnswers = 0;
            questions.forEach((question, index) => {
                if (question.correctAnswer === answers[index]) {
                    correctAnswers++;
                }
            });

            const test = await Test.create({
                userId,
                courseId,
                numberOfQuestions,
                correctAnswers,
                takenTime,
                testTakenDate: new Date()
            });

            res.status(201).json(test);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getTestResults(req, res) {
        try {
            const { userId, courseId } = req.params;
            if (isNaN(parseInt(userId)) || isNaN(parseInt(courseId))) return res.status(400).json({ error: 'userId and courseId must be numbers' });
            const tests = await Test.findAll({
                where: { userId, courseId },
                include: [{ model: Course, as: 'course' }, { model: User, as: 'user' }]
            });
            res.status(200).json(tests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}